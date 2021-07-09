import React, { useEffect, useState } from "react";
import { getLocalStorageWithKey, TOPIC_KEY } from "utils";

export default function TopicShowcase(props) {
  const [recommendMode, setRecommendMode] = useState(false);
  const [topicFeed, setTopicFeed] = useState(null);

  useEffect(() => {
    const topics = getLocalStorageWithKey(TOPIC_KEY);
    if (!topics) {
      setRecommendMode(true);
    } else {
      setRecommendMode(false);
      setTopicFeed(topics);
    }
  }, []);

  return (
    <>
      {recommendMode && <div>Recommend mode</div>}
      <div> topic </div>
    </>
  );
}
