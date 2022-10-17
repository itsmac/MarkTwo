import { fetchPostsData } from './GeneratePosts.js';

const API_KEY = "yTliB0obDXV6DLvrIBduGZgK6TcCmHx6";

const URL =
  "https://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY + "&limit=10";
const card = document.querySelector(".card");
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
    //let response = await fetch(URL);
    let response = await fetchPostsData(limit, pageNumber);
    // console.log("------------------------");
    // console.log(response);
    // //let responseJson = await response.json();
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

    articleHeading.innerHTML = element.title;
    articleDescription.innerText = element.description;
    
    article.appendChild(articleHeading);
    article.appendChild(articleDescription);
    
    parentDiv.append(article);
  });
  console.log(parentDiv)
  //card.appe = contentTitle;
  card.append(parentDiv);
  //content += `<div> Title : ${val.title} </div>`
}

// while(true){
//    let relativeBottom = document.documentElement.getBoundingClientRect().bottom;
//    console.log(relativeBottom);

//    let height = document.documentElement.clientHeight;
//    console.log(height);
//    if (relativeBottom > document.documentElement.clientHeight){

//    }
// }

// function popWhenScroll() {
//   //while (true){
//   //let relativeBottom = document.documentElement.getBoundingClientRect().bottom;
//   let height = document.documentElement.clientHeight;
//   //setVal = 0;

//   if (relativeBottom < height) {
//     getData();
//     //continue;
//   }
//   //break
//   //card.innerHTML += `<div>${new Date()}<div>`
// }
// // }``
// window.addEventListener("scroll", popWhenScroll);

getData(10,2);

//
// get(api),  -> Partially done
// pagination , 
// render(revamp), -> Partially done
// refresh(logic change), 
// try remove event listener
