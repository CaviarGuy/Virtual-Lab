let switchComponent, voltmeter;
let wires = [];
let probes = [];
let isConnected = false;
let voltmeterReading = "--";

function setup() {
    createCanvas(800, 500);
    
    // Create switch
    switchComponent = new Switch(200, 200);
    
    // Create voltmeter
    voltmeter = new Voltmeter(600, 150);

    // Create probes (Movable wire ends)
    probes.push(new Probe(180, 210, "red"));  // Positive probe
    probes.push(new Probe(220, 210, "black")); // Negative probe

    // Create long wires from switch to voltmeter
    wires.push(new Wire(180, 210, 680, 160, probes[0])); // Extra long red wire
    wires.push(new Wire(220, 210, 680, 180, probes[1])); // Extra long black wire
}

function draw() {
    background(255);
    
    switchComponent.show();
    voltmeter.show();
    
    wires.forEach(wire => wire.show());
    probes.forEach(probe => probe.show());
    
    checkConnection();
}

// Check if probes are properly connected to the voltmeter
function checkConnection() {
    isConnected = probes.every(probe => probe.isConnectedToVoltmeter());
    document.getElementById("status").innerText = isConnected ? "Circuit Active" : "Connect Wires to Activate";
    document.getElementById("status").style.color = isConnected ? "green" : "red";
    voltmeter.setReading(isConnected ? "10.61V" : "--");
}

// Component Classes
class Switch {
    constructor(x, y) { this.x = x; this.y = y; }
    show() {
        fill(0);
        rect(this.x, this.y, 40, 20);
        fill(255);
        textSize(14);
        text("Switch", this.x - 5, this.y - 5);
    }
}

class Voltmeter {
    constructor(x, y) { this.x = x; this.y = y; this.reading = "--"; }
    show() {
        fill(0);
        rect(this.x, this.y, 100, 50);
        fill(255);
        textSize(16);
        text("V: " + this.reading, this.x + 25, this.y + 30);
    }
    setReading(reading) { this.reading = reading; }
}

class Probe {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    show() {
        fill(this.color === "red" ? "red" : "black");
        ellipse(this.x, this.y, 10, 10);
    }
    isConnectedToVoltmeter() {
        return dist(this.x, this.y, 680, 160) < 15 && this.color === "red" ||
               dist(this.x, this.y, 680, 180) < 15 && this.color === "black";
    }
}

class Wire {
    constructor(x1, y1, x2, y2, probe) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.probe = probe;
    }
    show() {
        stroke(0);
        strokeWeight(2);
        line(this.x1, this.y1, this.probe.x, this.probe.y);
    }
}

// Make probes draggable (to connect wires)
function mouseDragged() {
    probes.forEach(probe => {
        if (dist(mouseX, mouseY, probe.x, probe.y) < 10) {
            probe.x = mouseX;
            probe.y = mouseY;
        }
    });
}
