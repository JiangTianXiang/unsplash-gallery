import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  ImageColumn,
  ImageArea,
  ImageContainer,
} from "components/UI/Layout/ThreeColumnLayout.styles";
import { ExploreImage, ErrorPage } from "components";
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
      {hasError && <ErrorPage />}
      {hasData && (
        <>
          <div>Saved Photos</div>
          <ImageContainer>
            <ImageArea>
              {renderObject.map((column) => (
                <ImageColumn key={column.key}>
                  {column.images.map((item) => (
                    <ExploreImage key={item.id} item={item} restrict />
                  ))}
                </ImageColumn>
              ))}
            </ImageArea>
          </ImageContainer>
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
