// console.log("Hello World"); this is to print on the console of a website when clicked on inspect on the righthand side of the page 

/*
const sayHello = () => {
    console.log("Hello World");
}
document.getElementById("btn-click-me").onclick = sayHello;
*/
document.getElementById("btn-click-me").onclick = (event) => {
    document.getElementById("p-welcome").innerHTML ="Hello World.";
    event.currentTarget.classList.add("clicked"); // current target is the button that was clicked.
};

document.getElementById("btn-happy").onclick =() => {
    document.getElementById("p-feeling").onclick ="YYAY"
    document.getElementById("p-feeling")
}