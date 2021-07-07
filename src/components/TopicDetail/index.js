import React, { useEffect, useState } from "react";
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
    setFollowed(!followed);
  };
  
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
