import React, { useEffect, useState } from "react";
import { removeTopic, saveTopic, topicExistInLocalStorage } from "utils/index";
import {
  TopicDetailContainer,
  CoverPhoto,
  PhotoResultDetails,
  TopicTitle,
  TopicDescription,
  TopicStats,
  Follow,
} from "./TopicDetail.styles";

const TopicDetail = (props) => {
  const { total_photos, description, cover_photo } = props.detail || {};
  const [followed, setFollowed] = useState(false);
  const searchTerm = props.searchTerm;

  const handleClick = () => {
    followed ? removeTopic(props.detail.id) : saveTopic(props.detail);
    setFollowed(!followed);
  };

  useEffect(() => {
    setFollowed(topicExistInLocalStorage(props.detail.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TopicDetailContainer>
      <CoverPhoto src={cover_photo.urls.regular} />
      <PhotoResultDetails>
        <TopicTitle>#{searchTerm}</TopicTitle>
        <TopicDescription>{description}</TopicDescription>
        <TopicStats>{total_photos} Photos found in Topic</TopicStats>
        <Follow onClick={handleClick}>
          {followed ? "Un-Follow" : "Follow"}
        </Follow>
      </PhotoResultDetails>
    </TopicDetailContainer>
  );
};

export default TopicDetail;
