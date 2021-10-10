import React, { useEffect, useState, useContext } from "react";
import Spinner from "components/Spinner";

import * as S from "../User/style";

import CountriesList from "components/CountriesList";
import InfiniteScroll from "react-infinite-scroll-component";
import User from "../User";

const UserList = ({
  users,
  isLoading,
  handlerSelectedCountries,
  updateFavorites,
  handlerNextPage,
}) => {
  return (
    <S.UserList>
      <S.Filters>
        {handlerSelectedCountries !== null && (
          <CountriesList handle={handlerSelectedCountries} />
        )}
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          console.log(user);
          return <User user={user} index={index} />;
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
