import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";

const PopularArtistPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/top50/popular-artist")
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.data.songs);
      });
  }, []);

  console.log("PopularArtistPage.js: songs: ", songs);
  // console.log("PopularArtistPage.js: songs: ", songs.songs);
  // const popSongs = songs.songs;
  // console.log(popSongs);

  return (
    <>
      <Header pageTitle="Most Popular Artist" />
      <Content>
        {songs.map((song) => {
          return (
            <ListItems>
              <StyledLink to={`/most-popular-artist${song.rank}`}>
                <Left>
                  <h1>#{song.rank}</h1>
                  <p>{song.streams} streams</p>
                </Left>
                <Middle>
                  <h3>{song.title}</h3>
                  <p>by {song.artist}</p>
                </Middle>
                <Right>
                  <p>{song.publicationDate}</p>
                </Right>
              </StyledLink>
            </ListItems>
          );
        })}
      </Content>
    </>
  );
};

const ListItems = styled.li`
  list-style: none;
  height: 100px;
  margin: 25px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  display: flex;
  color: black;
  text-decoration: none;
  justify-content: space-around;
  align-items: flex-end;
  border-bottom: 1px solid gray;
`;

export default PopularArtistPage;
