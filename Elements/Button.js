import Element from "./Element.js";



export default class Button extends Element{
    constructor(name,options=null) {
       super("button",name,options);
       this.name = name;
       this.options = options;
       this.container = options.container;
    } 
    
}


