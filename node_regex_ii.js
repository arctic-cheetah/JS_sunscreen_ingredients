// Mini project to find common ingredients of a sunscreen from a website
// With Text already obtained

// Function to extract ingredients from raw html data
function my_func (data) {
    let reg = /(?<=>)([\w ,\-_]+)(?=<)/g;
    let ingredients = data.match(reg);
    // console.log(ingredients);
    return ingredients;
}

// Get html from url 

// Obtain data from text
import fs from "fs";
let green_grape = fs.readFileSync("frudia_green_grape_UV.txt", "utf8");
let ultra_uv = fs.readFileSync("frudia_ultra_uv_ingredients.txt", "utf8");


green_grape = my_func(green_grape);
ultra_uv = my_func(ultra_uv);

// Find the union of the elements
// let union = [... new Set(ultra_uv.concat(green_grape))];
// console.log(union);
// console.log(union.length);


// Find the intersection of the elements
let intersect = green_grape.filter(e_grape => (ultra_uv.find(e_ultra => e_grape == e_ultra)));
console.log(intersect.length);
console.log(intersect);
// // Find the differences
// let diff = green_grape.filter(e_grape => (ultra_uv.find(e_ultra => e_grape == e_ultra) == undefined ? 1 : 0));
// console.log(diff);


console.log(ultra_uv.length);
console.log(green_grape.length);


