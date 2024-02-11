import Element from "./Element.js";



export default class Images extends Element {
    constructor( name, options, layer ) {
    super("img", name, options)
       this.name = name;
       this.container = options.container;
       this.options = options;
       this.element.style.zIndex = layer;
    }

}