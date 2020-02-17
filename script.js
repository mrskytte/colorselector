"use strict";

window.addEventListener("DOMContentLoaded", init);

// Initialize code
function init() {
  const colorPicker = document.querySelector("#colorpicker");
  colorPicker.addEventListener("input", changeColor);
}

function changeColor() {
  const colorValues = getColorValues(this);
  showColor(colorValues);
}

// Get color data
function getColorValues(thisColor) {
  const hexValue = thisColor.value;
  const rgbObject = calcRGB(hexValue);
  const hslObject = calcHSL(rgbObject.r, rgbObject.g, rgbObject.b);
  const colorValues = {
    hex: hexValue,
    rgb: rgbObject,
    hsl: hslObject
  };
  return colorValues;
}

// Calculate RGB value
function calcRGB(hex) {
  let rgbObject = {
    r: 0,
    g: 0,
    b: 0
  };
  rgbObject.r = parseInt(hex.substring(1, 3), 16);
  rgbObject.g = parseInt(hex.substring(3, 5), 16);
  rgbObject.b = parseInt(hex.substring(5, 7), 16);
  return rgbObject;
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

  const hslObject = {
    h: h,
    s: s,
    l: l
  };
  return hslObject;
}

function showColor(colorValues) {
  showNewColor(colorValues.hex);
  showNewhexValue(colorValues.hex);
  showNewRBGValue(colorValues.rgb);
  showNewHSLValue(colorValues.hsl);
}

// Show new color
function showNewColor(hex) {
  const colorbox = document.querySelector("#colorbox");
  colorbox.style.setProperty("--color", hex);
}

// Show new hex value
function showNewhexValue(hex) {
  const hexValue = document.querySelector("#hexvalue");
  hexValue.textContent = hex.toUpperCase();
}

// Show new RBG value
function showNewRBGValue(rgb) {
  const rValue = document.querySelector("#rValue");
  const gValue = document.querySelector("#gValue");
  const bValue = document.querySelector("#bValue");

  rValue.textContent = rgb.r;
  gValue.textContent = rgb.g;
  bValue.textContent = rgb.b;
}

// Show new HSL value
function showNewHSLValue(hsl) {
  const hValue = document.querySelector("#hValue");
  const sValue = document.querySelector("#sValue");
  const lValue = document.querySelector("#lValue");

  hValue.textContent = Math.round(hsl.h);
  sValue.textContent = Math.round(hsl.s) + "%";
  lValue.textContent = Math.round(hsl.l) + "%";
}
