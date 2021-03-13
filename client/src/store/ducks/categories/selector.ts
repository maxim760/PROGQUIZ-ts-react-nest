import { statusToObj } from "../../../utils/statusToObj";
import { RootState } from "../../rootReducer";

export const selectCategories = (state: RootState) => state.categories.categories
export const selectCategoriesStatus = (state: RootState) => {
  const status = state.categories.status
  return statusToObj(status)
}