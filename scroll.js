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

async function getData() {
  let response = await fetch(URL);
  let responseJson = await response.json();
  printTitle(responseJson);
}

function printTitle(val) {
  let contentTitle = "";
  //let gifPreviewContent = "";
  //titleList.innerHTML +=
  val.data.forEach((element, index) => {
    contentTitle += `<div> Title : ${element.title} </div>
        <img  
         src = ${element.images.downsized.url} width = "150"
         > </img>`;

    // gifPreviewContent +=
    //  `<video  with = "150" controls autoplay loop >
    //  <source src = ${val.data.images.preview.mp4}
    //  type = "video/mp4"> </video>`;

    //card.insertAdjacentHTML("beforeend", "Hello")
  });
  card.innerHTML = contentTitle;
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

function popWhenScroll() {
  //while (true){
  //let relativeBottom = document.documentElement.getBoundingClientRect().bottom;
  let height = document.documentElement.clientHeight;
  //setVal = 0;

  if (relativeBottom < height) {
    getData();
    //continue;
  }
  //break
  //card.innerHTML += `<div>${new Date()}<div>`
}
// }
window.addEventListener("scroll", popWhenScroll);

getData();

//get(api), pagination , render(revamp), refresh(logic change), 
