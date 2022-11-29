import { fetchPostsData } from './GeneratePosts.js';

// const URL =
//   "https://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY + "&limit=10";


const card = document.querySelector(".card");
const search = document.querySelector('input');
let searchTerm = document.getElementById('search').value;


let lastPageNumber = -1;
let bottomHit = false;
let fetchPostsDataState = 'idle';
let lastCall;







async function getData(limit = 10, pageNumber, searchTerm = '') {
  try {
    //console.log(lastPageNumber);
    //let response = await fetch(URL);
    let response;
    //if (pageNumber <= lastPageNumber) {return;}

    if (fetchPostsDataState == 'idle'){
      fetchPostsDataState = 'pending';
      if (searchTerm == ''){response = await fetchPostsData(limit, pageNumber);}
      else {response = await fetchPostsData(limit, pageNumber,searchTerm);}
      if (response != []){lastPageNumber = pageNumber}
    }
    console.log(response);
    if(response){fetchPostsDataState = 'idle';}
    return response;
  }
  catch(err)  {
    console.log("Exception :" + err);
  }

}

function printTitle(val) {
  if(!val || val === undefined){ 
    console.log("val :" + val); 
    return;}
  const parentDiv = document.createElement('div');

  val.forEach((element, index) => {
    //TODO : Add exception handling for nulls in response
    const article = document.createElement('article');
    const articleHeading = document.createElement('h2');
    const articleDescription = document.createElement('p');

    articleHeading.appendChild(document.createTextNode(element.title));
    articleDescription.appendChild(document.createTextNode(element.description));
    
    article.appendChild(articleHeading);
    article.appendChild(articleDescription);
    
    parentDiv.append(article);
  });
  console.log(parentDiv)
  card.append(parentDiv);
}


function debounce(func, wait) {
  let timeout;
  return () => {
      if (timeout) {
          clearTimeout(timeout);
      }
      timeout = setTimeout(func, wait)
  }
}


function throttle(fn, ms) {
  return ()=> {
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

function popWhenScroll(){
  //let postDataResponse;
  let scrollTopVal = document.documentElement.scrollTop;
  let scrollHeightVal = document.documentElement.scrollHeight;
  let clientHeightVal = document.documentElement.clientHeight;
  
  if (scrollHeightVal - scrollTopVal === clientHeightVal){
    bottomHit = true;
  }
  //else {bottomHit = 0}
  if (bottomHit){
    bottomHit = false;
    getData(10,lastPageNumber+1,searchTerm).then((resp)=> printTitle(resp));
    //printTitle(postDataResponse);
  }
}

function popWhenSearch(){
  card.innerHTML = '';
  console.log(document.getElementById('search').value);
  searchTerm = document.getElementById('search').value;
  if (searchTerm != ''){
  getData(10,0,searchTerm).then((resp)=> printTitle(resp));
  }
}

// throttleMethod = throttle(popWhenScroll,20)
window.addEventListener("scroll", throttle(popWhenScroll,50));
search.addEventListener("input", debounce(popWhenSearch,300))




//getData(10,lastPageNumber+1).then((resp)=>printTitle(resp));

// printTitle(resp);

//
// get(api),  -> Partially done
// pagination -> Partially done, 
// render(revamp), -> Partially done
// refresh(logic change), 



// try remove event listener

// idle pending success 



//TODO:
//Dead code deletion
//Refactor
//Input field -> debounce() 
//Data and page should get refreshed.

//giphy api implementation