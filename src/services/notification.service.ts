import apiClient from "@/lib/api";
import { ApiError } from "@/types/Api";
import { NotificationsListResponse } from "@/types/notification";

import { AxiosError } from "axios";

class NotificationService {
  async getNotifications(
    params: {
      page?: number;
      limit?: number;
      userId?: number;
    } = {}
  ): Promise<NotificationsListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.userId) queryParams.append("userId", params.userId.toString());

      return await apiClient.get(`/notifications?${queryParams.toString()}`);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      const { status, data } = error.response;
      const errorData = data as {
        message?: string;
        error?: string;
        errors?: string[];
      };
      return {
        message: errorData?.message || errorData?.error || "An error occurred",
        status,
        errors: errorData?.errors || [],
      };
    } else if (error.request) {
      return {
        message: "Network error. Please check your connection.",
        status: 0,
      };
    } else {
      return {
        message: error.message || "An unexpected error occurred",
      };
    }
  }
}

// Create and export a singleton instance
const notificationService = new NotificationService();
export default notificationService;
