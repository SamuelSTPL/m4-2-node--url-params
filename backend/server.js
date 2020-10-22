"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { top50 } = require("./data/top50");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get("/top50", (req, res) => {
    res.status(200).json({ status: 200, data: top50 });
  })

  .get("/top50/song/:songId", (req, res) => {
    let song = top50[req.params.songId - 1];
    res.status(200).json({ status: 200, song });
  })

  .get("/top50/artist/:artist", (req, res) => {
    let songs = top50.filter((song) => {
      // console.log(song[artist]);
      return song.artist === req.params.artist;
    });
    res.status(200).json({ status: 200, data: songs });
  })

  .get("/top50/popular-artist", (req, res) => {
    const everyArtistPopularity = {};
    let topArtist = undefined;

    top50.forEach((song) => {
      if (everyArtistPopularity[song.artist]) {
        everyArtistPopularity[song.artist].push(song);
      } else {
        everyArtistPopularity[song.artist] = [song];
      }

      if (topArtist) {
        console.log(everyArtistPopularity[song.artist], topArtist);
        if (
          everyArtistPopularity[song.artist].length >= topArtist.songs.length
        ) {
          topArtist.name = song.artist;
          topArtist.songs = everyArtistPopularity[song.artist];
        }
      } else {
        topArtist = {
          name: song.artist,
          songs: everyArtistPopularity[song.artist],
        };
      }
    });
    res.status(200).json({ status: 200, data: topArtist });
  })

  .get("/top50/artist", (req, res) => {
    let allArtists = new Set();
    top50.forEach((song) => {
      allArtists.add(song.artist);
      return allArtists;
    });
    allArtists = Array.from(allArtists);
    res.status(200).json({ status: 200, data: allArtists });
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
