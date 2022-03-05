let container = document.getElementById("data_dis");

fetch("https://pixabay.com/api/videos/?key=25998928-82e779f0e22faa789b9699406order=popular")
.then( (res) =>  res.json())
.then( (data) => displayVideo(data.hits) )

function displayVideo(data){
   
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
         container.append(div);
    })
    


}