import React, { useState, useEffect } from 'react';
import './App.css';
import Vibrant from 'node-vibrant';
import { useSound } from 'use-sound';
import { calculateGreenHueRotation, calculateRedHueRotation } from './Helpers';

const treeLevels = [1, 2, 3, 4, 1]; // Number of trees to render at each row, centered

interface Color {
  rgb: number[];
  hex: string;
  hsl: [number, number, number];
}

function App() {
  const [treeImage, setTreeImage] = useState('/default.png');
  const [soundFile, setSoundFile] = useState('/default.wav');
  const [prominentColor, setProminentColor] = useState<Color>({
    rgb: [255, 255, 255],
    hex: '#ffffff',
    hsl: [0, 0, 100],
  });

  const [play] = useSound(soundFile);

  const extractColor = async () => {
    try {
      const palette = await Vibrant.from(treeImage).getPalette();
      const dominantColor = palette.Vibrant || palette.Muted || palette.DarkVibrant || null;
      console.log("dominantColor", dominantColor);
      if (dominantColor) {
        const color: Color = {
          rgb: dominantColor.getRgb(),
          hex: dominantColor.getHex(),
          hsl: dominantColor.getHsl(),
        };
        setProminentColor(color);
      }
    } catch (error) {
      console.error('Error extracting color:', error);
    }
  };

  const playSound = (note?: number) => {
    // Map each note to a specific pitch or frequency
    const pitch = note ? (note % 49) + 49 : 0; // Ensure the pitch is within a reasonable range (49-97)
    console.log(pitch);
  
    // Play the sound using use-sound
    play({ playbackRate: pitch / 49 }); // Normalize the pitch to be between 1 and 2
  };
  


  useEffect(() => {
    extractColor();
  }, [treeImage, soundFile]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Christmas-tree">
          {treeLevels.map((rowTrees, rowIndex) => (
            <div key={rowIndex} className="Tree-row">
              {Array.from({ length: rowTrees }, (_, colIndex) => {
                // Assign a unique note to each image based on its position, with the note increasing from top to bottom
                const note = rowTrees * rowIndex + colIndex + 1;
                return (
                  <img
                    key={`${rowIndex}-${colIndex}`}
                    src={treeImage}
                    className={`Tree-image Tree-level-${rowIndex + 1}`}
                    alt={`Christmas Tree Level ${rowIndex + 1}`}
                    style={((rowIndex + 1) % 2 === 0) ? { filter: `hue-rotate(${calculateGreenHueRotation(prominentColor.hsl)}deg)` } : { filter: `hue-rotate(${calculateRedHueRotation(prominentColor.hsl)}deg)` }}
                    onClick={() => playSound(note)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
