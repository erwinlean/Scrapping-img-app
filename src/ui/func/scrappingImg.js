"use stric"
const puppeteer = require('puppeteer');
//const {showImgSrc,showImgSrcSet} = require("./images.js");

const faceScrap = {
    facebookUrl : "https://www.facebook.com/",
    email: "*********",
    password: "*********",
    instUser "*********"
}

//save images src
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
//instagram a
function showAInstagram(img){
    img.forEach((element) => {
        //Create div container
        const divCreate = document.createElement("div");
        divCreate.setAttribute("class", "divInstagramClass");
        divCreate.setAttribute("id", "divInstagram");
        document.getElementById('images').appendChild(divCreate);

        //create element "a" on DOM
        const aCreate = document.createElement('a');
        aCreate.href = element;
        aCreate.setAttribute('target', '_blank');
        aCreate.setAttribute("class", "aInstragram");
        //aCreate.setAttribute('download', "proposed_file_name");
        divCreate.appendChild(aCreate);

        //insert img on the "a" element of the DOM
        const pCreate = document.createElement('p');
        pCreate.innerHTML = "Imagen link:   " + element;
        pCreate.setAttribute("class","pClass");
        pCreate.setAttribute("id","pId");
        aCreate.appendChild(pCreate);

        //create element "a" on DOM
        const aCreateDownload = document.createElement('a');
        aCreateDownload.href = element;
        aCreateDownload.setAttribute('target', '_blank');
        aCreateDownload.setAttribute("class", "instDownload");
        aCreateDownload.setAttribute('download', "proposed_file_name");
        divCreate.appendChild(aCreateDownload);
        //btn download
        const btnCreate = document.createElement("button");
        btnCreate.innerHTML = "download"
        btnCreate.setAttribute("class","btnDownload");
        aCreateDownload.appendChild(btnCreate);
    })
};

//scrapping function
const scraptFunctionImg = async () => {
    console.clear();
    console.time("search time");
    //clear array src, before put new ones
    let inst = "instagram";
    if (images.length != 0){
        if(images[0].includes(inst)){
            while (images.length != 0){
                images.pop();
                let linkInstagram = document.getElementById('divInstagram');
                linkInstagram.parentNode.removeChild(linkInstagram);
            }
        }else{
            while (images.length != 0){
                images.pop();
                let imgDel = document.getElementById('divForImg');
                imgDel.parentNode.removeChild(imgDel);
            }
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
        //get all img the atribute src/srcset to see
        const imgSrc = await page.$$eval("img", allimg => allimg.map((val)=> val.getAttribute("src")));
        const imgSrcSet = await page.$$eval("img[srcset]", allimg => allimg.map((val)=> val.getAttribute("srcset")));

        forEachImg(imgSrc);
        forEachImg(imgSrcSet);
        showImgSrc(images);
        showImgSrcSet(imagesSet);
    }else if(urlEnd.includes("instagram")){
        await page.goto("https://www.instagram.com/", {waitUntil: "networkidle0"});
        await page.waitForSelector("#loginForm > div > div:nth-child(1) > div > label > input");
        await page.waitForSelector("#loginForm > div > div:nth-child(2) > div > label > input");
        await page.type("#loginForm > div > div:nth-child(1) > div > label > input",faceScrap.instUser, {delay: 25});
        await page.type("#loginForm > div > div:nth-child(2) > div > label > input", faceScrap.password, {delay: 25});
        await page.keyboard.press("Enter");
        await page.waitForTimeout(7000);
        await page.goto(
            urlEnd ,
            {waitUntil: "networkidle0"
        });

        //get all img the atribute src/srcset to see
        const imgSrc = await page.$$eval("img", allimg => allimg.map((val)=> val.getAttribute("src")));

        forEachImg(imgSrc);
        showAInstagram(images);
        //alert("Instagram security doesnt allow to SHOW their images, but you can download anyway if you known the order, it start from the top, left")
    }else{ 
        await page.goto(
            urlEnd ,
            {waitUntil: "networkidle0"
        });
        await page.waitForTimeout(3000);
        //get all img the atribute src/srcset to see
        const imgSrc = await page.$$eval("img", allimg => allimg.map((val)=> val.getAttribute("src")));
        const imgSrcSet = await page.$$eval("img[srcset]", allimg => allimg.map((val)=> val.getAttribute("srcset")));

        forEachImg(imgSrc);
        forEachImg(imgSrcSet);
        showImgSrc(images);
        showImgSrcSet(imagesSet);
    }
    console.timeEnd("search time");
};

btnsearch.addEventListener('click',scraptFunctionImg);
