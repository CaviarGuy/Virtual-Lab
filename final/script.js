// Get elements
const fluid1 = document.getElementById('fluid1');
const fluid2 = document.getElementById('fluid2');
const finalFluid = document.getElementById('finalFluid');
const popupMessage = document.getElementById('popupMessage');
const beaker1 = document.getElementById('beaker1');
const beaker2 = document.getElementById('beaker2');
const finalBeaker = document.getElementById('finalBeaker');

// Track if both beakers have been dropped into the final beaker
let beaker1Dropped = false;
let beaker2Dropped = false;

// Allow drop functionality
function allowDrop(event) {
    event.preventDefault(); // Prevent default behavior to allow drop
}

// Handle the drag event
function drag(event) {
    event.dataTransfer.setData("text", event.target.id); // Set the dragged element's id
}

// Handle drop event and simulate mixing
function drop(event) {
    event.preventDefault();

    // Get the id of the dragged beaker
    const draggedBeakerId = event.dataTransfer.getData("text");

    // Determine which beaker was dragged
    const draggedBeaker = document.getElementById(draggedBeakerId);
    const draggedFluid = draggedBeaker.querySelector('.fluid');

    // If the beaker has already been dropped, do nothing
    if ((draggedBeakerId === 'beaker1' && beaker1Dropped) || 
        (draggedBeakerId === 'beaker2' && beaker2Dropped)) {
        return;
    }

    // Set the fluid of the dragged beaker to 0% after it is dropped
    draggedFluid.style.height = '0%';

    // Mark the beaker as dropped
    if (draggedBeakerId === 'beaker1') {
        beaker1Dropped = true;
    } else if (draggedBeakerId === 'beaker2') {
        beaker2Dropped = true;
    }

    // Check if both beakers have been dropped into the final beaker
    if (beaker1Dropped && beaker2Dropped) {
        // Fill the final beaker and simulate the chemical reaction
        finalFluid.style.height = '100%'; // Fill the final beaker
        finalFluid.style.backgroundColor = 'green'; // Reaction color (example)

        // Show the success message after a short delay
        setTimeout(() => {
            popupMessage.style.display = 'block';
        }, 1000); // Popup appears after 1 second

        // Display the chemical reaction in a window alert
        setTimeout(() => {
            // Chemical reaction formula (example: HCl + NaOH -> NaCl + H2O)
            alert('Chemical Reaction: \nHCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)');
        }, 1500); // Alert appears after 1.5 seconds for a smoother experience
    }
}