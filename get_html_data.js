// Imports and definitons
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';


//Url
let url = ["https://incidecoder.com/products/frudia-green-grape-sebum-control-cooling-sun-gel", 
"https://incidecoder.com/products/frudia-ultra-uv-shield-sun-essence", 
"https://incidecoder.com/products/frudia-avocado-greenery-relief-sun-cream"];

//Function definitions


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
        // Convert the DOM of the ingredients list to a text 
        dat = dat.concat([temp.window.document.getElementById("showmore-section-ingredlist-short").innerHTML]);
    }
    return dat;
    
}

// Extract ingredientss into text form using regex 
function get_ingredients(data) {
    let reg = /(?<=>)([\w ,\-_]+)(?=<)/g;
    let ingredients = [];
    for (let i = 0; i < data.length; i+=1) {
        ingredients = ingredients.concat( [data[i].match(reg)] );
    }
    return ingredients;
}


// A function to find the intersection or the common ingredientss between two sunscreens
// 3C2 = 3 ways 
function intersect_ingred (sunblock) {
    let common = {};
    let keys = Object.keys(sunblock);
    // Get the combinations (nC2) of the sunblock
    let order = keys.flatMap((v,i) => keys.slice(i + 1).map(w => v + ',' + w));
    
    //Go the each combination of sunblock and finding the common ingredientss
    order.map((curr) => {
        let c = curr.split(",");
        let temp_common_ingred = sunblock[c[0]].ingredients.filter((e1 => sunblock[c[1]].ingredients.find(en => e1 == en)));
        let temp_common_name = `${c[0]},${c[1]}`;
        common[temp_common_name] = {common_ingredients : temp_common_ingred};
    });

    // console.log(common);
    // console.log(common['green_grape,ultra_uv'].common_ingredients.length);
    return common;
}

// A function to find the difference in ingredients between two sunblock, uses an intersection to find differents between two sunblock
function diff_ingred (sunblock, obj) {

}


// Main program

//Convert html text to an editable DOM and access the "showmore-section-ingredlist-short" tags and its children

// YaY IT WORKS!
let page = await fetch_data(url);
let temp = dom_to_text(page);
let sunblock_ingred = get_ingredients(temp);

//Key-value object to associate the ingredients with the type of sunblock 
let sunblock = new Object();
sunblock.green_grape = {ingredients : sunblock_ingred[0]};
sunblock.ultra_uv = {ingredients : sunblock_ingred[1]};
sunblock.avocado = {ingredients : sunblock_ingred[2]};



// Find the difference in ingredients. There are P(n,2) ways to find a difference between the sunblock = n * (n - 1) ways to find non-common things,
// aka ingrdients unique to between two chosen sunblock 




let intersect = intersect_ingred(sunblock);
let diff = diff_ingred(sunblock, intersect);
console.log(intersect);

// let diff_grape_uv = sunblock.g_grape.ingredients.filter(e_grape => (sunblock.ultra_uv.ingredients.find(e_uv => e_uv == e_grape) == undefined ? 1 : 0));
// console.log(diff_grape_uv);

// let diff_uv_grape = sunblock.ultra_uv.ingredients.filter(e_uv => (sunblock.g_grape.ingredients.find(e_grape => e_uv == e_grape) == undefined ? 1 : 0));
// console.log(diff_uv_grape);
