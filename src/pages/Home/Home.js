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

  // useEffect(() => {
  //   console.log("blabla");
  //   // if (countries === null)
  //   fetchUsers({ page, countries });
  // }, [countries, page]);

  useEffect(() => {
    console.log("blabla");
    
    fetchUsers({ countries });
  }, [page]);

  

  const handleCountriesFilterChanged = (newCountries) => {
    
    fetchUsers({
      countries: newCountries,
      overwrite: true
    });
  
    setCountries(newCountries);
  }

  // useEffect(() => {
  //   console.log("blabla");
  //   setPage(0);
    
  //   fetchUsers({ page, countries, overwrite: page === 0 ? true : false });
  // }, [page]);

  

  // const handleCountriesFilterChanged = (newCountries) => {
    
  //   // fetchUsers({ page, countries: newCountries, overwrite: true });
    

  //   setCountries(newCountries);
  //   setPage(-1);
  // }


  const handleFavoriteClicked = (userIdx) => {
    console.log(users[userIdx].login.uuid);

    const updatedFavorites = isInFavorites(userIdx)
    ? favorites.filter(user => user.login.uuid !== users[userIdx].login.uuid)
    : [...favorites, users[userIdx]];

    setFavorites(updatedFavorites);
    window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isInFavorites = (userIdx) => 
    favorites.findIndex(user => user.login.uuid === users[userIdx].login.uuid) > - 1;

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder {users.length}
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          // onCountryFilterChanged={setCountries}
          onCountryFilterChanged={handleCountriesFilterChanged}
          onFavoriteClicked={handleFavoriteClicked}
          onReachedBottom={() => setPage(page + 1)}
          favorites={favorites}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
