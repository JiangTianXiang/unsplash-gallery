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
  AuthorName,
} from "./TopicDetail.styles";

const TopicDetail = (props) => {
  const { total_photos, description, cover_photo } = props.detail || {};
  const [followed, setFollowed] = useState(false);
  const searchTerm = props.searchTerm;
  const feedType = props.collection ? "collection" : "topic";

  const handleClick = () => {
    props.detail["feedType"] = feedType;
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
        {description && <TopicDescription>{description}</TopicDescription>}
        {props.author && (
          <AuthorName to={`/user/${props.author}`}>
            Created by: {props.author}
          </AuthorName>
        )}
        <TopicStats>
          {total_photos} Photos found in {feedType}
        </TopicStats>
        <Follow onClick={handleClick}>
          {followed ? "Un-Follow" : "Follow"}
        </Follow>
      </PhotoResultDetails>
    </TopicDetailContainer>
  );
};

export default TopicDetail;
