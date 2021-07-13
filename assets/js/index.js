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
  });
});

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

console.log("end of index.js");
