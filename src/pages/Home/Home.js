import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "../style";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/Spinner";

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

          <InfiniteScroll
            dataLength={users.length} //This is important field to render the next data
            next={handlerNextPage}
            hasMore={true}
            loader={isLoading && <h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={handlerNextPage}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
            }
          >
            {
              users.map((user, index) => {
                return <User user={user} index={index} />;
              })

              /* <UserList
                users={users}
                isLoading={isLoading}
                handlerSelectedCountries={handlerSelectedCountries}
                updateFavorites={null}
                handlerNextPage={handlerNextPage}
              /> */
            }
          </InfiniteScroll>
        </S.Header>
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
