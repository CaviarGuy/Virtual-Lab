const canvas = document.getElementById("prismCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let torch = { x: 100, y: 200, width: 80, height: 30, isDragging: false, isOn: false };
let prism = { x: 350, y: 180, width: 100, height: 100, isDragging: false };
let beam = { x: torch.x + torch.width, y: torch.y + torch.height / 2, width: 300, height: 10, isVisible: false };
let progress = 0;
const progressBox = document.getElementById("progressBox");

let offsetX, offsetY, selectedElement = null;

function updateProgress(points) {
    if (progress < 100) {
        progress += points;
        progressBox.textContent = `Progress: ${progress} points`;
        if (progress === 100) {
            setTimeout(() => alert("Lab completed. Congrats!!"), 500);
        }
    }
}

function drawTorch() {
    ctx.fillStyle = "orange";
    ctx.fillRect(torch.x, torch.y, torch.width, torch.height);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(torch.x + torch.width, torch.y + torch.height / 2, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(torch.x + torch.width - 5, torch.y + torch.height / 2, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillRect(torch.x + 25, torch.y - 10, 20, 10);
}

function drawBeam() {
    if (!torch.isOn) return;
    beam.x = torch.x + torch.width;
    beam.y = torch.y + torch.height / 2 - beam.height / 2;
    beam.isVisible = true;
    ctx.fillStyle = "rgba(255,255,100,0.7)";
    let beamEndX = beam.x + beam.width;
    if (beamEndX >= prism.x && beam.x <= prism.x + prism.width && 
        beam.y >= prism.y && beam.y <= prism.y + prism.height) {
        beamEndX = prism.x + prism.width / 2;
        ctx.fillRect(beam.x, beam.y, beamEndX - beam.x, beam.height);
        if (progress === 50) updateProgress(50);
        drawLight("right");
    }
}

function drawPrism() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(prism.x, prism.y + prism.height);
    ctx.lineTo(prism.x + prism.width / 2, prism.y);
    ctx.lineTo(prism.x + prism.width, prism.y + prism.height);
    ctx.closePath();
    ctx.stroke();
}

function drawLight(direction) {
    let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    let startX = prism.x + prism.width;
    let startY = prism.y + prism.height / 2;
    let spread = 15;
    for (let i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(prism.x + prism.width / 2, prism.y + prism.height / 2);
        ctx.lineTo(startX + i * spread, startY + i * 8);
        ctx.lineTo(startX + i * spread, startY + i * 8 + 5);
        ctx.closePath();
        ctx.fill();
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTorch();
    drawBeam();
    drawPrism();
    requestAnimationFrame(update);
}

canvas.addEventListener("mousedown", (e) => {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if (mouseX > torch.x && mouseX < torch.x + torch.width && mouseY > torch.y && mouseY < torch.y + torch.height) {
        selectedElement = torch;
    } else if (mouseX > prism.x && mouseX < prism.x + prism.width && mouseY > prism.y && mouseY < prism.y + prism.height) {
        selectedElement = prism;
    }
    if (selectedElement) {
        offsetX = mouseX - selectedElement.x;
        offsetY = mouseY - selectedElement.y;
        selectedElement.isDragging = true;
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (selectedElement && selectedElement.isDragging) {
        selectedElement.x = e.offsetX - offsetX;
        selectedElement.y = e.offsetY - offsetY;
    }
});

canvas.addEventListener("mouseup", () => {
    if (selectedElement) {
        selectedElement.isDragging = false;
        selectedElement = null;
    }
});

document.getElementById("toggleTorch").addEventListener("click", () => {
    if (progress === 0) updateProgress(50);
    torch.isOn = !torch.isOn;
});

update();