import { JssStyle } from "jss";
import colors from "./colors";

export const lightText: JssStyle = {
  color: colors.lightGrey,
  borderColor: colors.lightGrey,
};

export const darkText: JssStyle = {
  color: colors.darkGrey,
  borderColor: colors.darkGrey,
};

export const secondaryBackground = colors.lightBlue;

export const headerFontFamily: JssStyle = {
  fontFamily: "'Roboto Slab', helvetica, serif",
};

export const regularFontFamily: JssStyle = {
  fontFamily: "'Roboto Slab', helvetica, serif",
};

export const argyleBackground: JssStyle = (() => {
  const deepColor = "rgba(0, 0, 0, .1)";
  const stripColor = "rgba(255, 255, 255, .1)";
  const argyleSize = 60;
  return {
    backgroundColor: "grey",
    backgroundImage: `
    repeating-linear-gradient(120deg, 
      ${stripColor}, 
      ${stripColor} 1px, 
      transparent 1px, 
      transparent ${argyleSize / 2}px
    ),
    repeating-linear-gradient(60deg, 
      ${stripColor}, 
      ${stripColor} 1px, 
      transparent 1px, 
      transparent ${argyleSize / 2}px
    ),
    linear-gradient(60deg, 
      ${deepColor} 25%, 
      transparent 25%, 
      transparent 75%, 
      ${deepColor} 75%, 
      ${deepColor}
    ),
    linear-gradient(120deg, 
      ${deepColor} 25%, 
      transparent 25%, 
      transparent 75%, 
      ${deepColor} 75%, 
      ${deepColor}
    )`,
    backgroundSize: `${argyleSize / Math.sqrt(3)}px ${argyleSize}px`,
  };
})();

export const Breakpoints = {
  SMALL: "400px",
  MEDIUM: "600px",
} as const;

export const CssClasses = {
  LIGHT_BACKGROUND: "light-background",
} as const;
