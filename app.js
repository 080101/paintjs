const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('js-color');
const brushRange = document.getElementById('js-Range');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.strokeStyle = 'black';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event) {
    stopPainting();
}

function changeColor(event) {
    //color의 rgb 출력
    const C = event.target.style.backgroundColor;
    console.log(C);
    ctx.strokeStyle = C;
    ctx.fillStyle = C;
}

function handleRangeChange(event) {
    //console.log(event);
    /*이거 둘 다 같은 의미임
    console.log(brushRange.value);
    console.log(event.target.value);
    */
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleMode() {
    // 누를 때의 filling의 설정값이 참이면, 이미 채우고 있는 설정 -> 버튼을 누르면 paint 모드로
    // 누를 때의 filling의 설정값이 거짓이면, paint 설정 -> 버튼 누르면 fill 모드
    if (filling === true) {
        filling = false;
        console.log('im painting');
        mode.innerText = 'Fill';
        //turn into paint mode
    } else {
        ///turn into Fill mode
        filling = true;
        mode.innerText = 'Paint';
        //ctx.fillStyle = ctx.strokeStyle;
        console.log('im filling');
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    //image를 link로 변환한후, 콘솔에서 확인가능
    //console.log(image);
    const link = document.createElement('a');
    link.href = image;
    link.download = 'Paint Javascript';
    link.click();
}

//color를 확인해보니, html collection이 나왔음.
console.log(Array.from(colors));
console.log(colors);

//html collection을 array로 변환하고 싶더라... 그래서 아래와 같은 방법으로!
Array.from(colors).forEach(i => i.addEventListener('click', changeColor));

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
}

if (brushRange) {
    brushRange.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleMode);
}

if (save) {
    save.addEventListener('click', handleSaveClick);
}
