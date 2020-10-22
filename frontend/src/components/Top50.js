import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";

const Top50 = () => {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    // this is where we fetch the data from the server and add it to state.
    fetch("/top50")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setAllSongs(json.data);
      });
  }, []);

  // console.log("Top50.js: allSongs: ", allSongs);

  return (
    <>
      <Header pageTitle="Top 50 Songs Streamed on Spotify" />
      <Content>
        {allSongs.map((song) => {
          return (
            <li>
              <Link to={`/music/song/${song.rank}`}>{song.title}</Link>
            </li>
          );
        })}
      </Content>
    </>
  );
};

export default Top50;
