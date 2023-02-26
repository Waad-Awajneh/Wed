import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  openEditComment: false,
  openEditPost: false,
  update: false,
  openFormModal:false,
  openFormPriceModal:false,
  post:{},
};

export const modalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    openModal: (state) => {

      state.isOpen = true;
console.log( state.isOpen);
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    handelOpenModelToEditComment: (state) => {
   
      state.openEditComment = !state.openEditComment;
    },  
      handelOpenModelToEditPost: (state,action) => {
   
      state.openEditPost = !state.openEditPost;
      state.post=action.payload;
    },
    handelUpdate: (state) => {
      state.update = !state.update;
    },
    // openFormModal: (state) => {

    //   state.isOpen = true;

    // },
    // closeFormModal: (state) => {
    //   state.isOpen = false;
    // },
    handelOpenFormModel: (state) => {

      state.openFormModal = !state.openFormModal;
    },
    handelOpenPriceModel: (state) => {

      state.openFormPriceModal = !state.openFormPriceModal;

    },
  },
});


export const {
  closeModal,
  openModal,
  handelOpenModelToEditComment,
  handelUpdate,handelOpenFormModel
  ,handelOpenPriceModel,
  handelOpenModelToEditPost
} = modalReducer.actions;

export default modalReducer.reducer;
