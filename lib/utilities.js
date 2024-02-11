

export const download = (path, filename) => {
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



export const random = (max, min=0) => {
    return Math.floor(Math.random() * max - min) + min;
}


export const sortFn = (element) => {
    if(element.length<=1) return element;
    element.sort((a, b) => {
       return a.layer - b.layer;
     });
    }