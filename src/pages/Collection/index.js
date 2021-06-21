import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { ExploreImage } from "components";
import { ImageContainer, ImageArea, ImageColumn } from "./Collection.styles";

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
      const id = props.match.params.id;
      const response = await axios(
        `https://api.unsplash.com/collections/${id}/photos?client_id=Hq0j6DyWf2PdMPFtpxM32s74jwFbvcnGPpAaHjJXb1o&page=${page}&per_page=30`
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

  const clearState = () => {
    setPage(1);
    setData([]);
    setRenderObject([
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ]);
    setError(false);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(maxPhoto);
  const loadSuccess = data.length;
  return (
    loadSuccess && (
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
                  <ExploreImage key={column.key * index} item={item} restrict/>
                ))}
              </ImageColumn>
            ))}
          </ImageArea>
        </ImageContainer>
      </InfiniteScroll>
    )
  );
}
