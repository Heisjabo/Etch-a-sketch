// etch a sketch project
// implement ui elements (control buttons, and grid container)
// functionality
// Declare selectors for my controllers
// set inital states
// function to generate grids
// event listener to squares
// function to clear grids
// function to change color
// function to erase
// reset function

const container = document.getElementById('container');
const sizeSelector = document.getElementById('sizeSelector');
const sizeValue = document.getElementById('sizeValue');
const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const clearBtn = document.getElementById("clearBtn");
const eraserBtn = document.getElementById("eraserBtn");

let currentMode = 'color';
let currentSize = 16;
let currentColor = '#000000';

window.onload = () => {
  activateButton(currentMode);
};

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function setCurrentColor(newColor){
  currentColor = newColor;
}

function switchMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => switchMode("color");
rainbowBtn.onclick = () => switchMode("rainbow");
eraserBtn.onclick = () => switchMode("eraser");
clearBtn.onclick = () => resetGrid();
sizeSelector.onmousemove = (e) => setCurrentSize(e.target.value);

function resetGrid(){
  container.innerHTML = "";
  generateGrid(currentSize);
}

sizeSelector.addEventListener("input", () => {
  resetGrid();
  updateSizeValue(currentSize);
  generateGrid(currentSize);
});

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

generateGrid(currentSize);

function generateGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const squareGrid = document.createElement("div");
    squareGrid.classList.add("square");
    squareGrid.addEventListener("mouseover", changeColor);
    squareGrid.addEventListener("mousedown", changeColor);
    container.appendChild(squareGrid);
  }
}

function changeColor(e) {
  if (e.type === "mouseover") return;
  if (currentMode == 'rainbow') {
    e.target.style.backgroundColor = getRandomColor();
  } else if (currentMode == 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode == 'eraser') {
    e.target.style.backgroundColor = "#fff";
  }
}


function updateSizeValue(value) {
  sizeValue.textContent = `${value} x ${value}`;
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
