const canvas = document.getElementById("magnetCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;

let magnets = [
    { x: 200, y: 130, width: 80, height: 40, pole: "N", isDragging: false },
    { x: 280, y: 130, width: 80, height: 40, pole: "S", isDragging: false }
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
    let [m1, m2] = magnets;
    let distance = Math.abs(m1.x + m1.width - m2.x);

    if (distance < 20) {
        if ((m1.pole === "N" && m2.pole === "S") || (m1.pole === "S" && m2.pole === "N")) {
            // Attract: Snap together
            if (m1.x < m2.x) {
                m2.x = m1.x + m1.width;
            } else {
                m1.x = m2.x + m2.width;
            }
        } else {
            // Repel: Push away
            if (m1.x < m2.x) {
                m1.x -= 10;
                m2.x += 10;
            } else {
                m1.x += 10;
                m2.x -= 10;
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
        selectedMagnet = null;
        checkInteraction();
    }
});

update();
