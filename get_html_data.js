import fetch from 'node-fetch';

function onReceive() {
    console.log(this.responseText);
}

let url = ["https://incidecoder.com/products/frudia-green-grape-sebum-control-cooling-sun-gel"];
const response = await fetch(url);
const body = await response.text();


console.log(body);