import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "../style";

import React, { useContext, useState, useEffect } from "react";
import { FavoritesContext } from "context";

const Favorites = () => {
  const ctx = useContext(FavoritesContext);
  const [favoritesList, setFavoritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    setIsLoading(true);
    setFavoritesList(() => {
      return ctx.fetchFavorites();
    });
    setIsLoading(false);
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <UserList
          users={favoritesList}
          isLoading={isLoading}
          handlerSelectedCountries={null}
          updateFavorites={fetchFavorites}
        />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
