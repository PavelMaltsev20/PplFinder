import React, { useEffect, useState, useContext } from "react";
import Spinner from "components/Spinner";

import * as S from "../User/style";

import CountriesList from "components/CountriesList";
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
      </S.Filters>
      <S.List>
     
       
      </S.List>
    </S.UserList>
  );
};

export default UserList;
