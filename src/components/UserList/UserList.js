import React, { useEffect, useState, useContext } from "react";

import * as S from "../User/style";

import CountriesList from "components/CountriesList";
 
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
       
      </S.List>
    </S.UserList>
  );
};

export default UserList;
