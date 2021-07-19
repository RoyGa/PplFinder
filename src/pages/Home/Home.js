import React, { useEffect, useRef, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const { users, isLoading, fetchUsers } = usePeopleFetch();
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(0);
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    setFavorites(JSON.parse(window.localStorage.getItem('favorites')) || []);
  }, []);

  useEffect(() => {
    fetchUsers({ countries });
  }, [page]);

  const handleCountriesFilterChanged = (newCountries) => {
    fetchUsers({
      countries: newCountries,
      overwrite: true
    });
  
    setCountries(newCountries);
  };

  const handleFavoriteClicked = (userIdx) => {
    const updatedFavorites = isInFavorites(userIdx)
    ? favorites.filter(user => user.login.uuid !== users[userIdx].login.uuid)
    : [...favorites, users[userIdx]];

    setFavorites(updatedFavorites);
    window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isInFavorites = (userIdx) => 
    favorites.find(user => user.login.uuid === users[userIdx].login.uuid);

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          onCountryFilterChanged={handleCountriesFilterChanged}
          onFavoriteClicked={handleFavoriteClicked}
          onReachedBottom={() => setPage(page + 1)}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
