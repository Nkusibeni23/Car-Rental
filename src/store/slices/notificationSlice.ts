import notificationService from "@/services/notification.service";
import { ApiError } from "@/types/Api";
import { Notification } from "@/types/notification";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk<
  { notifications: Notification[] },
  { skip?: number; limit?: number; userId?: number | undefined },
  { rejectValue: string }
>(
  "notifications/fetchNotifications",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await notificationService.getNotifications(params);
      return {
        notifications: response.data.rows,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.status || action.payload.status === "unread") {
        state.unreadCount += 1;
      }
    },

    removeNotification: (state, action: PayloadAction<number>) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload
      );
      if (index !== -1) {
        const notification = state.notifications[index];
        if (notification.status === "read") {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
    updateNotificationInState: (state, action: PayloadAction<Notification>) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload.id
      );
      if (index !== -1) {
        const oldNotification = state.notifications[index];
        const wasUnread = oldNotification.status === "unread";
        const isNowRead = action.payload.status === "read";

        state.notifications[index] = action.payload;

        // Update unread count if read status changed
        if (wasUnread && isNowRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        } else if (!wasUnread && !isNowRead) {
          state.unreadCount += 1;
        }
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch notifications cases
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch notifications";
      });
  },
});

export const {
  clearError,
  addNotification,
  removeNotification,
  updateNotificationInState,
  clearAllNotifications,
  setUnreadCount,
} = notificationSlice.actions;

export default notificationSlice.reducer;
