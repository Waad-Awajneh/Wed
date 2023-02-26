import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getFavorite = createAsyncThunk(
  "posts/getFavorite",
  async (config) => {
    const response = await axios(config);

    return response.data.data;
  }
);
export const getFollowers = createAsyncThunk(
  "users/getFollowers",
  async (config) => {
    const response = await axios(config);

    return response.data.data;
  }
);
export const getUserProfileData = createAsyncThunk(
  "userInfo/getUserProfileData",
  async (config) => {
    const response = await axios(config);

    return response.data.data;
  }
);

const initialState = {
  favoritePostsData: [],
  followersData: [],
  favoritePostsId: [],
  followersId: [],
  userProfileData: [],
  status: "",
};

export const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    getFavoritePostsId: (state, action) => {
      state.favoritePostsId = state.favoritePostsData.map((ele) => {
        return ele.id;
      });
    },
    getFollowersId: (state, action) => {
      state.followersId = state.followersData.map((ele) => {

        return ele.user_id;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavorite.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(getFavorite.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      state.favoritePostsData = action.payload;
    });

    builder.addCase(getFavorite.rejected, (state) => {
      state.status = "Rejected";
    });
    builder.addCase(getUserProfileData.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      state.userProfileData = action.payload;
    });
    builder.addCase(getUserProfileData.rejected, (state) => {
      state.status = "Rejected";
    });
    builder.addCase(getFollowers.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "Fulfilled";
      state.followersData = action.payload;
    });
    builder.addCase(getFollowers.rejected, (state) => {
      state.status = "Rejected";
    });
  },
});

export const { getFavoritePostsId, getFollowersId } = UserReducer.actions;

export default UserReducer.reducer;
