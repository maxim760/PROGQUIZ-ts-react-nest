import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoadingStatus } from "../../types";

type ICategoriesState = {
  categories: string[];
  status: ILoadingStatus;
};

const initialState: ICategoriesState = {
  categories: [],
  status: ILoadingStatus.NEVER,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategories(state, action: PayloadAction<void>) {
      setStatusLoading();
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
      state.status = ILoadingStatus.SUCCESS;
    },
    setStatusError(state, action: PayloadAction<void>) {
      state.status = ILoadingStatus.ERROR;
    },
    setStatusSuccess(state, action: PayloadAction<void>) {
      state.status = ILoadingStatus.SUCCESS;
    },
    setStatusLoading(state, action: PayloadAction<void>) {
      state.status = ILoadingStatus.LOADING;
    },
  },
});

export const {
  fetchCategories,
  setCategories,

  setStatusError,
  setStatusSuccess,
  setStatusLoading,
} = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
