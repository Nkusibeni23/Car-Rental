export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  actionUrl: string | null;
  status: "read" | "unread";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fname: string;
    lname: string;
  };
}

export interface NotificationsListResponse {
  data: { count: number; rows: Notification[] };
}

export interface NotificationResponse {
  notification: Notification;
}

export interface MarkNotificationRequest {
  status: "read" | "unread";
}

export interface NotificationQueryParams {
  page?: number;
  limit?: number;
  status?: "read" | "unread";
  isActive?: boolean;
  userId?: number;
}

export interface UnreadCountResponse {
  count: number;
  unreadCount?: number;
}

// Type unions based on your actual data
export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "alert";
export type NotificationStatus = "read" | "unread";

export interface NotificationUser {
  id: number;
  fname: string;
  lname: string;
}
