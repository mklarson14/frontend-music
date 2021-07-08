// test
console.log("videos.js")

// api key AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs

// sample working url "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=brunoMars&key=AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs&videoEmbeddable=true&type=video&maxResults=50";
const url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&"

// search label
const searchLabel = "&q="

// manually enter a search term
// todo figure out how to add spaces

// const term = "bruno mars" doesn't work because of the space ... probably something like add a %
const searchTermValue = "brunomars"

// api key
const apiKey = "&key=AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs"

// required stuff
const requiredLabel = "&videoEmbeddable=true&type=video"

// max results
const maxResultsLabel = "&maxResults=50"

// fetch with url
fetch(url+searchLabel+searchTermValue+apiKey+requiredLabel+maxResultsLabel)
  // convert response from json
  .then((response) => response.json())
  // print response
  .then((data) => {
    console.log(data);
  });
