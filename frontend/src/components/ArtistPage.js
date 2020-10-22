import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import styled from "styled-components";

const ArtistPage = () => {
  const { artistName } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`/top50/artist/${artistName}`)
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.data);
        // console.log(json.data);
      });
  }, []);

  console.log("ArtistPage.js: songs: ", songs);

  return (
    <>
      <Header pageTitle={`Songs by ${artistName}`} />
      <Content>
        {songs.map((song) => {
          return (
            <ListItem>
              <h1>{song.title}</h1>
              <p>Streams: {song.streams}</p>
              <p>Release date: {song.publicationDate}</p>
            </ListItem>
          );
        })}
      </Content>
    </>
  );
};

const ListItem = styled.li`
  display: flex;
  justify-content: space-evenly;
  margin: 25px;
  border-bottom: 1px solid gray;
`;
export default ArtistPage;
