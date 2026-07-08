const gridContainer = document.getElementById('gridContainer');
const colorPicker = document.getElementById('colorPicker');
const gridSizeInput = document.getElementById('gridSize');
const sizeValue = document.getElementById('sizeValue');
const clearBtn = document.getElementById('clearBtn');

let isDrawing = false;

// Track mouse button states so you can click & drag to draw
document.body.onmousedown = () => (isDrawing = true);
document.body.onmouseup = () => (isDrawing = false);

// Function to generate the grid cells dynamically
function createGrid(size) {
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 20px)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 20px)`;

  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    
    // Color a single pixel on click
    pixel.addEventListener('mousedown', colorPixel);
    
    // Color pixels on drag (when mouse is held down)
    pixel.addEventListener('mouseover', (e) => {
      if (isDrawing) colorPixel(e);
    });

    gridContainer.appendChild(pixel);
  }
}

// Function to set pixel background color from the picker
function colorPixel(e) {
  e.target.style.backgroundColor = colorPicker.value;
}

// Update grid size dynamically when slider moves
gridSizeInput.addEventListener('input', (e) => {
  const newSize = e.target.value;
  sizeValue.textContent = `${newSize}x${newSize}`;
  createGrid(newSize);
});

// Clear canvas button
clearBtn.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(pixel => pixel.style.backgroundColor = '#ffffff');
});

// Build default 16x16 grid when page loads
createGrid(16);