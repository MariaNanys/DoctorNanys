import './styles.scss';

let barBtn = document.querySelector(".nav-bar");
let barLine1 = document.querySelector(".bar1");
let barLine3 = document.querySelector(".bar3");


function toggleBar() {
    console.log(barLine1);
    console.log(barLine3);
    barLine1.classList.toggle("change");
    barLine3.classList.toggle("change");

}

barBtn.addEventListener("click", toggleBar);