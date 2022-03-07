
let container = document.getElementById("images");
var time_id = null;
let bounce_div = document.getElementById("bounce_box");
let main_word = JSON.parse( localStorage.getItem("key_word") );

if(main_word){
    image_search(main_word)
}


function debounce(e){
    
if(time_id){
    clearTimeout(time_id);
}
  time_id = setTimeout( () => {

    fetch(`https://pixabay.com/api/?key=25998928-82e779f0e22faa789b9699406&q=${e.target.value}&order=popular`)
    .then( (res) =>  res.json())
    .then( (data) => { display(data.hits);  console.log(data.hits)})
     
   }, 600)
   
   window.addEventListener("click", () => {
    bounce_div.innerHTML = null;
   })
}

function display(data){
    bounce_div.innerHTML = null;
    let tag = document.createElement("h4");
        tag.innerHTML= "#Tags";
        bounce_div.append(tag);
    data.map( (item) => {
        
        let arr = item.tags.split(",");
        for(let i = 0; i < arr.length; i++){
          let temp = document.createElement("p");
          temp.innerHTML= arr[i].trim();
          temp.addEventListener("click", () =>{ image_search(arr[i].trim()) } )
          bounce_div.append(temp);
        }
        
    })
}



function image_search( word ){
     
      let key_word = document.getElementById("search_in").value;
      if(word){
       key_word = word
      }
     
    fetch(`https://pixabay.com/api/?key=25998928-82e779f0e22faa789b9699406&q=${key_word}&order=popular`)
    .then( (res) =>  res.json())
    .then( (data) => { display_images(data.hits);  console.log(data.hits)})
     
}

function display_images(data) {
  container.innerHTML = null;
   data.map( (item) => { 
     let image = document.createElement("img");
     image.src=item.largeImageURL;      
     container.append(image)
   })
}