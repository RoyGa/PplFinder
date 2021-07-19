import React, { useEffect, useState, useRef } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SaveIcon from '@material-ui/icons/Save';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Collapse, TextField } from "@material-ui/core";
import * as S from "./style";

const UserList = ({
  users,
  isLoading,
  onCountryFilterChanged,
  onFavoriteClicked,
  onReachedBottom,
  allFavorites,
  onAddComment
}) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const [expandUserId, setExpandUserId] = useState();

  const usersList = useRef(null);

  useEffect(() => {
    usersList.current.addEventListener('scroll', () => {
      isBottom() && onReachedBottom();
    }); 
  }, [users]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const isBottom = () => {
    const {
      scrollHeight,
      offsetHeight,
      scrollTop
    } = usersList.current;

    return scrollHeight - offsetHeight === scrollTop;
  };

  const handleChecked = (value) => {
    const checked = countries.includes(value)
    ? countries.filter(country => country !== value)
    : [...countries, value];
    
    setCountries(checked);
    onCountryFilterChanged(checked);

    usersList.current.scrollTop = 0;
  };

  const handleFavoriteClicked = () => {
    const updatedFavorites = favorites.includes(hoveredUserId)
    ? favorites.filter(index => index !== hoveredUserId)
    : [...favorites, hoveredUserId];

    setFavorites(updatedFavorites);
    
    onFavoriteClicked(hoveredUserId);
  };
  
  const handleBlured = (e, index) => {
    const comment = e.target.value;
    onAddComment(index, comment);
  };

  const handleShowComment = (index) => {
    const userIdToExpand = expandUserId === index ? null : index;
    setExpandUserId(userIdToExpand);
  };
  
  return (
    <S.UserList>
      {allFavorites ? null : <Filters onChecked={handleChecked} />}
      <S.List ref={usersList} >
        {users.map((user, index) => {
          const isFavorite = index === hoveredUserId
          || allFavorites
          || favorites.includes(index);

          const isCommentIconVisible = user.comment
          || index === hoveredUserId
          || index === expandUserId;
          
          const comment = user.comment
          ? user.comment
          : "Add a comment...";

          return (
            <S.UserWrapper key={index}>
              <S.User
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
                {allFavorites && (
                  <CommentButton
                    isVisible={isCommentIconVisible}
                    type={index === expandUserId}
                    onExpand={() => handleShowComment(index)}
                  />
                )}
                <FavoriteButton
                  isVisible={isFavorite}
                  onFavoriteClicked={handleFavoriteClicked}
                />
              </S.User>
              {allFavorites && (
                <CollapsedComment
                  index={index}
                  expand={index === expandUserId}
                  onBlured={handleBlured}
                  comment={comment}
                />
              )}
            </S.UserWrapper>
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

const FavoriteButton = ({ isVisible, onFavoriteClicked }) => (
  <S.IconButtonWrapper
    isVisible={isVisible}
    onClick={onFavoriteClicked}
  >
    <IconButton>
      <FavoriteIcon color="error" />
    </IconButton>
  </S.IconButtonWrapper>
);

const Filters = ({ onChecked }) => (
  <S.Filters>
    <CheckBox value="BR" label="Brazil" onChange={onChecked} />
    <CheckBox value="AU" label="Australia" onChange={onChecked} />
    <CheckBox value="CA" label="Canada" onChange={onChecked} />
    <CheckBox value="DE" label="Germany" onChange={onChecked} />
    <CheckBox value="ES" label="Spain" onChange={onChecked} />
  </S.Filters>
);

const CommentButton = ({ isVisible, type, onExpand }) => {
  return (
    <S.IconButtonWrapper isVisible={isVisible} >
      <IconButton onClick={onExpand}>
        {type ? <SaveIcon /> : <AddCommentIcon />}
      </IconButton>
    </S.IconButtonWrapper>
  );
};

const CollapsedComment = ({ index, expand, onBlured, comment }) => {
  return (
    <Collapse in={expand} >
      <S.TextFieldWrapper style={{ marginTop: "20px", padding:"14px" }}>
        <TextField
          onBlur={(e) => onBlured(e, index)}
          label="Comment"
          variant="outlined"
          defaultValue={comment}
          style={{ width:"100%" }}
        />
      </S.TextFieldWrapper>
    </Collapse>
  );
};

export default UserList;
