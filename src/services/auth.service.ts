import apiClient from "@/lib/api";
import { ApiError } from "@/types/Api";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/auth";
import { TokenService } from "@/utils/token";
import { AxiosError } from "axios";

class AuthService {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      const { accessToken, user } = response.data;

      // Store tokens
      TokenService.setToken(accessToken);
      if (response.data.refreshToken) {
        TokenService.setRefreshToken(response.data.refreshToken);
      }

      return { accessToken, user };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Register user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post("/users/signup", userData);
      const { accessToken, user } = response.data;

      // Store tokens
      TokenService.setToken(accessToken);
      if (response.data.refreshToken) {
        TokenService.setRefreshToken(response.data.refreshToken);
      }

      return { accessToken, user };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      TokenService.clearTokens();
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get("/auth/profile");
      return response.data.user || response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Refresh access token
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post("/auth/refresh", {
        refreshToken,
      });

      const { accessToken } = response.data;
      TokenService.setToken(accessToken);

      return accessToken;
    } catch (error) {
      TokenService.clearTokens();
      throw this.handleError(error as AxiosError);
    }
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    try {
      await apiClient.post("/auth/verify-email", { token });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await apiClient.post("/auth/forgot-password", { email });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post("/auth/reset-password", {
        token,
        password: newPassword,
      });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = TokenService.getToken();
    return !!token && !TokenService.isTokenExpired(token);
  }

  // Get current user from token
  getCurrentUserFromToken(): User | null {
    const tokenData = TokenService.getUserFromToken();
    if (!tokenData) return null;

    return {
      id: tokenData.id,
      email: tokenData.email,
      role: tokenData.role,
      uuid: "",
      fName: "",
      lName: "",
      phone: null,
      isActive: true,
      isTermsAccepted: true,
      lastLogin: null,
      picture: null,
      isVerified: true,
      createdAt: "",
      updatedAt: "",
    } as User;
  }

  // Handle API errors
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // API responded with error status
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
      // Network error
      return {
        message: "Network error. Please check your connection.",
        status: 0,
      };
    } else {
      // Other error
      return {
        message: error.message || "An unexpected error occurred",
      };
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
