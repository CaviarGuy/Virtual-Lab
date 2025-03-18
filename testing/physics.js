const canvas = document.getElementById("magnetCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;

let magnets = [
    { x: 100, y: 120, width: 80, height: 40, pole: "N", isDragging: false },
    { x: 250, y: 120, width: 80, height: 40, pole: "N", isDragging: false },
    { x: 400, y: 120, width: 80, height: 40, pole: "S", isDragging: false },
    { x: 550, y: 120, width: 80, height: 40, pole: "S", isDragging: false }
];

let selectedMagnet = null;
let offsetX = 0, offsetY = 0;

function drawMagnet(magnet) {
    ctx.fillStyle = magnet.pole === "N" ? "red" : "blue";
    ctx.fillRect(magnet.x, magnet.y, magnet.width, magnet.height);
    
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(magnet.pole, magnet.x + magnet.width / 2 - 10, magnet.y + magnet.height / 2 + 7);
}

function checkInteraction() {
    for (let i = 0; i < magnets.length; i++) {
        for (let j = i + 1; j < magnets.length; j++) {
            let m1 = magnets[i];
            let m2 = magnets[j];

            let distanceX = Math.abs(m1.x - m2.x);
            let distanceY = Math.abs(m1.y - m2.y);

            if (distanceX < 90 && distanceY < 50) {  // Close enough to interact
                if (m1.pole === m2.pole) {
                    // Repel: Move apart
                    if (m1.x < m2.x) {
                        m1.x -= 10;
                        m2.x += 10;
                    } else {
                        m1.x += 10;
                        m2.x -= 10;
                    }
                } else {
                    // Attract: Move together
                    if (m1.x < m2.x) {
                        m1.x += 5;
                        m2.x -= 5;
                    } else {
                        m1.x -= 5;
                        m2.x += 5;
                    }
                }
            }
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    magnets.forEach(drawMagnet);
    requestAnimationFrame(update);
}

canvas.addEventListener("mousedown", (e) => {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    
    for (let magnet of magnets) {
        if (
            mouseX > magnet.x &&
            mouseX < magnet.x + magnet.width &&
            mouseY > magnet.y &&
            mouseY < magnet.y + magnet.height
        ) {
            selectedMagnet = magnet;
            offsetX = mouseX - magnet.x;
            offsetY = mouseY - magnet.y;
            magnet.isDragging = true;
            break;
        }
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (selectedMagnet) {
        selectedMagnet.x = e.offsetX - offsetX;
        selectedMagnet.y = e.offsetY - offsetY;
    }
});

canvas.addEventListener("mouseup", () => {
    if (selectedMagnet) {
        selectedMagnet.isDragging = false;
        checkInteraction();
        selectedMagnet = null;
    }
});

update();
