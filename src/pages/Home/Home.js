import React from "react";
import Text from "components/Text";
import { usePeopleFetch } from "hooks";
import * as S from "../style";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/Spinner";
import CountriesList from "../../components/CountriesList";
import User from "../../components/User";

const Home = () => {
  const {
    users,
    isLoading,
    handlerSelectedCountries,
    handlerNextPage,
  } = usePeopleFetch();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <S.Filters>
          <CountriesList handle={handlerSelectedCountries} />
        </S.Filters>
        <InfiniteScroll
          dataLength={users.length}
          next={handlerNextPage}
          hasMore={true}
          loader={isLoading && <h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          refreshFunction={handlerSelectedCountries}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {users.map((user, index) => {
            return <User user={user} index={index} fetchFavorites={null} />;
          })}
        </InfiniteScroll>
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.Content>
    </S.Home>
  );
};

export default Home;
