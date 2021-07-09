import React, { useEffect, useState } from "react";
import { getLocalStorageWithKey, TOPIC_KEY } from "utils";
import Showcase from "./Showcase";
import { Container } from "./ShowcaseContainer.styles";

const MAX_SHOWCASE = 5;
export default function ShowcaseContainer(props) {
  const [recommendMode, setRecommendMode] = useState(false);
  const [topicFeeds, setTopicFeeds] = useState(null);

  useEffect(() => {
    const topics = getLocalStorageWithKey(TOPIC_KEY);
    if (!topics) {
      setRecommendMode(true);
    } else {
      setRecommendMode(false);
      setTopicFeeds(topics);
    }
  }, []);

  return (
    <Container>
      {recommendMode && <div>Recommend mode</div>}
      {!!topicFeeds &&
        topicFeeds.map((topicFeed, index) => {
          if (index >= MAX_SHOWCASE) {
            return null;
          }
          return <Showcase detail={topicFeed} />;
        })}
    </Container>
  );
}
