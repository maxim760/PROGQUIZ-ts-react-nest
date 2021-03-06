import { ITestFromServer } from "../../../store/ducks/quiz/saga";
import { ICategory } from "../TestListPage";

export type IUseFilterProps = {
  defaultTests: ITestFromServer[];
};

type IAllCategories = {
  onClick(): void;
  variant: "contained" | "outlined";
};
type IBtnCat = {
  onClickCategory: (category: ICategory) => () => void;
  variant: (cat: ICategory) => "contained" | "outlined";
};

export type IUSeFilter = {
  allCategories: IAllCategories;
  btnCat: IBtnCat;
  searchInput: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  filteredTests: ITestFromServer[];
};