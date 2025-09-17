interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const TokenService = {
  // Get token from localStorage
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(
      process.env.NEXT_PUBLIC_TOKEN_KEY || "car_rental_token"
    );
  },

  // Set token in localStorage
  setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      process.env.NEXT_PUBLIC_TOKEN_KEY || "car_rental_token",
      token
    );
  },

  // Remove token from localStorage
  removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(
      process.env.NEXT_PUBLIC_TOKEN_KEY || "car_rental_token"
    );
  },

  // Get refresh token
  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "car_rental_refresh_token"
    );
  },

  // Set refresh token
  setRefreshToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "car_rental_refresh_token",
      token
    );
  },

  // Remove refresh token
  removeRefreshToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "car_rental_refresh_token"
    );
  },

  // Clear all tokens
  clearTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
  },

  // Check if token exists
  hasToken(): boolean {
    return !!this.getToken();
  },

  decodeToken(token: string): DecodedToken | null {
    try {
      const payload = token.split(".")[1];
      const decoded = atob(payload);
      return JSON.parse(decoded) as DecodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired(token?: string): boolean {
    const accessToken = token || this.getToken();
    if (!accessToken) return true;

    try {
      const decoded = this.decodeToken(accessToken);
      if (!decoded || !decoded.exp) return true;

      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return true;
    }
  },

  // Get user data from token
  getUserFromToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) return null;

    return this.decodeToken(token);
  },
};
