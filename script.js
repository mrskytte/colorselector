"use strict";

window.addEventListener("DOMContentLoaded", init);

// Initialize code
function init() {
  const colorPicker = document.querySelector("#colorpicker");
  const harmonyForm = document.querySelector("#radiocontainer");
  colorPicker.addEventListener("input", function() {
    changeColors(this.value);
  });
  harmonyForm.addEventListener("change", function() {
    changeColors(colorPicker.value);
  });
}

function changeColors(hex) {
  const mainColorValues = getMainColorValues(hex);
  mainColorValues.color = 1;
  const harmonyColorValues = getHarmonyColorValues(
    mainColorValues.hsl.h,
    mainColorValues.hsl.s,
    mainColorValues.hsl.l
  );
  const leftColor = {
    color: harmonyColorValues.colorNumber[0],
    hsl: harmonyColorValues.hsl[0],
    rgb: harmonyColorValues.rgb[0],
    hex: harmonyColorValues.hex[0].hex
  };
  const leftMiddleColor = {
    color: harmonyColorValues.colorNumber[1],
    hsl: harmonyColorValues.hsl[1],
    rgb: harmonyColorValues.rgb[1],
    hex: harmonyColorValues.hex[1].hex
  };
  const rightMiddleColor = {
    color: harmonyColorValues.colorNumber[2],
    hsl: harmonyColorValues.hsl[2],
    rgb: harmonyColorValues.rgb[2],
    hex: harmonyColorValues.hex[2].hex
  };
  const rightColor = {
    color: harmonyColorValues.colorNumber[3],
    hsl: harmonyColorValues.hsl[3],
    rgb: harmonyColorValues.rgb[3],
    hex: harmonyColorValues.hex[3].hex
  };
  const allColors = [
    mainColorValues,
    leftColor,
    leftMiddleColor,
    rightColor,
    rightMiddleColor
  ];
  for (let i = 0; i < 5; i++) {
    showColors(allColors[i]);
  }
}

// MODEL PART

// Get the values for the harmony colors
function getHarmonyColorValues(h, s, l) {
  const checked = getCheckedValue();

  if (checked === "analogous") {
    return getAnalogousValues(h, s, l);
  }
  if (checked === "monochromatic") {
    return getMonochromaticValues(h, s, l);
  }
  if (checked === "triad") {
    return getTriadValues(h, s, l);
  }
  if (checked === "complementary") {
    return getComplementaryValues(h, s, l);
  }
  if (checked === "compound") {
    return getCompoundValues(h, s, l);
  }
  if (checked === "shades") {
    return getShadesValues(h, s);
  }
}

function getCheckedValue() {
  const analogousBtn = document.querySelector("#analogous");
  const monochromaticBtn = document.querySelector("#monochromatic");
  const triadBtn = document.querySelector("#triad");
  const complementaryBtn = document.querySelector("#complementary");
  const compoundBtn = document.querySelector("#compound");
  const shadesBtn = document.querySelector("#shades");

  if (analogousBtn.checked) {
    return "analogous";
  }
  if (monochromaticBtn.checked) {
    return "monochromatic";
  }
  if (triadBtn.checked) {
    return "triad";
  }
  if (complementaryBtn.checked) {
    return "complementary";
  }
  if (compoundBtn.checked) {
    return "compound";
  }
  if (shadesBtn.checked) {
    return "shades";
  }
}

// Analogous calculation

function getAnalogousValues(h, s, l) {
  const hsl = getAnalogousHSLValues(h, s, l);
  const rgb = calcRGBfromHSL(hsl);
  const hex = calcHexfromRGB(rgb);
  const colorNumber = [2, 3, 4, 5];
  const analogousValues = { hsl, rgb, hex, colorNumber };
  return analogousValues;
}

function getAnalogousHSLValues(h, s, l) {
  const hValues = {
    h1: getAnalogousHValues(h, -60),
    h2: getAnalogousHValues(h, -30),
    h4: getAnalogousHValues(h, 30),
    h5: getAnalogousHValues(h, 60)
  };
  const hsl1 = { h: hValues.h1, s, l },
    hsl2 = { h: hValues.h2, s, l },
    hsl4 = { h: hValues.h4, s, l },
    hsl5 = { h: hValues.h5, s, l };
  const hslValues = [hsl1, hsl2, hsl4, hsl5];
  return hslValues;
}

function getAnalogousHValues(h, increment) {
  let hValue = h + increment;
  if (hValue < 0) {
    hValue += 360;
  }
  return hValue;
}

// Monochromatic calculation

function getMonochromaticValues(h, s, l) {
  const hsl = getMonochromaticHSLValues(h, s, l);
  const rgb = calcRGBfromHSL(hsl);
  const hex = calcHexfromRGB(rgb);
  const colorNumber = [2, 3, 4, 5];
  const monochromaticValues = { hsl, rgb, hex, colorNumber };
  return monochromaticValues;
}

function getMonochromaticHSLValues(h, s, l) {
  const newValues = {
    s1: getNewMonochromaticValues(s, -20),
    s2: getNewMonochromaticValues(s, -10),
    l1: getNewMonochromaticValues(l, 10),
    l2: getNewMonochromaticValues(l, 20)
  };
  const hsl1 = { h, s: newValues.s1, l },
    hsl2 = { h, s: newValues.s2, l },
    hsl4 = { h, s, l: newValues.l1 },
    hsl5 = { h, s, l: newValues.l2 };
  const hslValues = [hsl1, hsl2, hsl4, hsl5];
  return hslValues;
}

function getNewMonochromaticValues(hslValue, increment) {
  let newValue = hslValue + increment;
  if (newValue > 100) {
    newValue = 100;
  }
  if (newValue < 0) {
    newValue = 0;
  }
  return newValue;
}

// Triad calculation

function getTriadValues(h, s, l) {
  const hsl = getTriadHSLValues(h, s, l);
  const rgb = calcRGBfromHSL(hsl);
  const hex = calcHexfromRGB(rgb);
  const colorNumber = [2, 3, 4, 5];
  const triadValues = { hsl, rgb, hex, colorNumber };
  return triadValues;
}

function getTriadHSLValues(h, s, l) {
  const newValues = {
    h1: getNewTriadValues(h, -120),
    l1: getNewTriadValues(l, -120, 10),
    h2: getNewTriadValues(h, 120)
  };
  const hsl1 = { h: newValues.h1, s, l },
    hsl2 = { h: newValues.h1, s, l: newValues.l1 },
    hsl4 = { h: newValues.h2, s, l: newValues.l1 },
    hsl5 = { h: newValues.h2, s, l };
  const hslValues = [hsl1, hsl2, hsl4, hsl5];
  return hslValues;
}

function getNewTriadValues(hslValue, hIncrement, lIncrement) {
  let newValue;
  if (lIncrement) {
    console.log("l please");
    newValue = hslValue + lIncrement;
    if (newValue > 100) {
      newValue = 100;
    }
    if (newValue < 0) {
      newValue = 0;
    }
  } else {
    console.log("h please");
    newValue = hslValue + hIncrement;
    if (newValue < 0) {
      newValue += 360;
    }
    if (newValue > 360) {
      newValue -= 360;
    }
  }
  return newValue;
}

// Complementary calculation

function getComplementaryValues(h, s, l) {
  const hsl = getComplementaryHSLValues(h, s, l);
  const rgb = calcRGBfromHSL(hsl);
  const hex = calcHexfromRGB(rgb);
  const colorNumber = [2, 3, 4, 5];
  const complementaryValues = { hsl, rgb, hex, colorNumber };
  return complementaryValues;
}

function getComplementaryHSLValues(h, s, l) {
  const newValues = {
    h1: getNewComplementaryValues(h, 180),
    l1: getNewComplementaryValues(l, -15, true),
    l2: getNewComplementaryValues(l, -30, true)
  };
  const hsl1 = { h: newValues.h1, s, l },
    hsl2 = { h: newValues.h1, s, l: newValues.l1 },
    hsl4 = { h, s, l: newValues.l1 },
    hsl5 = { h, s, l: newValues.l2 };
  const hslValues = [hsl1, hsl2, hsl4, hsl5];
  return hslValues;
}

function getNewComplementaryValues(hslValue, increment, isL) {
  let newValue = hslValue + increment;
  if (isL) {
    if (newValue > 100) {
      newValue = 100;
    }
    if (newValue < 0) {
      newValue = 0;
    }
  } else {
    if (newValue > 360) {
      console.log(newValue);
      newValue -= 360;
    }
  }
  return newValue;
}

// Compound calculation

function getCompoundValues(h, s, l) {
  const hsl = getCompoundHSLValues(h, s, l);
  const rgb = calcRGBfromHSL(hsl);
  const hex = calcHexfromRGB(rgb);
  const colorNumber = [2, 3, 4, 5];
  const compoundValues = { hsl, rgb, hex, colorNumber };
  return compoundValues;
}

function getCompoundHSLValues(h, s, l) {
  const newValues = {
    h1: getNewCompoundValues(h, 20),
    h2: getNewCompoundValues(h, 120),
    l1: getNewCompoundValues(l, -15, true)
  };
  const hsl1 = { h: newValues.h1, s, l },
    hsl2 = { h: newValues.h1, s, l: newValues.l1 },
    hsl4 = { h: newValues.h2, s, l },
    hsl5 = { h: newValues.h2, s, l: newValues.l1 };
  const hslValues = [hsl1, hsl2, hsl4, hsl5];
  return hslValues;
}

function getNewCompoundValues(hslValue, increment, isL) {
  let newValue = hslValue + increment;
  if (isL) {
    if (newValue > 100) {
      newValue = 100;
    }
    if (newValue < 0) {
      newValue = 0;
    }
  } else {
    if (newValue > 360) {
      console.log(newValue);
      newValue -= 360;
    }
  }
  return newValue;
}

// Shades calculation

function getShadesValues(h, s, l) {
  const hsl = getShadesHSLValues(h, s, l);
  const rgb = calcRGBfromHSL(hsl);
  const hex = calcHexfromRGB(rgb);
  const colorNumber = [2, 3, 4, 5];
  const shadesValues = { hsl, rgb, hex, colorNumber };
  return shadesValues;
}

function getShadesHSLValues(h, s) {
  const newValues = {
    l1: 25,
    l2: 50,
    l3: 75,
    l4: 10
  };
  const hsl1 = { h, s, l: newValues.l1 },
    hsl2 = { h, s, l: newValues.l2 },
    hsl4 = { h, s, l: newValues.l3 },
    hsl5 = { h, s, l: newValues.l4 };
  const hslValues = [hsl1, hsl2, hsl4, hsl5];
  return hslValues;
}

function getNewShadesValues(hslValue, increment) {
  let newValue = hslValue + increment;
  if (newValue > 100) {
    newValue = 100;
  }
  if (newValue < 0) {
    newValue = 0;
  }
  return newValue;
}

// Get color data
function getMainColorValues(thisColor) {
  const hexValue = thisColor;
  const rgbObject = calcRGBfromHex(hexValue);
  const hslObject = calcHSLfromRGB(rgbObject.r, rgbObject.g, rgbObject.b);
  const colorValues = {
    hex: hexValue,
    rgb: rgbObject,
    hsl: hslObject
  };
  return colorValues;
}

// Calculate RGB value from Hex
function calcRGBfromHex(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

// Calculate HSL value from RGB
function calcHSLfromRGB(r, g, b) {
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
  return { h, s, l };
}

// Calculate RGB from HSL
function calcRGBfromHSL(hsl) {
  const rgbValues = [];
  for (let i = 0; i < 4; i++) {
    let h = hsl[i].h;
    let s = hsl[i].s;
    let l = hsl[i].l;
    // Borrowed from https://css-tricks.com/converting-color-spaces-in-javascript/
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    const rgb = { r, g, b };
    rgbValues.push(rgb);
  }
  return rgbValues;
}

// Calculate Hex from RGB
function calcHexfromRGB(rgb) {
  const hexValues = [];
  for (let i = 0; i < 4; i++) {
    let r = rgb[i].r.toString(16);
    let g = rgb[i].g.toString(16);
    let b = rgb[i].b.toString(16);

    console.log(r);
    if (r.length == 1) r = "0" + r;
    console.log(g);
    if (g.length == 1) g = "0" + g;
    console.log(b);
    if (b.length == 1) b = "0" + b;
    const hexValue = { hex: "#" + r + g + b };
    hexValues.push(hexValue);
  }
  return hexValues;
}

// DISPLAY PART

// Display colors
function showColors(colorValues) {
  showColor(colorValues.hex, colorValues.color);
  showHexValue(colorValues.hex, colorValues.color);
  showRBGValue(colorValues.rgb, colorValues.color);
  showMainHSLValue(colorValues.hsl, colorValues.color);
}

// Show new color
function showColor(hex, colorNumber) {
  const colorbox = document.querySelector(`#color${colorNumber}>.colorbox`);
  colorbox.style.setProperty("--color", hex);
}

// Show new hex value
function showHexValue(hex, colorNumber) {
  const hexValue = document.querySelector(`#color${colorNumber} .hexvalue`);
  hexValue.textContent = hex.toUpperCase();
}

// Show new RBG value
function showRBGValue(rgb, colorNumber) {
  const rValue = document.querySelector(`#color${colorNumber} .rValue`);
  const gValue = document.querySelector(`#color${colorNumber} .gValue`);
  const bValue = document.querySelector(`#color${colorNumber} .bValue`);

  rValue.textContent = rgb.r;
  gValue.textContent = rgb.g;
  bValue.textContent = rgb.b;
}

// Show new HSL value
function showMainHSLValue(hsl, colorNumber) {
  const hValue = document.querySelector(`#color${colorNumber} .hValue`);
  const sValue = document.querySelector(`#color${colorNumber} .sValue`);
  const lValue = document.querySelector(`#color${colorNumber} .lValue`);

  hValue.textContent = Math.round(hsl.h);
  sValue.textContent = Math.round(hsl.s);
  lValue.textContent = Math.round(hsl.l);
}
