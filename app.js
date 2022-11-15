let currentColor = '#000000'
let currentMode = 'color'
let gridSize = 16
let grid = []

const container = document.querySelector('#container')
const colorPicker = document.querySelector('#colorPicker')
const colorButton = document.querySelector('#colorMode')
const rainbowButton = document.querySelector('#rainbowMode')
const eraserButton = document.querySelector('#eraser')
const clear = document.querySelector('#clear')
const buttons = document.querySelectorAll('button')
const gridValue = document.querySelector('#gridValue')
const sizeSlider = document.querySelector('#sizeSlider')


colorPicker.addEventListener('change', chooseColor);
colorButton.addEventListener('click', () => {changeMode('color')})
rainbowButton.addEventListener('click', () => {changeMode('rainbow')})
eraserButton.addEventListener('click', () => {changeMode('eraser')})
clear.addEventListener('click', clearGrid)
sizeSlider.addEventListener('change', resizeGrid)

function populateGrid(){ 
  for (let i=0; i < gridSize*gridSize; i++){
    const element = document.createElement('div')
    element.classList.add('unit')
    element.addEventListener('mouseover', changeColor)
    
    grid.push(element)
    container.appendChild(element)
  }
}

function changeColor(e){
  if (e.buttons === 1){
    if (currentMode === 'color'){
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'rainbow') {
      const rRed = Math.floor(Math.random()*256)
      const rGreen = Math.floor(Math.random()*256)
      const rBlue = Math.floor(Math.random()*256)

      e.target.style.backgroundColor = `rgb(${rRed}, ${rGreen}, ${rBlue})`
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = 'rgb(255, 255, 255)'
    }   
  }
}

function chooseColor(){
  currentColor = colorPicker.value
  currentMode = 'color'
  updateClasses(colorButton)
}

function changeMode(mode){
  currentMode = mode
  switch (mode){
    case 'color':
      updateClasses(colorButton)
      break
    case 'rainbow':
      updateClasses(rainbowButton)
      break
    case 'eraser':
      updateClasses(eraserButton)
  }
}

function clearGrid(){
  grid.forEach((element) => {
    element.style.backgroundColor = 'rgb(255, 255, 255)'
  })
}

function resizeGrid(){
  grid.forEach((element) => {
    container.removeChild(element)
  })
  grid = []
  gridSize = sizeSlider.value
  gridValue.innerHTML = `${gridSize} x ${gridSize}`

  container.style["grid-template-columns"] = `repeat(${gridSize}, 1fr)`

  populateGrid()
}

function updateClasses(activeButton){
  buttons.forEach((element) => {
    element.classList.remove('active')
  })
  activeButton.classList.add('active')
}

populateGrid()
updateClasses(colorButton)