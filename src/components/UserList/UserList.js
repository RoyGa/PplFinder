import React, { useEffect, useState, useRef } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { TextField } from "@material-ui/core";
import * as S from "./style";

const UserList = ({ users, isLoading, onCountryFilterChanged, onFavoriteClicked, onReachedBottom, isFavorites }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const usersList = useRef(null);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  useEffect(() => {
    usersList.current.addEventListener('scroll', () => {
      isBottom() && onReachedBottom();
    }); 
  }, [users]);

  const isBottom = () => {
    const {
      scrollHeight,
      offsetHeight,
      scrollTop
    } = usersList.current;

    return scrollHeight - offsetHeight === scrollTop;
  };

  const onChecked = (value) => {
    const checked = countries.includes(value)
    ? countries.filter(c => c !== value)
    : [...countries, value];
    
    setCountries(checked);
    onCountryFilterChanged(checked);

    usersList.current.scrollTop = 0;
  };

  const handleFavoriteClicked = () => {
    if (!favorites.includes(hoveredUserId)) {
      setFavorites([...favorites, hoveredUserId]);
    } else {
      setFavorites(favorites.filter(index => index !== hoveredUserId));
    }
    
    onFavoriteClicked(hoveredUserId);
  };

  const isFavorite = (index) => 
    index === hoveredUserId
    || favorites.includes(index)
    || isFavorites;
  
  return (
    <S.UserList>
      {!isFavorites && (
        <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={onChecked} />
        <CheckBox value="AU" label="Australia" onChange={onChecked} />
        <CheckBox value="CA" label="Canada" onChange={onChecked} />
        <CheckBox value="DE" label="Germany" onChange={onChecked} />
        <CheckBox value="ES" label="Spain" onChange={onChecked} />
      </S.Filters>
      )}
      {/* <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={onChecked} />
        <CheckBox value="AU" label="Australia" onChange={onChecked} />
        <CheckBox value="CA" label="Canada" onChange={onChecked} />
        <CheckBox value="DE" label="Germany" onChange={onChecked} />
        <CheckBox value="ES" label="Spain" onChange={onChecked} />
      </S.Filters> */}
      <S.List ref={usersList} >
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
              {/* <S.IconButtonWrapper isVisible={index === hoveredUserId || isFavorite(index)} onClick={handleFavoriteClicked}> */}
              <S.IconButtonWrapper isVisible={isFavorite(index)} onClick={handleFavoriteClicked}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
              {/* <TextField id="standard-basic" label="Standard" /> */}
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
