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

      // Store tokens and user data
      TokenService.setToken(accessToken);
      TokenService.setUserData(user);
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

      // Store tokens and user data
      TokenService.setToken(accessToken);
      TokenService.setUserData(user);
      if (response.data.refreshToken) {
        TokenService.setRefreshToken(response.data.refreshToken);
      }

      return { accessToken, user };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Logout user
  logout(): void {
    // Clear all tokens and user data from localStorage
    TokenService.clearTokens();
    TokenService.removeUserData();

    // Optional: Clear any other app-specific data
    // localStorage.removeItem('someOtherAppData');

    console.log("User logged out successfully");
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
      await apiClient.post(`/users/verify-email/${token}`);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Request OTP for password reset
  async requestPasswordResetOTP(email: string): Promise<void> {
    try {
      await apiClient.post("/auth/reset-otp", {
        email,
      });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Reset password with OTP
  async resetPasswordWithOTP(otp: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post(`/auth/reset-password/${otp}`, {
        newPassword,
      });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Update user profile
  async updateProfile(profileData: {
    fName: string;
    lName: string;
    phone?: string;
  }): Promise<User> {
    try {
      const response = await apiClient.put("/auth/profile", profileData);
      const user = response.data.user;

      // Update stored user data
      TokenService.setUserData(user);

      return user;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Change password (for authenticated users)
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      await apiClient.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("picture", file);

      const response = await apiClient.post("/auth/upload-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.pictureUrl;
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
    // First try to get stored user data
    const storedUser = TokenService.getUserData();
    if (storedUser) {
      return storedUser as User;
    }

    // Fallback to token data (limited info)
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
