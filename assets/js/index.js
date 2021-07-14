// test
console.log("index.js");
let searchString = "";
let inputString = "";

document.addEventListener("DOMContentLoaded", function () {
  // code here will execute after the document is loaded
  const searchForm = document.getElementById("search-form");
  // let's hide the wiki divs until a search is made
  let accordionDiv = document.getElementById("accordionExample");
  if (accordionDiv.style.display === "none") {
    accordionDiv.style.display = "block";
  } else {
    accordionDiv.style.display = "none";
  }
  // get input from search form
  searchForm.addEventListener("submit", function (e) {
    const inputGroup = document.querySelector(".input-group");
    e.preventDefault();
    // get value of form input and format
    inputString = document.getElementById("button-0").value;
    console.log(inputString);
    const wordArray = [];
    // change quick facts box to artist name
    // convert string into array of words
    const split = inputString.split(" ");
    // capitalize the begginning of each word
    split.forEach((word) => {
      let newWord = word[0].toUpperCase() + word.substr(1).toLowerCase();
      wordArray.push(newWord);
    });
    searchString = wordArray.join("_");
    // fetch from wikipedia
    getWikiBio();
    getWikiQuickFacts();
    getYoutubeVideos()
  });
});

const getYoutubeVideos = () => {
  const detailsUrl =
    "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics";
  const url = "https://youtube.googleapis.com/youtube/v3/search?";
  const searchLabel = "&q=";
  const apiKey = "&key=AIzaSyAgOvRIkVbwzxOse-LHEvMmAmgLRiyZsnQ";
  const requiredLabel = "&videoEmbeddable=true&type=video";
  const maxResultsLabel = "&maxResults=10";
  const videos = document.querySelector(".videos");
  fetch(
    url +
      searchLabel +
      searchString +
      apiKey +
      requiredLabel +
      maxResultsLabel
  )
    // we take the response from the fetch and send it as data with the .json function
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // we take the data and .map through the items portion of the data and return the item.id.videoId of each item in the data
      return data.items.map((item) => {
        return item.id.videoId;
      });
    })
    .then((ids) => {
      console.log(ids);
      // we fetch ids of the items from the previous array and join the ids to
      return fetch(detailsUrl + apiKey + "&id=" + ids.join(","));
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const sortedData = data.items.sort((a, b) => {
        return b.statistics.viewCount - a.statistics.viewCount;
      });
      console.log(sortedData);
      videos.innerHTML = renderVideo(sortedData);
    });
};

function renderVideo(videoArray) {
  // we map through all the results with the for each method and put each video on the page in this predetermined format
  const videoHtmlArray = videoArray.map((item) => {
    // return `
    //  <tr>
    //  <td>
    //  <a target =" _blank" href ="https://www.youtube.com/watch?v=${item.id.videoId}"> 
    //  ${item.snippet.title}</td>
    //  <td>
    //  <img width="200" height="200" src="${item.snippet.thumbnails.high.url}"/>
    //  </td>
    //  <td>
    //  <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a>
    //  </td>
    //  </tr>`
    return `
    <div class="card border-primary me-3 mb-3" style="max-width: 20rem;">
        <div class="card-header">Video</div>
        <div class="card-body">
        <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}"> 
         <img width="200" height="200" src="${item.snippet.thumbnails.high.url}"/>
          ${item.snippet.channelTitle}</a>
          <h4 class="card-title">${item.snippet.title}</h4>
          <p class="card-text"></p>
          </div>
      </div>
    `
  });
  return videoHtmlArray.join("");
}

const getWikiBio = (url) => {
  fetch(
    "https://en.wikipedia.org/api/rest_v1/page/mobile-sections/" +
      searchString +
      "?redirect=true&origin=*"
  )
    .then((response) => response.json())
    .then((data) => {
      // populate discography
      // getWikiDiscography(data);
      // create dummy div
      const newDiv = document.createElement("div");
      // get content
      const content = data.lead.sections[0].text;
      // add content to innerhtml as raw html
      newDiv.innerHTML = content;
      // select div
      const contentTag = document.getElementById("accordion-body0");
      // set inner html of active div
      contentTag.innerHTML = newDiv.querySelector("p").innerHTML;
      contentTag.style = "text-indent: 25px; color: black";
      // append links with wikipedia address
      const wikiLinks = contentTag.getElementsByTagName("a");
      // for loop to replace http://127.0.0.1:5500/ with https://en.wikipedia.com/
      for (let index = 0; index < wikiLinks.length; index++) {
        let link = wikiLinks[index];
        link.style = "color:white; text-decoration: none;";
        let newLink = "https://en.wikipedia.org/";
        newLink += link.getAttribute("href");
        link.setAttribute("href", newLink);
      }
      // unhide the accordion div when it has content loaded
      let accordionDiv = document.getElementById("accordionExample");
      if (accordionDiv.style.display === "none") {
        accordionDiv.style.display = "block";
      }
    });
};

const getWikiQuickFacts = () => {
  console.log("inside wikifacts function");
  const factsURL =
    "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*";
  fetch(factsURL + "&titles=" + searchString + "&rvsection=0&rvparse")
    .then((response) => response.json())
    .then((data) => {
      console.log("facts data: " + data);
      //let encodedString = encodeString(searchString)
      // create dummy div
      const newDiv = document.createElement("div");
      // get content
      let pageId = Object.keys(data.query.pages)[0];
      const content = data.query.pages[pageId].revisions[0]["*"];

      // add content to innerhtml as raw html
      newDiv.innerHTML = content;
      // select div
      const contentTag = document.getElementById("artist-name");
      // set inner html of active div
      contentTag.innerHTML = newDiv.querySelector(".infobox").innerHTML;
      contentTag.style = "text-indent: 25px; color: lightblue; font-size: 16px";
      // append links with wikipedia address
      const wikiLinks = contentTag.getElementsByTagName("a");
      // for loop to replace http://127.0.0.1:5500/ with https://en.wikipedia.com/
      for (let index = 0; index < wikiLinks.length; index++) {
        let link = wikiLinks[index];
        link.style = "color:blue; text-decoration: none;";
        let newLink = "https://en.wikipedia.org/";
        newLink += link.getAttribute("href");
        link.setAttribute("href", newLink);
      }
    });
};

console.log("end of index.js");
