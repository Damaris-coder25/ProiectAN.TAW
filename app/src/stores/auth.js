import { defineStore } from "pinia";
import axios from "@/api/index.js";

const API_URL = "http://localhost:3000/access";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    isAuthenticated: Boolean(localStorage.getItem("token")),
  }),
  actions: {
    setTokens(token, refreshToken) {
      this.token = token;
      this.refreshToken = refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.isAuthenticated = true;
    },
    clearTokens() {
      this.token = "";
      this.refreshToken = "";
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      this.isAuthenticated = false;
    },
    async checkCredentials(username, password) {
      try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.success && response.data.token && response.data.refreshToken) {
          this.setTokens(response.data.token, response.data.refreshToken);
          return "";
        } else {
          this.clearTokens();
          return response.data.message;
        }
      } catch {
        this.clearTokens();
        return "An error occurred. Please try again.";
      }
    },
    async refreshAccessToken() {
      if (!this.refreshToken) return false;
      try {
        const response = await axios.post(`${API_URL}/refresh`, { refreshToken: this.refreshToken });
        if (response.data.success && response.data.token && response.data.refreshToken) {
          this.setTokens(response.data.token, response.data.refreshToken);
          return true;
        }
      } catch {
        this.clearTokens();
      }
      return false;
    },
    logout() {
      this.clearTokens();
    },
  },
});