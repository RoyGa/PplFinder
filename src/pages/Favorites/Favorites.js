import React, { useEffect, useRef, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setFavorites(JSON.parse(window.localStorage.getItem('favorites')) || []);
    setIsLoading(false);
  }, []);

  const handleFavoriteClicked = (userIdx) => {
    const updatedFavorites = favorites
    .filter(
      user =>
      user.login.uuid !== favorites[userIdx].login.uuid
    );
    setIsLoading(true);
    setFavorites(updatedFavorites);
    setIsLoading(false);
    window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddComment = (userIdx, comment) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[userIdx] = {
      ...favorites[userIdx],
      comment
    };

    setIsLoading(true);
    setFavorites(updatedFavorites);
    setIsLoading(false);
    window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <UserList
          users={favorites}
          isLoading={isLoading}
          onFavoriteClicked={handleFavoriteClicked}
          onReachedBottom={() => setPage(page + 1)}
          allFavorites
          onAddComment={handleAddComment}
        />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
