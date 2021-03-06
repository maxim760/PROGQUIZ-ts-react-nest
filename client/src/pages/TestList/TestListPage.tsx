import {
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { QuizApi } from "../../service/QuizApi";
import { ITestFromServer } from "../../store/ducks/quiz/saga";
import { ILoadingStatus } from "../../store/types";
import { getCountForSuccess } from "../../utils/getCountForSuccess";
import { useFilter } from "./hooks/useFilter";
import { useLoadTest } from "./hooks/useLoadTest";
import "./TestListPage.scss";

export type ICategory = string | null;
export const TestListPage: React.FC = (): React.ReactElement => {
  // const history = useHistory();
  // const location = useLocation();
  // const [tests, setTests] = useState<ITestFromServer[]>([]);
  // const [filteredTests, setFilteredTests] = useState<ITestFromServer[]>([]);
  // const [loadingStatus, setLoadingStatus] = useState<ILoadingStatus>(
  //   ILoadingStatus.NEVER
  // );
  // const [categories, setCategories] = useState<string[]>([]);
  // const [activeCategory, setActiveCategory] = useState<ICategory>(null);
  // const [search, setSearch] = useState("");
  // const isActive = (cat: ICategory) => cat === activeCategory;
  // useEffect(() => {
  //   const getTests = async () => {
  //     setLoadingStatus(ILoadingStatus.LOADING);
  //     try {
  //       const tests = await QuizApi.getAll();
  //       if (tests) {
  //         const queryParams = new URLSearchParams(location.search);
  //         const category = queryParams.get("cat");
  //         const query = queryParams.get("query");
  //         setTests(tests);
  //         setFilteredTests(tests);
  //         category && setActiveCategory(category);
  //         query && setSearch(query);
  //         setCategories(
  //           Array.from(new Set(tests.map((test) => test.category)))
  //         );
  //       }
  //       setLoadingStatus(ILoadingStatus.SUCCESS);
  //     } catch (error) {
  //       setLoadingStatus(ILoadingStatus.ERROR);
  //     }
  //   };
  //   getTests();
  // }, []);
  // useEffect(() => {
  //   const regex = new RegExp(search, "i");
  //   const url = [];
  //   if (activeCategory) {
  //     url.push(`cat=${activeCategory}`);
  //   }
  //   if (search) {
  //     url.push(`query=${search}`);
  //   }
  //   history.replace({
  //     search: url.join("&"),
  //   });
  //   setFilteredTests(
  //     tests.reduce((acc: ITestFromServer[], value) => {
  //       if (activeCategory && value.category !== activeCategory) {
  //         return acc;
  //       }
  //       if (
  //         regex.test(value.category) ||
  //         regex.test(value.description) ||
  //         regex.test(value.title)
  //       ) {
  //         acc.push(value);
  //       }
  //       return acc;
  //     }, [])
  //   );
  // }, [search, activeCategory]);
  // const onSearchTest = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };
  // const onClickCategory = (category: ICategory) => () => {
  //   setActiveCategory(category);
  // };
  const { loadingStatus, tests, categories } = useLoadTest();
  const { allCategories, btnCat, searchInput, filteredTests } = useFilter({
    defaultTests: tests,
  });
  if (loadingStatus === ILoadingStatus.ERROR) {
    return <h1>Ошибка</h1>;
  }
  if (loadingStatus === ILoadingStatus.LOADING) {
    return <Loader />;
  }
  return (
    <div className="list">
      <div className="list__header">
        <div className="list__categories">
          <Button color="primary" className="list__button" {...allCategories}>
            Все
          </Button>
          {categories.map((cat, i) => (
            <Button
              key={i}
              onClick={btnCat.onClickCategory(cat)}
              color="primary"
              variant={btnCat.variant(cat)}
              className="list__button"
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="list__search">
          <TextField placeholder="Поиск.." type="search" {...searchInput} />
        </div>
      </div>
      <h2 className="list__title">Выберите тест, который хотите пройти</h2>
      <div className="list__card-wrapper">
        {filteredTests.map(
          ({ title, category, questions, successResult, _id }) => {
            return (
              <Link key={_id} className="list__link" to={`/test/${_id}`}>
                <Card className="list__card">
                  <h1 className="list__name">{title}</h1>
                  <Typography>
                    Категория:&nbsp;<b>{category}</b>
                  </Typography>
                  <Typography>
                    Вопросов:&nbsp;<b>{questions.length}</b>
                  </Typography>
                  <Typography>
                    Чтобы пройти тест успешно, ответьте правильно на&nbsp;
                    <b>
                      {getCountForSuccess({
                        percent: successResult,
                        count: questions.length,
                      })}
                      &nbsp;вопросов
                    </b>
                  </Typography>
                </Card>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
};
