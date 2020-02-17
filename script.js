"use strict";

window.addEventListener("DOMContentLoaded", init);
const rgbObject = {
  r: 0,
  g: 0,
  b: 0
};
const hslObject = {
  h: 0,
  s: 0,
  l: 0
};

let selectedColor;
// Initialize code
function init() {
  const colorPicker = document.querySelector("#colorpicker");
  colorPicker.addEventListener("input", getColor);
}

// Get color data
function getColor() {
  selectedColor = this.value;
  calcRGB();
  calcHSL(rgbObject.r, rgbObject.g, rgbObject.b);
}

// Calculate RGB value
function calcRGB() {
  rgbObject.r = parseInt(selectedColor.substring(1, 3), 16);
  rgbObject.g = parseInt(selectedColor.substring(3, 5), 16);
  rgbObject.b = parseInt(selectedColor.substring(5, 7), 16);
}

// Calculate HSL value
function calcHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  hslObject.h = h;
  hslObject.s = s;
  hslObject.l = l;

  console.log(hslObject);
}

// Show new color

// Show new HEX value

// Show new RBG value

// Show new HSL value
