import {
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Loader } from "../../components";
import { ILoadingStatus } from "../../store/types";
import { getCountForSuccess } from "../../utils/getCountForSuccess";
import { useFilter } from "./hooks/useFilter";
import { useLoadTestList } from "./hooks/useLoadTestList";
import "./TestListPage.scss";

export type ICategory = string | null;
export const TestListPage: React.FC = (): React.ReactElement => {
  const { loadingStatus, tests, categories } = useLoadTestList();
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
