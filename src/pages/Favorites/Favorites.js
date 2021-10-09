import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={[]}
          // isLoading={isLoading}
          // handleSelectedCountries={handleSelectedCountries}
        />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
