import { NotificationPreferences } from "@/types/notification";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notificationService from "@/services/notification.service";
import { ApiError } from "next/dist/server/api-utils";

export interface NotificationPreferenceState {
  notificationPreferences: NotificationPreferences | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationPreferenceState = {
  notificationPreferences: null,
  isLoading: false,
  error: null,
};

export const fetchNotificationPreferences = createAsyncThunk<
  NotificationPreferences,
  number,
  { rejectValue: string }
>(
  "notifications/fetchNotification-preferences",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await notificationService.getNotificationPreferences(
        userId
      );
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

const notificationPreferencesSlice = createSlice({
  name: "notificationPreferences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationPreferences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotificationPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationPreferences = action.payload;
      })
      .addCase(fetchNotificationPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch preferences";
      });
  },
});

export default notificationPreferencesSlice.reducer;
