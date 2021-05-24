import React, { useEffect, useRef } from 'react';
import AddButton from '../../components/AddButton/AddButton.component';
import List from '../../components/List/List.component';
import Pagination from '../../components/Pagination/Pagination.component';
import SpinningDialog from '../../components/SpinningDialog/SpinningDialog.component';
import ErrorDialog from '../../components/ErrorDialog/ErrorDialog.component';
import { APIs, useApi } from '../../api';

import './Home.style.scss';

const HomePage = () => {
  const [
    { error, data, loading, prevIsDisabled, nextIsDisabled },
    changePageState,
  ] = usePageData(
    {
      limit: 10,
      skip: 0,
      page: 1,
    },
    APIs.GET_ALL_USERS
  );

  if (error) {
    return <ErrorDialog>{error.message}</ErrorDialog>
  }

  if (loading) {
    return <SpinningDialog/>;
  }

  return (
    <div className="home-page page-container">
      <AddButton to="/create-user" />
      <List
        data={data?.data}
        updateList={changePageState.bind(null, { type: 'CURR_PAGE' })}
        startNumber={data ? data.metaData.pagination.skip : 0}
      />
      {data?.data.length ? (
        <Pagination
          onPrev={changePageState.bind(null, { type: 'PREV_PAGE' })}
          prevIsDisabled={prevIsDisabled}
          onNext={changePageState.bind(null, { type: 'NEXT_PAGE' })}
          nextIsDisabled={nextIsDisabled}
        />
      ) : null}
    </div>
  );
};

export default HomePage;

const usePageData = (initial, API) => {
  const [state, getAllUsers] = useApi(API);

  const pageState = useRef();

  useEffect(() => {
    pageState.current = initial;
    getAllUsers(pageState.current);
  }, []);

  const changePageState = ({ type }) => {
    const {
      data: {
        metaData: {
          pagination: { total },
        },
      },
    } = state;

    switch (type) {
      case 'NEXT_PAGE': {
        const maxPageNumber =
          Math.floor((total - 1) / pageState.current.limit) + 1;
        if (pageState.current.page > maxPageNumber) {
          pageState.current.page = maxPageNumber;
        } else if (pageState.current.page < maxPageNumber) {
          pageState.current = {
            ...pageState.current,
            skip: pageState.current.skip + pageState.current.limit,
            page: pageState.current.page + 1,
          };
          getAllUsers(pageState.current);
        }
        break;
      }
      case 'PREV_PAGE': {
        if (pageState.current.page > 1) {
          pageState.current = {
            ...pageState.current,
            skip: pageState.current.skip - pageState.current.limit,
            page: pageState.current.page - 1,
          };
          getAllUsers(pageState.current);
        }
        break;
      }
      case 'CURR_PAGE': {
        const maxPageNumber =
          Math.floor((total - 2) / pageState.current.limit) + 1;
        if (pageState.current.page > maxPageNumber) {
          pageState.current = {
            ...pageState.current,
            skip: pageState.current.skip - pageState.current.limit,
            page: pageState.current.page - 1,
          };
        }
        getAllUsers(pageState.current);
        break;
      }
      default:
        break;
    }
  };

  const prevIsDisabled = state.data ? pageState.current.page === 1 : false;
  const nextIsDisabled = state.data
    ? pageState.current.page ===
      Math.floor(
        (state.data.metaData.pagination.total - 1) / pageState.current.limit
      ) +
        1
    : false;

  return [
    {
      ...state,
      prevIsDisabled,
      nextIsDisabled,
    },
    changePageState,
  ];
};
