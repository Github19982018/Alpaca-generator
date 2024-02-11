import './style.css'
import mergeImages from 'merge-images';

// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

import { constants } from "./constants.js";




const accessoriesContainer = document.querySelector("#accessories-btn-wrapper");
const styleContainer = document.querySelector("#style-btn-wrapper");





const assembler = () => {
    constants.forEach( (element, index) => accessoriesButtonAssembler(element, index));
    const accessoriesButton = document.querySelectorAll(".accessories-button");
    accessoriesButton.forEach( (button) => accessoryButtonHandler(button));
    document.getElementById("random-btn").addEventListener("click",randomButtonHandler);
    document.getElementById("download-btn").addEventListener("click",downloadButtonHandler);
    accessoriesContainer.firstElementChild.dispatchEvent(new Event('click'));
}



const accessoriesButtonAssembler = (element,index) => {
    const button = document.createElement("button");
    button.textContent = element.image;
    button.setAttribute("data-id",index);
    button.classList.add("btn-primary","accessories-button");
    accessoriesContainer.appendChild(button);
};



const accessoryButtonHandler = button => {
    const accessoriesButton = document.querySelectorAll(".accessories-button");
    button.addEventListener("click",(e) => {
        accessoriesButton.forEach(elem => elem.classList.remove("active"));
        e.target.classList.toggle("active");

        styleContainer.textContent = '';
        const secButtons =  constants[e.target.dataset.id].list;
        secButtons.forEach((element, index) => styleButtonAssembler(element,index));
    });
};



const styleButtonAssembler = (element,index) => {
    
    const btn = document.createElement("button");
    btn.textContent = element.image;
    btn.setAttribute("data-img",element.id);
    btn.setAttribute("data-url",element.url);
    btn.setAttribute("data-id",index);
    btn.classList.add("btn-primary","style-button");
    
    btn.addEventListener("click", (e) => styleButtonHandler(e));
    styleContainer.appendChild(btn);
}




const styleButtonHandler = (e) => {
    
    const styleButton = document.querySelectorAll(".style-button");
    
    if(e.target.classList.contains("active")) {
        e.target.classList.toggle("active");
        const imageId = document.getElementById(e.target.dataset.img);
        imageId.src = '';
        return;
    }
    
    styleButton.forEach(button => button.classList.remove("active"));
    e.target.classList.toggle("active");
    const imageId = document.getElementById(e.target.dataset.img);
    imageId.src = e.target.dataset.url;
};








const randomButtonHandler = () => {
    document.querySelectorAll(".img-container img").forEach(
        (images)=>images.src="");
    constants.forEach((item, index) => {
        
        const image = item.list[random(item.list.length)];
        const imageId = document.getElementById(image.id);
        imageId.src = image.url;
    });
}


const random = (max, min=0) => {
    return Math.floor(Math.random() * max - min) + min;
}








function downloadButtonHandler() {
    const imgList = [];
    document.querySelectorAll(".img-container img").forEach((images) => {    
        if (images.src !== location.href) {
            imgList.push(images.src);
        }
    });

    mergeImages(imgList).then(b64 => download(b64, "my-Alpaca-Image"));
}


const download = (path, filename) => {
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;
    
    // Append to the DOM
    document.body.appendChild(anchor);
    
    // Trigger `click` event
    anchor.click();
    
    // Remove element from DOM
    document.body.removeChild(anchor);
}; 






assembler();