import React, { useEffect, useState, useContext } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

import CountriesList from "components/CountriesList";
import { FavoritesContext } from "context";
import InfiniteScroll from "react-infinite-scroll-component";

const UserList = ({
  users,
  isLoading,
  handlerSelectedCountries,
  updateFavorites,
  handlerNextPage,
}) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const ctx = useContext(FavoritesContext);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  /**
   * Function checks if this user is favorite.
   *
   * This function is very bad for performance.
   * Since we cannot make changes on the server,
   * we have to use this function.
   *
   *
   * If we could change the value on the server,
   * we would have a favorite variable of the user.
   * We would just get its value and set our favorite icon.
   *
   *
   * @param user it's value help us check if user is favorite
   * @returns boolean
   */
  const checkFavorite = (user) => {
    const favoritesList = ctx.fetchFavorites();
    for (const item of favoritesList) {
      if (item.login.uuid === user.login.uuid) {
        return true;
      }
    }

    return false;
  };

  return (
    <S.UserList>
      <S.Filters>
        {handlerSelectedCountries !== null && (
          <CountriesList handle={handlerSelectedCountries} />
        )}
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={index === hoveredUserId || checkFavorite(user)}
              >
                <IconButton>
                  <FavoriteIcon
                    color="error"
                    onClick={() => {
                      ctx.updateFavorites(user);
                      if (updateFavorites !== null) {
                        updateFavorites();
                      }
                    }}
                  />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
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
