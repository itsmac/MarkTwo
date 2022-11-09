import { fetchPostsData } from './GeneratePosts.js';
//import { throttle } from './throttle.js';

// const URL =
//   "https://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY + "&limit=10";


const card = document.querySelector(".card");
let lastPageNumber = -1;
let bottomHit = false;
let fetchPostsDataState = 'idle';
let lastCall;
let throttleMethod;

async function getData(limit = 10, pageNumber) {
  try {
    //console.log(lastPageNumber);
    //let response = await fetch(URL);
    let response;
    if (pageNumber <= lastPageNumber) {return;}

    if (fetchPostsDataState == 'idle'){
      fetchPostsDataState = 'pending';
      response = await fetchPostsData(limit, pageNumber);
      if (response != []){lastPageNumber = pageNumber}
    }
    console.log();response
    //response = await fetchPostsData(limit, pageNumber);
    if(response){fetchPostsDataState = 'idle';}

    //if (response != []){lastPageNumber = pageNumber}
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
    getData(10,lastPageNumber+1).then((resp)=> printTitle(resp));
    //printTitle(postDataResponse);
  }
}

// throttleMethod = throttle(popWhenScroll,20)
window.addEventListener("scroll", throttle(popWhenScroll,20));





getData(10,lastPageNumber+1).then((resp)=>printTitle(resp));

// printTitle(resp);

//
// get(api),  -> Partially done
// pagination -> Partially done, 
// render(revamp), -> Partially done
// refresh(logic change), 



// try remove event listener

// idle pending success 