


export default class Element {

    constructor(type,name,options) {
        this.name = name;
        this.options = options;
        this.element = document.createElement(type);
        this.element.textContent = name;
        this.container = options.container;
        this.options.attributes && Object.keys(this.options.attributes).forEach((element) => {
            this.element.setAttribute(element, this.options.attributes[element]);
        });
        this.options.container.appendChild(this.element);
    }



    create() {
        
        return this.element;
    }

    
    get id() {
        return this.element;
    } 


    eventHandler(event,handler) {
       this.element.addEventListener(event,(e) => handler(e));
    }



    styleElement(style, attr) {
        this.element.style = style;
        attr && Object.keys(attr).forEach((element) => {
            this.element.setAttribute(element, attr.element);
        });
    }

    styleContainer(style, attr) {
        this.container.style = style;
        attr && Object.keys(attr).forEach((element) => {
            this.element.setAttribute(element, attr.element);
        });
    }
}