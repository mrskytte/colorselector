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
  colorPicker.addEventListener("input", changeColor);
}

function changeColor() {
  let HEXValue = getColorValues(this);
  showColor(HEXValue);
}

// Get color data
function getColorValues(thisColor) {
  const HEXValue = thisColor.value;
  calcRGB(HEXValue);
  calcHSL(rgbObject.r, rgbObject.g, rgbObject.b);
  return HEXValue;
}

// Calculate RGB value
function calcRGB(HEX) {
  rgbObject.r = parseInt(HEX.substring(1, 3), 16);
  rgbObject.g = parseInt(HEX.substring(3, 5), 16);
  rgbObject.b = parseInt(HEX.substring(5, 7), 16);
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
}

function showColor(HEXValue) {
  showNewColor(HEXValue);
  showNewHEXValue(HEXValue);
  showNewRBGValue();
  showNewHSLValue();
}

// Show new color
function showNewColor(HEX) {
  const colorbox = document.querySelector("#colorbox");
  colorbox.style.setProperty("--color", HEX);
}

// Show new HEX value
function showNewHEXValue(HEX) {
  const hexValue = document.querySelector("#hexvalue");
  hexValue.textContent = HEX.toUpperCase();
}

// Show new RBG value
function showNewRBGValue() {
  const rValue = document.querySelector("#rValue");
  const gValue = document.querySelector("#gValue");
  const bValue = document.querySelector("#bValue");

  rValue.textContent = rgbObject.r;
  gValue.textContent = rgbObject.g;
  bValue.textContent = rgbObject.b;
}

// Show new HSL value
function showNewHSLValue() {
  const hValue = document.querySelector("#hValue");
  const sValue = document.querySelector("#sValue");
  const lValue = document.querySelector("#lValue");

  hValue.textContent = Math.round(hslObject.h);
  sValue.textContent = Math.round(hslObject.s) + "%";
  lValue.textContent = Math.round(hslObject.l) + "%";
}
