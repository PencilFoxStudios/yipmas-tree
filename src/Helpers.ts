

export function calculateGreenHueRotation(hsl: [number, number, number]): number {
  // Calculate the hue rotation needed to make it green
  const greenHueRotation = (120 - hsl[0] + 360) % 360;
  console.log("green", greenHueRotation)
  return greenHueRotation;
}

export function calculateRedHueRotation(hsl: [number, number, number]): number {

    // Calculate the hue rotation needed to make it red
    const redHueRotation = (0 - hsl[0] + 360) % 360;
    console.log("red", redHueRotation)
    return redHueRotation;
}

