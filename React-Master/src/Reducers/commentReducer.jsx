import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const allComments = "http://localhost:8000/api/comments";

export const getAllComments = createAsyncThunk(
  "comment/getComments",
  async () => {
    const response = await axios.get(allComments);

    return response.data.data.sort(
      (dateA, dateB) => new Date(dateB.created_at) - new Date(dateA.created_at)
    );
  }
);
export const getCommentsByPostID = createAsyncThunk(
  "comment/getCommentsByPostID",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/CommentsByPost/${id}`
    );
  }
);

const initialState = {
  allCommentData: [],
  postComments: [],
  status: "",
};

export const commentReducer = createSlice({
  name: "commentData",
  initialState,
  reducers: {
    getPostComments: (state, action) => {
      console.log(state.postComments);
      state.postComments = state.allCommentData.filter(
        (ele) => ele.post.id == action.payload
      );

      state.postComments.sort(
        (dateA, dateB) =>
          new Date(dateA.updated_at) - new Date(dateB.updated_at)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllComments.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      console.log(action.payload);
      state.allCommentData = action.payload;
    });

    builder.addCase(getAllComments.rejected, (state) => {
      state.status = "Rejected";
    });

    builder.addCase(getCommentsByPostID.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(getCommentsByPostID.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      console.log(action.payload);
      state.postComments = action.payload;
    });

    builder.addCase(getCommentsByPostID.rejected, (state) => {
      state.status = "Rejected";
    });
  },
});

// Action creators are generated for each case reducer function
export const { getPostComments } = commentReducer.actions;

export default commentReducer.reducer;
