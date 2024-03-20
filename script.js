let size = document.querySelector("#size");
let plate = document.querySelector(".plate");
let picker = document.getElementById("picker");
let color = picker.value;
let sizeLabel = document.querySelector(".sizeLabel");
let lineBtn = document.querySelector(".lineBtn");
let reset = document.querySelector(".reset");
let eraser = document.querySelector(".eraser");
let darken = document.querySelector(".darken");
let dark = false;
let whitten = false;
let clicked = false;
let line = true;

//toggle grid line
function gridLine() {
    if (line === true) {
        line = false;
    }

    else {
        line = true;
    }

    let allGrid = document.querySelectorAll('.grid');
    if (line === false) {
        allGrid.forEach(function (grid) {
            grid.style.border = 'none';
        })
    }
    else {
        allGrid.forEach(function (grid) {
            grid.style.border = '1px solid black';
        })
    }
}

function erase(){
    if (whitten){
        whitten = false;
        dark = false;
    }
    else{
        whitten = true;
    }
}

// function buttonColor(btn){
//     if(btn){
//         btn.style.backgroundColor="green";
//     }
// }

function resetPlate() {
    let allGrid = document.querySelectorAll(".grid");
    allGrid.forEach(function (grid) {
        grid.style.backgroundColor = "white";
    })
    whitten = false;
}

function colorPicker() {
    color = picker.value;
    whitten = false;
    dark = false;
    return color;
}

function darkening() {
    if (dark === true) {
        dark = false;
    }
    else {
        dark = true;
        whitten = false;
    }
    return dark;
}

function createGrid() {
    //set grid cells
    let cell = size.value ** 2;
    plate.style.gridTemplateColumns = "repeat(" + size.value + ", 1fr)";
    plate.style.gridTemplateRows = "repeat(" + size.value + ", 1fr)";

    //reset value
    plate.textContent = '';

    //create grid cells
    for (let i = 0; i < cell; i++) {
        let grid = document.createElement('div');
        grid.className = 'grid';
        plate.appendChild(grid);
        grid.style.backgroundColor = 'rgb(255, 255, 255)';
        if (line) {
            grid.style.border = '1px solid black';
        }
        else {
            grid.style.border = 'none';
        }
    }
    sizeLabel.textContent = `Value: ${size.value} x ${size.value}`;
    
    plate.addEventListener('mousedown', function (event) {
        clicked = true;
    });

    plate.addEventListener('mouseup', function (event) {
        clicked = false;
    });

    let allGrid = document.querySelectorAll('.grid');

    allGrid.forEach(function (grid) {
        grid.addEventListener('mouseenter', (event) => {
            if (clicked) {
                if (whitten){
                    color = "rgb(255,255,255)";
                }
                else if (dark) {
                    let bg = window.getComputedStyle(grid).getPropertyValue("background-color");
                    // Extracting RGB values
                    let rgbValues = bg.match(/\d+/g);
                    let r = Math.max(parseInt(rgbValues[0]) - parseInt(rgbValues[0])/10, 0);
                    let g = Math.max(parseInt(rgbValues[1]) - parseInt(rgbValues[1])/10, 0);
                    let b = Math.max(parseInt(rgbValues[2]) - parseInt(rgbValues[2])/10, 0);
                    color = `rgb(${r}, ${g}, ${b})`;
                }
                else {
                    color = colorPicker();
                }
                event.target.style.backgroundColor = color;
            }
        });
    });
}


size.addEventListener('input', createGrid);
lineBtn.addEventListener('click', gridLine);
picker.addEventListener('click', colorPicker);
reset.addEventListener('click', resetPlate);
darken.addEventListener('click', darkening);
eraser.addEventListener('click', erase);

createGrid();
