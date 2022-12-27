function onReceive() {
    console.log(this.responseText);
}
let req = new XMLHttpRequest();
let url = ["https://incidecoder.com/products/frudia-green-grape-sebum-control-cooling-sun-gel"];

req.addEventListener("load", onReceive);
req.open("GET", url[0]);
req.send();