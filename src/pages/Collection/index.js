import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { ExploreImage } from "components";
import {
  ImageContainer,
  ImageArea,
  ImageColumn,
  CollectionInfoContainer,
  CollectionDetails,
} from "./Collection.styles";
import { getCollectionUrl } from "utils";

export default function Collection(props) {
  const [data, setData] = useState([]);
  const [renderObject, setRenderObject] = useState([
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
  ]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPhoto] = useState(props.match.params.total_photos);

  const splitDataToColumns = (newData) => {
    const newRenderObject = [...renderObject];
    let counter = 0;

    while (counter < newData.length) {
      newRenderObject[counter % 3].images.push(newData[counter]);
      counter++;
    }
    return newRenderObject;
  };

  const getData = async () => {
    try {
      const response = await axios(
        getCollectionUrl({ collectionId: props.match.params.id })
      );
      const newList = response.data;
      setRenderObject(splitDataToColumns(newList));
      setData([...data, newList]);
      setError(false);
      setPage(page + 1);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(props);
  const loadSuccess = data.length && !error;
  return (
    loadSuccess && (
      <>
        <CollectionInfoContainer>
          <CollectionDetails>
            <div>Collection "{props.match.params.title}" created by {props.match.params.user}</div>
            <div>{maxPhoto} Photos in this collection</div>
          </CollectionDetails>
        </CollectionInfoContainer>
        <InfiniteScroll
          dataLength={renderObject[0].images.length}
          next={getData}
          hasMore={data.length <= maxPhoto}
          loader={<h4>Loading...</h4>}
          endMessage={<h4>End of collection</h4>}
        >
          <ImageContainer>
            <ImageArea>
              {renderObject.map((column) => (
                <ImageColumn key={column.key}>
                  {column.images.map((item, index) => (
                    <ExploreImage
                      key={column.key * index}
                      item={item}
                      restrict
                    />
                  ))}
                </ImageColumn>
              ))}
            </ImageArea>
          </ImageContainer>
        </InfiniteScroll>
      </>
    )
  );
}
