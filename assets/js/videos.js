
// api key AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs

// sample working url "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=brunoMars&key=AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs&videoEmbeddable=true&type=video&maxResults=50";
const url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&"

// search label
const searchLabel = "&q="

// manually enter a search term
// todo figure out how to add spaces

// const term = "bruno mars" doesn't work because of the space ... probably something like add a %
const searchTermValue = ""

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
    console.log(data.items);
    const videoId = data.items[0].id
    console.log(videoId)
  });

document.addEventListener("DOMContentLoaded", function () {
  // code here will execute after the document is loaded
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (e) {
    const inputGroup = document.querySelector(".input-group");
    e.preventDefault();
    const searchString = document.getElementById("button-0");
    console.log(searchString.value);
    const urlEncodedSearchString = encodeURIComponent(searchString.value);
    console.log(urlEncodedSearchString);
    fetch(url+searchLabel+searchTermValue+apiKey+requiredLabel+maxResultsLabel)
      .then((response) => response.json())
      .then((data) => {
        
        
      });
  });
  
});
// function renderVideo(videoArray) {
//   const videoHtmlArray = videoArray.map(function (currentVideo) {
//     return `<div class="col-sm">
//     <div class="card" style="width: 18rem;">
//       <img src="${}" class="card-img-top" alt="...">
//       <div class="card-body">
//         <p class="card-title">${}</hp>
//         <p class="card-text">Released: ${}</p>
//         <a href="#" class="btn btn-primary" data="${}" >Add</a>
//       </div>
//     </div>
//   </div>`;
//   });
//   return movieHtmlArray.join("");