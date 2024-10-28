import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userData
      );
      return response.data.user; // Adjust based on your API response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logOut = createAsyncThunk("user/logoutUser", async () => {
  // If you need to perform async logout operations, do them here.
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: JSON.parse(localStorage.getItem("user")) || null, // Load user from localStorage
    isAuthenticated: !!localStorage.getItem("user"), // Determine if authenticated based on user data
  },
  reducers: {
    // Optionally, you can reset state on specific actions.
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store user data
        state.isAuthenticated = true; // Set authentication status
        state.success = true; // Add success state
        state.error = null; // Reset error

        // Persist user data to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null; // Clear user data on logout
        state.isAuthenticated = false; // Reset authentication status

        // Remove user data from localStorage
        localStorage.removeItem("user");
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
