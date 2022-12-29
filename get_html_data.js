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
// Assumes parameters are an array
// Return array of text
function dom_to_text (page) {
    let dat = [];
    for (let i = 0; i < page.length; i+=1) {
        let temp = new JSDOM(page[i]);
        // Convert the DOM of the ingredient list to a text 
        dat = dat.concat([temp.window.document.getElementById("showmore-section-ingredlist-short").innerHTML]);
    }
    return dat;
    
}

// Extract ingredients into text form using regex 
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

//Key-value object to associate an ingredient with the type of sunblock 
let sunblock = new Object();
sunblock.green_grape = sunblock_ingred[0];
sunblock.ultra_uv = sunblock_ingred[1];
sunblock.avocado = sunblock_ingred[2];
// console.log(sunblock.green_grape);



//Find the difference in ingredient
let diff_uv_grape = sunblock.green_grape.filter(e_grape => (sunblock.ultra_uv.find(e_uv => e_uv == e_grape) == undefined ? 1 : 0));
console.log(diff_uv_grape);

let diff_grape_avo = sunblock.avocado.filter(e_avo=> (sunblock.green_grape.find(e_grape => e_grape == e_avo) == undefined ? 1 : 0));
console.log(diff_grape_avo);

let diff_uv_avo = sunblock.ultra_uv.filter(e_uv=> (sunblock.avocado.find(e_avo => e_uv == e_avo) == undefined ? 1 : 0));
console.log(diff_uv_avo);

