"use stric"
const puppeteer = require('puppeteer');
//const {showImgSrc,showImgSrcSet} = require("./images.js");

const faceScrap = {
    facebookUrl : "https://www.facebook.com/",
    email: "erwin.mdq@gmail.com",
    password: "4759090oK",
}

//img save src
const images = [];
const imagesSet = [];

//capture url to search with btn
const btnsearch = document.getElementById("btnsearch");

//general Functions
//push img to array
function forEachImg(imgSrc){
    imgSrc.forEach(imagen => {
        images.push(imagen);
    });
}

//showing img src
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
        aCreate.setAttribute("class", "aImg");
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
        aCreate.setAttribute("class", "aImg");
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

//scrapping function
const scraptFunction = async () => {
    console.clear();
    //console.time("search time");

    //clear array src, before put new ones
    if (images.length != 0){
        while (images.length != 0){
            images.pop();
            let imgDel = document.getElementById('divForImg');
            imgDel.parentNode.removeChild(imgDel);
        }
    };
    //clear array imgset
    if (imagesSet.length != 0){
        while (imagesSet.length != 0){
            imagesSet.pop();
            let imgDel = document.getElementById('divForImgSet');
            imgDel.parentNode.removeChild(imgDel);
        }
    };

    //get url
    const url = document.getElementById("inputSearch");
    let urlEnd;

    //add https if the url doesnt have
    if (url.value.includes("https://")){
        urlEnd = url.value;
    }else{
        urlEnd = "https://" + url.value;
    }
    
    //launch puppeteer
    const browser = await puppeteer.launch({
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            '--Cross-Origin-Resource-Policy',
        ],
        headless: true,
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    if(urlEnd.includes("facebook")){
        await page.goto(faceScrap.facebookUrl, {waitUntil: "networkidle0"});
        await page.waitForSelector("#email");
        await page.waitForSelector("#pass");
        await page.type("#email", faceScrap.email, {delay: 25});
        await page.type("#pass", faceScrap.password, {delay: 25});
        await page.keyboard.press("Enter");
        await page.waitForTimeout(4000);
        await page.goto(
            urlEnd ,
            {waitUntil: "networkidle0"
        });
        await page.waitForTimeout(3000);
    }else if(urlEnd.includes("instagram")){
        alert("Instagram security doesnt allow to get their images, please select other page for scrapp.")
    }else{ 
        await page.goto(
            urlEnd ,
            {waitUntil: "networkidle0"
        });
        await page.waitForTimeout(3000);
    }
    
    //get all img the atribute src/srcset to see
    const imgSrc = await page.$$eval("img", allimg => allimg.map((val)=> val.getAttribute("src")));
    const imgSrcSet = await page.$$eval("img[srcset]", allimg => allimg.map((val)=> val.getAttribute("srcset")));

    forEachImg(imgSrc);
    forEachImg(imgSrcSet);
    showImgSrc(images);
    showImgSrcSet(imagesSet);
    //console.timeEnd("search time");
};

btnsearch.addEventListener('click',scraptFunction);