const container = document.querySelector('#container')
let grid = []


 for (let i=0; i < 16*16; i++){
   const element = document.createElement('div')
   element.classList.add('unit')
  
  grid.push(element);
   container.appendChild(element);
 }

console.log(container)

grid.forEach((element) => {
  element.addEventListener('mouseover', (e) => {
    e.target.style.background = 'black'
  })
})