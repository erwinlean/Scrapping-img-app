function showImgSrc(img){
    img.forEach((element) => {
        //Create div container
        const divCreate = document.createElement("div");
        divCreate.setAttribute("class", "divImg");
        divCreate.setAttribute("id", "divForImg");
        document.getElementById('images').appendChild(divCreate);

        //create element "a" on DOM
        const aCreate = document.createElement('a');
        aCreate.href = element;
        aCreate.setAttribute('target', '_blank');
        aCreate.setAttribute('download', "proposed_file_name");
        divCreate.appendChild(aCreate);

        //insert img on the "a" element of the DOM
        const imgCreate = document.createElement('img');
        imgCreate.src = element;
        imgCreate.setAttribute("class","imgScrapped");
        imgCreate.setAttribute("id","imgSearched");
        aCreate.appendChild(imgCreate);
    })
};

//showing img srcSet
function showImgSrcSet(img){
    img.forEach((element) => {
        //Create div container
        const divCreate = document.createElement("div");
        divCreate.setAttribute("class", "divImgSet");
        divCreate.setAttribute("id", "divForImgSet");
        document.getElementById('images').appendChild(divCreate);

        //create element "a" on DOM
        const aCreate = document.createElement('a');
        aCreate.href = element;
        aCreate.setAttribute('target', '_blank');
        aCreate.setAttribute('download', "proposed_file_name");
        divCreate.appendChild(aCreate);

        //insert img on the "a" element of the DOM
        const imgCreate = document.createElement('img');
        imgCreate.srcset = element;
        imgCreate.setAttribute("class","imgScrappedSet");
        imgCreate.setAttribute("id","imgSearchedSet");
        aCreate.appendChild(imgCreate);
    })
};

module.exports = {
    showImgSrc : showImgSrc,
    showImgSrcSet : showImgSrcSet
}