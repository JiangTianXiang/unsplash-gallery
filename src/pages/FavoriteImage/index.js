import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DisplayArea, ImageColumn, ImageArea } from "./FavoriteImage.styles";
import { ExploreImage } from "components";
import { getFavoriteFeed } from "store/favoriteFeed/favoriteFeedAction";

function FavoriteImage(props) {
  useEffect(() => {
    props.getFavoriteFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, hasError, renderObject } = props.favoriteFeed || {};
  const hasData = !!data.length && !hasError;
  return (
    <>
      {!hasData && (
        <div>No image saved yet. Press star button to save some images</div>
      )}
      {hasData && (
        <>
          <div>Saved Photos</div>
          <DisplayArea>
            <ImageArea>
              {renderObject.map((column) => (
                <ImageColumn key={column.key}>
                  {column.images.map((item) => (
                    <ExploreImage key={item.id} item={item} restrict />
                  ))}
                </ImageColumn>
              ))}
            </ImageArea>
          </DisplayArea>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  favoriteFeed: state.favoriteFeed,
});

const mapDispatchToProps = {
  getFavoriteFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteImage);
