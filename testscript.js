'use strict';

const contentWidth = document.querySelector(`#content`).offsetWidth;
const contentHeight = document.querySelector(`#content`).offsetHeight;
const canvasWidth = contentWidth;
const canvasHeight = contentHeight;

const canvas = new fabric.Canvas('canvas', {
    width: canvasWidth,
    height: canvasHeight,
});

const grid = 10; //Changing this value will affect size of squares of grid.

//rotating obejcts limited to set degrees. commented this out because it limits my manipulation of object at a certain degree
fabric.Object.prototype.set({
    snapAngle: 5
});

// Creates a grid based off grid value the size of squares is adjusted.
let init = function () {
    for (let i = 0; i <= (canvasWidth / grid); i++) {
        canvas.add(new fabric.Line([i * grid, 0, i * grid, canvasHeight], { type: 'line', stroke: '#ccc', selectable: false, hoverCursor: "default" }));
    }
    for(let i= 0; i <= (canvasHeight/grid); i++){
        canvas.add(new fabric.Line([0, i * grid, canvasWidth, i * grid], { type: 'line', stroke: '#ccc', selectable: false, hoverCursor: "default" }));
    }
}

init();

//Snap to grid.
canvas.on('object:moving', function (options) {
    options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
    });
}); 


//line drawing - REVIEW - BUG: When selecting something else then line also draws. 
let line;
let isDrawing = false;
let DrawMode = 0;
const lineToolButton = document.querySelector(`.outerwall`);

lineToolButton.addEventListener(`click`, function () {

    canvas.defaultCursor = `crosshair`;
    DrawMode = 1;


    canvas.on('mouse:down', function (o) {
        isDrawing = true;
        let pointer = canvas.getPointer(o.e);
        let points = [pointer.x, pointer.y, pointer.x, pointer.y];

        line = new fabric.Line(points, {
            strokeWidth: 5,
            stroke: 'black',
            strokeUniform:true
        });
        canvas.add(line);
    });

    canvas.on('mouse:move', function (o) {
        if (isDrawing && DrawMode === 1) {
            let pointer = canvas.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });

            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function (o) {
        if (isDrawing && DrawMode === 1) {
        isDrawing = false;
        line.selectable = false;
        console.log(line);
        canvas.discardActiveObject()
        
        }
        
    });
})
// mouse selector mode function
const mouseSelectorMode = document.querySelector(".MouseSelectorMode");
mouseSelectorMode.addEventListener('click', function () {
    DrawMode = 0;
    canvas.defaultCursor = `default`;
})
//--------objects----------//

//Creates demo object in form of square, would otherwise be a rectangular image of a table, chair etc. 

// let square = new fabric.Rect({
//     left: 100,
//     top: 100,
//     width: 50,
//     height: 50,
//     fill: 'red',
//     originX: 'left',
//     originY: 'top',
//     centeredRotation: true,
// });
// canvas.add(square);

let chairButton = document.querySelector(`.chair`);
chairButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/chair.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

let sofaPieceButton = document.querySelector(`.sofaPiece`);
sofaPieceButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/armlessUnit.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

let cornerButton = document.querySelector(`.corner`);
cornerButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/corner.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

let stoolButton = document.querySelector(`.stool`);
stoolButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/stool.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

let footStoolButton = document.querySelector(`.footStool`);
footStoolButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/footStool.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

let tableButton = document.querySelector(`.table`);
tableButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/table.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

let wardrobeButton = document.querySelector(`.wardrobe`);
wardrobeButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/wardrobe.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

let bedButton = document.querySelector(`.bed`);
bedButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/doubleBed.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

let drawersButton = document.querySelector(`.drawers`);
drawersButton.addEventListener(`click`, function () {
    DrawMode = 0;
    canvas.defaultCursor = `arrow`;
    fabric.Image.fromURL(`./furnitureImages/drawers.png`, function (img) {
        let imgProperties = img.set({ left: 0, top: 0 });
        canvas.add(imgProperties);
    })
})

//--------objects end-------//

//reset button functionality 
let resetButton = document.querySelector(`.reset`);

resetButton.addEventListener(`click`, function () {
    canvas.clear();
    init();
})


// creating rotation funtions
var fabricGrouping = new fabric.Group();// created a group
let canvasCenter = new fabric.Point(canvasWidth / 2, canvasHeight / 2); // center of canvas
let rads = 0.174532925; // 10 degrees in radians

//rotate canvas right
let buttonRight = document.querySelector(`.rotateRight`);
buttonRight.addEventListener('click', function () {
    canvas.discardActiveObject(); // disselect any active selected objects
    let allObjs = canvas.getObjects();// select all object in the canvas
    allObjs.forEach(e => {
        fabricGrouping.add(e);// add object to the group
    });
    let objectOrigin = new fabric.Point(fabricGrouping.left, fabricGrouping.top);
    let postRotate = fabric.util.rotatePoint(objectOrigin, canvasCenter, rads); //calculating rotation point 
    fabricGrouping.top = postRotate.y;
    fabricGrouping.left = postRotate.x;
    fabricGrouping.rotate(fabricGrouping.angle + 10); // rotating object 
    canvas.renderAll();
});

// rotate left
let buttonLeft = document.querySelector(`.rotateLeft`);
buttonLeft.addEventListener('click', function () {
    canvas.discardActiveObject(); // disselect any active selected objects
    let allObjs = canvas.getObjects();// select all object in the canvas
    allObjs.forEach(e => {
        fabricGrouping.add(e);// add object to the group
    });
    let objectOrigin = new fabric.Point(fabricGrouping.left, fabricGrouping.top);
    let postRotate = fabric.util.rotatePoint(objectOrigin, canvasCenter, -rads); //calculating rotation point 
    fabricGrouping.top = postRotate.y;
    fabricGrouping.left = postRotate.x;
    fabricGrouping.rotate(fabricGrouping.angle - 10); // rotating object 
    console.log(canvasHeight);
console.log(canvasWidth);
    canvas.renderAll();
});

//delete object selected.
let buttonDelete = document.querySelector(`.delete`)
buttonDelete.addEventListener(`click`, function () {
    canvas.remove(canvas.getActiveObject());
});

//select all objects.
let selectAllButton = document.querySelector(`.selectAll`)
selectAllButton.addEventListener(`click`, function () {
    canvas.discardActiveObject();
    let sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
    });
    canvas.setActiveObject(sel);
})