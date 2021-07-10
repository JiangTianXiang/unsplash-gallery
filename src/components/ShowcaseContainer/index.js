import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getLocalStorageWithKey, TOPIC_KEY } from "utils";
import Showcase from "./Showcase";
import {
  ShowcaseWrapper,
  ShowcaseGallery,
  ShowcaseHeader,
} from "./ShowcaseContainer.styles";
import {
  getShowcaseFeed,
  resetState,
  incrementPage,
} from "store/showcaseFeed/showcaseAction";

const MAX_SHOWCASE = 5;
function ShowcaseContainer(props) {
  const [recommendMode, setRecommendMode] = useState(false);
  const [topicFeeds, setTopicFeeds] = useState(null);

  useEffect(() => {
    const topics = getLocalStorageWithKey(TOPIC_KEY);
    if (!topics || topics.length === 0) {
      setRecommendMode(true);
      props.getShowcaseFeed();
    } else {
      setRecommendMode(false);
      setTopicFeeds(topics);
      props.setLoading(true);
    }

    return function cleanup() {
      props.resetState();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { isLoading, hasError, data } = props.showcaseFeed || {};
    const hasData = !!data.length && !hasError;
    if (hasData && !isLoading) {
      data.map((item) => {
        item["feedType"] = "collection";
        item["searchTerm"] = item.id;
        return item;
      });
      props.setLoading(true);
      setTopicFeeds(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showcaseFeed.data]);

  return (
    <ShowcaseWrapper>
      {recommendMode && !!topicFeeds && (
        <ShowcaseHeader>
          Here is some recommend collections for you
        </ShowcaseHeader>
      )}
      <ShowcaseGallery>
        {!!topicFeeds &&
          topicFeeds.map((topicFeed, index) => {
            if (index >= MAX_SHOWCASE) {
              return null;
            }
            return <Showcase key={topicFeed.searchTerm} detail={topicFeed} />;
          })}
      </ShowcaseGallery>
    </ShowcaseWrapper>
  );
}

const mapStateToProps = (state) => ({
  showcaseFeed: state.showcaseFeed,
});

const mapDispatchToProps = {
  getShowcaseFeed,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseContainer);
