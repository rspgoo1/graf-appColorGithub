// Sliders
const rojo = document.getElementById("rojo");
const verde = document.getElementById("verde");
const azul = document.getElementById("azul");

// Inputs numéricos
const rojoInput = document.getElementById("rojoInput");
const verdeInput = document.getElementById("verdeInput");
const azulInput = document.getElementById("azulInput");

// Pickers independientes
const rojoPicker = document.getElementById("rojoPicker");
const verdePicker = document.getElementById("verdePicker");
const azulPicker = document.getElementById("azulPicker");

// Vista previa y códigos
const preview = document.getElementById("preview");
const hexCode = document.getElementById("hexCode");
const rgbCode = document.getElementById("rgbCode");

function actualizarColor() {
  const r = parseInt(rojo.value);
  const g = parseInt(verde.value);
  const b = parseInt(azul.value);

  // Actualizar inputs numéricos
  rojoInput.value = r;
  verdeInput.value = g;
  azulInput.value = b;

  const rgb = `rgb(${r}, ${g}, ${b})`;
  preview.style.backgroundColor = rgb;
  rgbCode.textContent = rgb;

  // Convertir a hexadecimal
  const hex = "#" + [r, g, b]
    .map(v => v.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  hexCode.textContent = hex;

  // Actualizar pickers de cada canal
  rojoPicker.value = `#${r.toString(16).padStart(2,"0")}0000`;
  verdePicker.value = `#00${g.toString(16).padStart(2,"0")}00`;
  azulPicker.value = `#0000${b.toString(16).padStart(2,"0")}`;
}

function actualizarDesdeInput() {
  const r = Math.min(255, Math.max(0, parseInt(rojoInput.value) || 0));
  const g = Math.min(255, Math.max(0, parseInt(verdeInput.value) || 0));
  const b = Math.min(255, Math.max(0, parseInt(azulInput.value) || 0));

  rojo.value = r;
  verde.value = g;
  azul.value = b;

  actualizarColor();
}

// Eventos sliders
[rojo, verde, azul].forEach(slider => {
  slider.addEventListener("input", actualizarColor);
});

// Eventos inputs numéricos
[rojoInput, verdeInput, azulInput].forEach(input => {
  input.addEventListener("input", actualizarDesdeInput);
});

// Eventos pickers independientes
rojoPicker.addEventListener("input", () => {
  const r = parseInt(rojoPicker.value.substr(1, 2), 16);
  rojo.value = r;
  rojoInput.value = r;
  actualizarColor();
});

verdePicker.addEventListener("input", () => {
  const g = parseInt(verdePicker.value.substr(3, 2), 16);
  verde.value = g;
  verdeInput.value = g;
  actualizarColor();
});

azulPicker.addEventListener("input", () => {
  const b = parseInt(azulPicker.value.substr(5, 2), 16);
  azul.value = b;
  azulInput.value = b;
  actualizarColor();
});

// Inicializar
actualizarColor();
