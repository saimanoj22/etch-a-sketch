function createGrid(n){
    let container = document.querySelector('.right');
    let grid = document.createElement('div');
    grid.className = 'grid';
    grid.style.cssText = `grid-template-columns: repeat(${n}, 1fr); grid-template-rows: repeat(${n}, 1fr);`
    container.appendChild(grid);
}

function createGridElements(n){
    let grid = document.querySelector('.grid');
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            let cell = document.createElement('div');
            cell.className = 'grid-element';
            // to avoid overlapping borders
            if(i == 0 && j == 0){
                cell.style.cssText = "border-left: solid; border-top: solid; border-width: 1px;border-color: #a8a8a8;";
            }
            else if(i == 0){
                cell.style.cssText = "border-top: solid; border-width: 1px;border-color: #a8a8a8;";
            }
            else if(j == 0){
                cell.style.cssText = "border-left: solid; border-width: 1px;border-color: #a8a8a8;";
            }
            // append to parent div - grid
            grid.appendChild(cell);
        }
    }
}

function generateRandomColor(){
    // // random rgb
    // let red = Math.floor(Math.random() * 226);
    // let green = Math.floor(Math.random() * 226);
    // let blue = Math.floor(Math.random() * 226);
    // return `rgb(${red},${green},${blue})`;

    // random hsl
    let value = Math.floor(Math.random()*361);
    return `hsl(${value}, 100%, 50%)`;
}

function gridElementsListener(){
    let elements = document.querySelectorAll('.grid-element');
    let color = document.querySelector('.incolor');
    elements.forEach(element => {
        element.addEventListener('mouseover', (event) => {

            // colorMode
            if(colorMode === true){
                element.style.backgroundColor = color.value;
            }
            if(rainbowMode === true){
                let randColor = generateRandomColor();
                element.style.backgroundColor = randColor;
            }
            if(eraser === true){
                element.style.backgroundColor = 'rgb(224, 229, 236)';
            }

        });
    });
}

function clearAllElements(){
    let elements = document.querySelectorAll('.grid-element');
    elements.forEach(element => {
        element.style.backgroundColor = 'rgb(224, 229, 236)';
    });
}

function createNewGrid(num){
    let container = document.querySelector('.right');
    let grid = document.querySelector('.grid');
    container.removeChild(grid);
    n = num;
    createGrid(n);
    createGridElements(n);
    gridElementsListener();
}

function turnGridLinesOff(){
    let elements = document.querySelectorAll('.grid-element');
    elements.forEach(element => {
        element.style.borderStyle = 'none';
    });  
}

function turnGridLinesOn(){
    let elements = document.querySelectorAll('.grid-element');
    let count = 0;
    elements.forEach(element => {
        element.style.borderStyle = 'solid';
        count++;
        if(count <= n && count !== 1){
            element.style.borderLeft = '0px';
        }
        if(count % n === 1 && count !== 1){
            element.style.borderTop = '0px';
        }
    });    
}

// main / start

let n = 16;
createGrid(n);
createGridElements(n);
gridElementsListener();

let colorMode = true;
let rainbowMode = false;
let eraser = false;

let buttons = document.querySelectorAll('.left button');

buttons.forEach(button => {

    button.addEventListener('click', () => {
        // check class name
        if(button.className === 'colorMode'){
            colorMode = true;
            rainbowMode = false;
            eraser = false;
        }
        if(button.className === 'rainbow'){
            colorMode = false;
            rainbowMode = true;
            eraser = false;
        }
        if(button.className === 'eraser'){
            colorMode = false;
            rainbowMode = false;
            eraser = true;
        }
        if(button.className === 'clear'){
            clearAllElements();
        }
        if(button.className === 'newGrid'){
            let num = prompt('Grid Size (n x n) \nEnter n (1-100):');
            if(num < 1){
                alert('n cannot be less than 1.');
            }
            else if(num > 100){
                alert('n cannot be greater than 100.');
            }
            else{
                createNewGrid(num);
            }
        }
        if(button.className === 'gridLines'){
            let linesStatus = document.querySelector('.gridLines .linesOnOff');
            if(linesStatus.textContent === 'ON'){
                linesStatus.textContent = 'OFF';
                turnGridLinesOff();
            }
            else{
                linesStatus.textContent = 'ON';
                turnGridLinesOn();
            }
        }

    });
});
