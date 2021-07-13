// test
console.log("wiki-infobox")

const url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*"



let searchString = "Taylor Swift"

let fakeURL = "https://en.wikipedia.org/api/rest_v1/page/mobile-sections/Taylor_Swift?redirect=true&origin=*"

let id = ""
fetch(fakeURL)
  .then((response) => response.json())
  .then((data) => {
    id = data.lead.id
  })

fetch(url + "&titles=" + searchString + "&rvsection=0&rvparse")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    //let encodedString = encodeString(searchString)
    // create dummy div
    const newDiv = document.createElement("div");
    // get content
    let pageId = Object.keys(data.query.pages)[0]
    const content = data.query.pages[pageId].revisions[0]["*"];

    // add content to innerhtml as raw html
    newDiv.innerHTML = content;
    // select div
    const contentTag = document.getElementById("test");
    // set inner html of active div
    contentTag.appendChild(newDiv.querySelector(".infobox"));
    contentTag.style = "text-indent: 25px; color: black";
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
    // unhide the accordion div when it has content loaded
    // let accordionDiv = document.getElementById("accordionExample");
    // if (accordionDiv.style.display === "none") {
    //   accordionDiv.style.display = "block";
    // }
  })

//
function encodeString(wholeString) {
  return encodedString = encodeURIComponent(wholeString)
  //console.log(encodedString)
}
