// Imports and definitons
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';


//Url
let url = ["https://incidecoder.com/products/frudia-green-grape-sebum-control-cooling-sun-gel", 
"https://incidecoder.com/products/frudia-ultra-uv-shield-sun-essence", 
"https://incidecoder.com/products/frudia-avocado-greenery-relief-sun-cream"];



// Function to fetch html from website
async function fetch_data(url) {
    let data = [];
    for (let i = 0; i < url.length; i+=1) {
        let response = await fetch(url[i]);
        data = data.concat([await response.text()]);
    }
    return data;
}

// Function to convert DOM to text
function dom_to_text (page) {
    let dat = [];
    for (let i = 0; i < page.length; i+=1) {
        let temp = new JSDOM(page[i]);
        // Convert the DOM of the ingredient list to a text 
        dat = dat.concat([temp.window.document.getElementById("showmore-section-ingredlist-short").innerHTML]);
    }
    return dat;
    
}

// Extract ingredients using regex
function get_ingredients (data) {
    let reg = /(?<=>)([\w ,\-_]+)(?=<)/g;
    let ingredients = [];
    for (let i = 0; i < data.length; i+=1) {
        ingredients = ingredients.concat( [data[i].match(reg)] );
    }
    return ingredients;
}


//Convert html text to an editable DOM and access the "showmore-section-ingredlist-short" tags and its children

// YaY IT WORKS!
let page = await fetch_data(url);
let temp = dom_to_text(page);
let sunblock_ingred = get_ingredients(temp);

console.log(sunblock_ingred);

