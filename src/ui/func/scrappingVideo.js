"use stric"

const btnsearchVideo = document.getElementById("btnsearchVideo");

//get url
const scraptFunctionVideo = async () =>{
    const url = document.getElementById("inputSearchVideo");
    let urlEnd;
    
    if (url.value.includes("https://")){
        urlEnd = url.value;
    }else{
        urlEnd = "https://" + url.value;
    }
    console.log(urlEnd);
}


btnsearchVideo.addEventListener('click',scraptFunctionVideo);