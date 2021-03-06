import React, { useEffect, useRef, useState } from "react";
import { ITestFromServer } from "../../../store/ducks/quiz/saga";
import { ICategory } from "../TestListPage";
import { IUseFilterProps, IUSeFilter } from "./types";
import { useUrl } from "./useUrl";

export const useFilter = ({
  defaultTests = [],
}: IUseFilterProps): IUSeFilter => {
  const [mounted, setMounted] = useState(false);

  const { searchParams, replaceState } = useUrl();
  const [filteredTests, setFilteredTests] = useState<ITestFromServer[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<ICategory>(null);
  const [search, setSearch] = useState("");

  const isActiveCategory = (cat: ICategory) => cat === activeCategory;
  const isActiveAllCats = () => activeCategory === null;
  const onSearchTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onClickCategory = (category: ICategory) => () => {
    setActiveCategory(category);
  };
  const setActiveAllCats = () => {
    setActiveCategory(null);
  };
  useEffect(() => {
    !filteredTests && defaultTests.length && setFilteredTests(defaultTests);
  }, [defaultTests]);
  useEffect(() => {
    if (!!filteredTests) {
      const { cat, query } = searchParams;
      cat && setActiveCategory(cat);
      query && setSearch(query);
    }
  }, [!!filteredTests]);

  useEffect(() => {
    if (!mounted) return setMounted(true); // чтобы эффект работал только при апдейте параматров из зависимостей
    
    const regex = new RegExp(search, "i");
    replaceState({
      cat: activeCategory,
      query: search,
    });
    setFilteredTests(
      defaultTests.reduce((acc: ITestFromServer[], value) => {
        if (activeCategory && value.category !== activeCategory) {
          return acc;
        }
        if (
          regex.test(value.category) ||
          regex.test(value.description) ||
          regex.test(value.title)
        ) {
          acc.push(value);
        }
        return acc;
      }, [])
    );
  }, [search, activeCategory]);
  return {
    allCategories: {
      onClick: setActiveAllCats,
      variant: isActiveAllCats() ? "contained" : "outlined",
    },
    btnCat: {
      onClickCategory,
      variant: (cat: ICategory) =>
        isActiveCategory(cat) ? "contained" : "outlined",
    },
    searchInput: {
      value: search,
      onChange: onSearchTest,
    },
    filteredTests: filteredTests || [],
  };
};
