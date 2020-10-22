const { top50 } = require("./data/top50");
const express = require("express");

let popularArtist = (req, res) => {
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
      if (everyArtistPopularity[song.artist].length >= topArtist.songs.length) {
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
};

module.exports = { popularArtist };
