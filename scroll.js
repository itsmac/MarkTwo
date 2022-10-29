import { fetchPostsData } from './GeneratePosts.js';

// const URL =
//   "https://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY + "&limit=10";


const card = document.querySelector(".card");
let lastPageNumber = -1;
let bottomHit = false;

//const gifPreview = document.querySelector(".gifPreview");
// console.log(card.getBoundingClientRect().bottom)
// console.log(card.getBoundingClientRect().top)

// window.addEventListener("scroll", (event)=>{
//     let height = card.scrollHeight;
//     let bottom = card.height - card.scrollTop;
//     if(card.getBoundingClientRect().bottom < card.clientHeight){
//         console.log("REached end")
//     }
//console.log(height)

// }
// );

async function getData(limit = 10, pageNumber) {
  try {
    //console.log(lastPageNumber);
    //let response = await fetch(URL);
    // let response;
    if (pageNumber == lastPageNumber) {return;}
    let response = await fetchPostsData(limit, pageNumber);
    if (response != []){lastPageNumber = pageNumber}
    printTitle(response);
  }
  catch(err)  {
    console.log("Exception :" + err);
  }

}

function printTitle(val) {
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
  //card.appe = contentTitle;
  card.append(parentDiv);
  
  //content += `<div> Title : ${val.title} </div>`
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

function popWhenScroll(){
  let scrollTopVal = document.documentElement.scrollTop;
  let scrollHeightVal = document.documentElement.scrollHeight;
  let clientHeightVal = document.documentElement.clientHeight;
  
  if (scrollHeightVal - scrollTopVal === clientHeightVal){
    bottomHit = true;
  }
  //else {bottomHit = 0}
  if (bottomHit == true){
    bottomHit = false;
    getData(10,lastPageNumber+1);
  }
}

window.addEventListener("scroll", debounce(popWhenScroll,250));

getData(10,lastPageNumber+1);

//
// get(api),  -> Partially done
// pagination -> Partially done, 
// render(revamp), -> Partially done
// refresh(logic change), 
// try remove event listener
