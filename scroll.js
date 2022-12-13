import { fetchPostsData } from "./GeneratePosts.js";

// const URL =
//   "https://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY + "&limit=10";

//https://api.giphy.com/v1/gifs/trending?api_key=yTliB0obDXV6DLvrIBduGZgK6TcCmHx6

const API_KEY = "yTliB0obDXV6DLvrIBduGZgK6TcCmHx6";

const trendingURL = new URL("https://api.giphy.com/v1/gifs/search/trending");
//   "?api_key=" + API_KEY + "&limit=10";
// const searchURL = URL + "search" + "?api_key=" + API_KEY + "&q=";

const card = document.querySelector(".card");
const search = document.querySelector("input");
let searchTerm = document.getElementById("search").value;

let lastPageNumber = -1;
let bottomHit = false;
let fetchPostsDataState = "idle";
let lastCall;
let offset = 0;

async function fetchGIFData(searchTerm = "", limit = 10) {
  try {
    let searchURL = new URL("https://api.giphy.com/v1/gifs/search");
    let requestURLSearchParams = "";
    let response;
    if (searchTerm == "") {
      requestURLSearchParams = new URLSearchParams([["api_key", API_KEY]]);
      requestURL = searchURL.append(requestURLSearchParams);
      return await fetch(requestURLSearchParams)
        .then((response) => {
          if (response.ok) response.json();
        })
        .catch((e) => console.log(e));
    } else {
      let params = [
        { api_key: API_KEY },
        { q: searchTerm },
        { limit: limit },
        { offset: lastPageNumber * 10 },
      ];
      requestURLSearchParams = new URLSearchParams(searchURL.search);
      params.forEach((item) => {
        for (let key in item) {
          requestURLSearchParams.append(key, item[key]);
        }
      });

      searchURL = searchURL + "?" + requestURLSearchParams;
      response = await fetch(searchURL);
      let jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (err) {
    console.log(err);
  }
}

function getData(limit = 10, pageNumber, searchTerm = "") {
  try {
    let response;
    let jsonResponse;
    if (fetchPostsDataState == "idle") {
      fetchPostsDataState = "pending";
      if (searchTerm == "") {
        response = fetchGIFData();
      } else {
        response = fetchGIFData(searchTerm, limit);
      }
      //if (response != []){lastPageNumber = pageNumber}
    }
    console.log(response);
    if (response) {
      fetchPostsDataState = "idle";
      lastPageNumber += 1;
    }
    return response;
  } catch (err) {
    console.log("Exception :" + err);
  }
}

function printTitle(val) {
  if (!val || val === undefined) {
    console.log("val :" + val);
    return;
  }
  const parentDiv = document.createElement("div");
  let data = val.data;
  data.forEach((element, index) => {
    //TODO : Add exception handling for nulls in response
    const article = document.createElement("article");
    const articleHeading = document.createElement("h2");
    //const articleDescription = document.createElement('p');
    const articleGif = document.createElement("img");

    articleHeading.appendChild(document.createTextNode(element.title));
    //articleDescription.appendChild(document.createTextNode(element.description));
    articleGif.src = element.images.downsized.url;
    articleGif.width = "150";

    article.appendChild(articleHeading);
    article.appendChild(articleGif);

    parentDiv.append(article);
  });
  console.log(parentDiv);
  card.append(parentDiv);
}

function debounce(func, wait) {
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, wait);
  };
}

function throttle(fn, ms) {
  return () => {
    let previousCall = lastCall;
    lastCall = Date.now();
    if (
      previousCall === undefined || // function is being called for the first time
      lastCall - previousCall > ms
    ) {
      fn();
    }
  };
}

function popWhenScroll() {
  //let postDataResponse;
  let scrollTopVal = document.documentElement.scrollTop;
  let scrollHeightVal = document.documentElement.scrollHeight;
  let clientHeightVal = document.documentElement.clientHeight;

  if (scrollHeightVal - scrollTopVal === clientHeightVal) {
    bottomHit = true;
  }
  //else {bottomHit = 0}
  if (bottomHit) {
    bottomHit = false;
    // getData(10, lastPageNumber + 1, searchTerm).then((resp) =>
    //   resp.json().then((data) => printTitle(data))
    // );
    getData(10, lastPageNumber + 1, searchTerm).then((data) =>
      printTitle(data)
    );
    //printTitle(postDataResponse);
  }
}

function popWhenSearch() {
  let resp;
  card.innerHTML = "";
  lastPageNumber = 0;
  console.log(document.getElementById("search").value);
  searchTerm = document.getElementById("search").value;
  if (searchTerm != "") {
    // getData(10, 0, searchTerm).then((resp) =>
    //   resp.json().then((data) => printTitle(data))
    // );
    getData(10, 0, searchTerm).then((data) => printTitle(data));
    // resp = getData(10,0,searchTerm).then();
    // printTitle(resp);
  }
}

// throttleMethod = throttle(popWhenScroll,20)
window.addEventListener("scroll", throttle(popWhenScroll, 50));
search.addEventListener("input", debounce(popWhenSearch, 300));

//getData(10,lastPageNumber+1).then((resp)=>printTitle(resp));

// printTitle(resp);
