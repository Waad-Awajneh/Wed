import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../Reducers/commentReducer";
import DataReducer from "../Reducers/dataReducer";
import modalReducer from "../Reducers/modalReducer";
import postReducer from "../Reducers/PostReducer";
import SearchReducer from "../Reducers/SearchReducer";

import UserReducer from "../Reducers/UserReducer";
export const store = configureStore({
  reducer: {
    // Data: DataReducer,
    PostsData: postReducer,
    ModalReducer: modalReducer,
    CommentsData: commentReducer,
    UserData: UserReducer,
    SearchData: SearchReducer,
  },
});
