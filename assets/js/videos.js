
// api key AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs

// sample working url "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=brunoMars&key=AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs&videoEmbeddable=true&type=video&maxResults=30";
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
const maxResultsLabel = "&maxResults=25"

// fetch with url
fetch(url + searchLabel + searchTermValue + apiKey + requiredLabel + maxResultsLabel)
  // convert response from json
  .then((response) => response.json())
  // print response
  .then((data) => {
    // console.log(data.items);
    const videoId = data.items[0].snippet
    // console.log(videoId)
  });

document.addEventListener("DOMContentLoaded", function () {
  // code here will execute after the document is loaded
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (e) {
    // const inputGroup = document.querySelector(".input-group");
    e.preventDefault();
    const searchString = document.getElementById("button-0");
    // console.log(searchString.value);
    const urlEncodedSearchString = encodeURIComponent(searchString.value);
    // console.log(urlEncodedSearchString);
    fetch(url + searchLabel + searchString.value + apiKey + requiredLabel + maxResultsLabel)
      .then((response) => response.json())
      .then((data) => {
        // return data
        // declare the video variable
        // const video = ""
        // We have to call the div with a class of videos, in order for the videos to have a place to go to once rendered.
        const videos = document.querySelector('.videos');
        console.log(data)
        // we iterate through all the results with the for each method and put each video on the page in this predetermined format
        data.items.videoArray.forEach(item => {
          videoData = `
         <tr>
         <td>
         <a target =" _blank" href ="https://www.youtube.com/watch? v=${item.id.videoId}> 
         ${item.snippet.title}</td>
         <td>
         <img width="200" height="200" src="${item.snippet.thumbnails.high.url}"/>
         </td>
         <td>
         <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.chanelTitle}</a>
         </td>
         </tr>`
            ;
            // we then append the videoData and put it into the videos section
          $(videos).append(videoData)
          console.log(videoData)
        });
      });

  });

});
// function renderVideo(videoArray) {
//   const videoHtmlArray = videoArray.map(function (currentVideo) {
//     return `<div class="col-4">
//     <div class="card" style="width: 18rem;">
//       <img src="${currentVideo.}" class="card-img-top" alt="...">
//       <div class="card-body">
//         <p class="card-title">${currentVideo.}</hp>
//         <p class="card-text">Released: ${currentVideo.}</p>
//         <a href="#" class="btn btn-primary" data="${currentVideo.}" >Add</a>
//       </div>
//     </div>
//   </div>`;
//   });
//   return videoHtmlArray.join("");


