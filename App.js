// Alternative implementation using oop concepts



import './style.css'
import mergeImages from 'merge-images';
import { download, random } from './lib/utilities.js';
// import Element from './Elements/Element.js';
import Button from './Elements/Button.js';
import Images from './Elements/Images.js';


// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

import { constants } from "./constants.js";





class App {


    constructor(constants) {
       this.constants = constants.sort((a, b) => {
        return a.layer - b.layer;
      });
       const randomButton = new Button("Random", 
       { container:document.querySelector(".btns-container1"), attributes:{"class":"secondary-btn", "id":"random-btn"}
        });
       const downloadButton = new Button("Download",
       {container:document.querySelector(".btns-container1"), attributes:{"class":"secondary-btn", "id":"download-btn"}
        });
       randomButton.eventHandler("click", this.#randomButtonHandler);
       downloadButton.eventHandler("click", this.#downloadButtonHandler);

      

       this.constants.forEach( (element, index) => {
        
        if(element.image == "Accessories") {
            element.list = element.list.sort((a, b) => {
                return a.layer - b.layer;
              });
            element.list.forEach((elem, indx) => 
            {
                const img = new Images(elem.image,
                {container:this.imageContainer,
                attributes:{"id":elem.id, "data-id":indx, "src":""},
            layer:elem.layer});
            
            });
            return;
        }

        const imgs = new Images(element.image, 
           { container:this.imageContainer,
            attributes:{"id":element.id, "data-id":index, "src":element.list[0].url},
            layer:element.layer
           });
        
        });
           //  imgs.eventHandler("click", (e) => this.#accessoryButtonHandler(e));         
  
        

       
       this.constants.forEach( (element, index) => {
             const accessoriesButton = new Button(element.image, 
                { container:this.accessoriesContainer,
                 attributes:{"data-id":index, "class":["btn-primary accessories-button"] }
                });

                 accessoriesButton.eventHandler("click", (e) => this.#accessoryButtonHandler(e));         
       });
    }

    


    accessoriesContainer = document.querySelector("#accessories-btn-wrapper");
    styleContainer = document.querySelector("#style-btn-wrapper");
    imageContainer = document.querySelector(".img-container");




    #styleButtonHandler = (e) => {
    
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
        
        if(!imageId) {
            // const imgs = new Images(e.target.textContent, 
            //     { container:this.imageContainer,
            //      attributes:{"id":e.target.dataset.img,"data-id":e.target.dataset.id, "src":e.target.dataset.url},
            //      layer:this.constants[e.target.dataset.id].list[e.target.dataset.id].layer
            //     });
            }
        else imageId.src = e.target.dataset.url;
    };
    



    
    #styleButtonAssembler = (element, index) =>  {
        const styleButton = new Button(element.image, 
            { container:this.styleContainer,
             attributes:{"data-id":index, "data-img":element.id,"data-url":element.url, "class":["btn-primary style-button"] }
            });

             styleButton.eventHandler("click", (e) => this.#styleButtonHandler(e));    
            };



     
    #accessoryButtonHandler = (e) => {
        document.querySelectorAll(".accessories-button").forEach(elem => elem.classList.remove("active"));
            e.target.classList.toggle("active");
    
            document.querySelector("#style-btn-wrapper").textContent = '';
            
            const secButtons =  this.constants[e.target.dataset.id].list;
            secButtons.forEach((element, index) => this.#styleButtonAssembler(element,index));
    };

    


    #randomButtonHandler = () => {
        document.querySelectorAll(".img-container img").forEach(
            (images)=>images.src="");

        this.constants.forEach( (item) => {
            const image = item.list[random(item.list.length)];
            const imageId = document.getElementById(image.id);
            imageId.src = image.url;
        });
    }
    
    
    


    #downloadButtonHandler() {
        const imgList = [];
        document.querySelectorAll(".img-container img").forEach((images) => {    
            if (images.src !== location.href || !images.src) {
                imgList.push(images.src);
            }
        });
    
        mergeImages(imgList).then(b64 => download(b64, "my-Alpaca-Image"));
    }
    
    

}


const myApp = new App(constants);






    