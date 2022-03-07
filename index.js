let container = document.getElementById("data_dis");

function get (){
    fetch("https://pixabay.com/api/videos/?key=25998928-82e779f0e22faa789b9699406&order=popular")
.then( (res) =>  res.json())
.then( (data) => displayVideo(data.hits)  )
}

get();


function displayVideo(data){
    container.innerHTML = null;
    data.map( (item) => {

        let div = document.createElement("div");
        div.className= "each_video"
       
        let frame = document.createElement("iframe");
        frame.src = `${item.videos.medium.url}`
         frame.frameborder = "0";
         frame.border = "0";
         
        let inner_div = document.createElement("div");

         let likes = document.createElement("p");
         likes.innerHTML = `Likes: ${item.likes}`
         let comm = document.createElement("p");
         comm.innerHTML = `Comments: ${item.comments}`
         let views = document.createElement("p");
         views.innerHTML = ` Views: ${item.views}`
        
         inner_div.append(likes, comm, views)
         div.append(frame, inner_div);

         div.addEventListener("click", () => {
             localStorage.setItem("video_id", JSON.stringify(item.id))
             window.location.href="video.html"
         })
         container.append(div);
    })
    


}
var time_id = null;
let bounce_div = document.getElementById("bounce_box");

bounce_div.addEventListener("focusout", () =>{ 
    bounce_div.innerHTML = null;
    
})

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
    let tag = document.createElement("p");
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
       

      if(word){
       key_word = word
       fetch(`https://pixabay.com/api/?key=25998928-82e779f0e22faa789b9699406&q=${key_word}&order=popular`)
    .then( (res) =>  res.json())
    .then( (data) => { display_images(data.hits);  console.log(data.hits)})

      }else{
        let key_word = document.getElementById("search_in").value;
        localStorage.setItem("key_word", JSON.stringify(key_word));
        window.location.href="image.html"

      }
     
    
     
}

function display_images(data) {
  container.innerHTML = null;
   data.map( (item) => { 
     let image = document.createElement("img");
     image.src=item.largeImageURL;      
     container.append(image)
   })
}