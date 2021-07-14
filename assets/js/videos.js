
// api key AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs

// sample working url "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=brunoMars&key=AIzaSyBZOh-2Z-eH1NMGN6iBN8irFa1V5m7mcQs&videoEmbeddable=true&type=video&maxResults=30";
const detailsUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics"
const url = "https://youtube.googleapis.com/youtube/v3/search?"

// search label
const searchLabel = "&q="

// const term = "bruno mars" doesn't work because of the space ... probably something like add a %
// const searchTermValue = ""

// api key
const apiKey = "&key=AIzaSyAgOvRIkVbwzxOse-LHEvMmAmgLRiyZsnQ"

// required stuff
const requiredLabel = "&videoEmbeddable=true&type=video"

// max results
const maxResultsLabel = "&maxResults=50"

document.addEventListener("DOMContentLoaded", function () {
  // code here will execute after the document is loaded
  const searchForm = document.getElementById("search-form");
  // add event listener on the search/submit button 
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputString = document.getElementById("button-0");
    // console.log(searchString.value);
    // const urlEncodedSearchString = encodeURIComponent(inputString.value);
    // console.log(urlEncodedSearchString);
    // We have to call the div with a class of videos, in order for the videos to have a place to go to once rendered.
    const videos = document.querySelector('.videos');
    fetch(url + searchLabel + inputString.value + apiKey + requiredLabel + maxResultsLabel)
    // we take the response from the fetch and send it as data with the .json function
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data);
        // we take the data and .map through the items portion of the data and return the item.id.videoId of each item in the data
        return data.items.map((item)=>{
          return item.id.videoId
          
        })
        
      })
      .then((ids)=>{
        console.log(ids)
        // we fetch ids of the items from the previous array and join the ids to 
        return fetch(detailsUrl + apiKey +"&id="+ ids.join(","))
        
      })
      .then((response) => response.json())
      .then((data)=> {
        console.log(data)
        const sortedData = data.items.sort((a,b) => {
          return b.statistics.viewCount - a.statistics.viewCount
        })
        console.log(sortedData)
        videos.innerHTML = renderVideo(sortedData);
        
      })

  });

});
function renderVideo(videoArray) {
  // we map through all the results with the for each method and put each video on the page in this predetermined format
  const videoHtmlArray = videoArray.map((item) => {
    return `
     <tr>
     <td>
     <a target =" _blank" href ="https://www.youtube.com/watch?v=${item.id.videoId}"> 
     ${item.snippet.title}</td>
     <td>
     <img width="200" height="200" src="${item.snippet.thumbnails.high.url}"/>
     </td>
     <td>
     <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a>
     </td>
     </tr>`

  })
    ;

  return videoHtmlArray.join("");

};
