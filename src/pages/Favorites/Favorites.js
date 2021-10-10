import Text from "components/Text";
import * as S from "../style";
import User from "../../components/User"

import React, { useContext, useState, useEffect } from "react";
import { FavoritesContext } from "context";

const Favorites = () => {
  const ctx = useContext(FavoritesContext);
  const [favoritesList, setFavoritesList] = useState([]);
 
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
     setFavoritesList(() => {
      return ctx.fetchFavorites();
    });
   };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        {favoritesList.map((user, index) => {
          return <User user={user} index={index}  fetchFavorites={fetchFavorites}/>;
        })}
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
