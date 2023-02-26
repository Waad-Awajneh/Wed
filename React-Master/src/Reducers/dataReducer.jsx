import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//get all Articles
const allFollowingData = "following.json";

export const getFollowingData = createAsyncThunk(
  "data/getFollowingData",
  async () => {
    const response = await axios.get("http://localhost:8000/api/posts");
    console.log(response.data);
    return response.data;
  }
);
export const getRandData = createAsyncThunk("data/getRandomData", async () => {
  const response = await axios.get("info.json");
  console.log(response.data);
  return response.data;
});
export const getProfileData = createAsyncThunk(
  "data/getProfileData",
  async () => {
    const response = await axios.get("me.json");
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  data: [],

  status: "",
};

export const DataReducer = createSlice({
  name: "DataReducer",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getFollowingData.pending, (state) => {
      state.status = "Pending";
    });

    builder.addCase(getFollowingData.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      state.data = action.payload;
      console.log(state.data);
    });

    builder.addCase(getFollowingData.rejected, (state) => {
      state.status = "Rejected";
    });

    builder.addCase(getRandData.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      state.data = action.payload;
    });
    builder.addCase(getRandData.rejected, (state) => {
      state.status = "Rejected";
    });
    builder.addCase(getProfileData.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      state.data = action.payload;
    });
    builder.addCase(getProfileData.rejected, (state) => {
      state.status = "Rejected";
    });
  },
});


export default DataReducer.reducer;
