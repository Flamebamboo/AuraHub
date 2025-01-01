// components/TimerArt/index.jsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CoffeeCupSvg from './variants/CoffeeCupSvg';
import Square from './variants/Square';
import Square2 from './variants/Square2';

// Future imports for other timer arts
// import StudyLampSvg from './variants/StudyLampSvg';
// import CodeEditorSvg from './variants/CodeEditorSvg';

const TimerArtVariants = {
  COFFEE_CUP: 'COFFEE_CUP',
  SQUARE: 'SQUARE',
  SQUARE2: 'SQUARE2',
  // CODE_EDITOR: 'CODE_EDITOR',
};

//bg for the timer art depending on current variant in use we will let the home compoenet change background to this
const TimerColor = {
  COFFEE_CUP: '#241527',
};

const TimerArt = ({ variant = 'COFFEE_CUP', progress, style, onColorChange }) => {
  useEffect(() => {
    const color = TimerColor[variant];
    onColorChange(color);
  }, [variant, onColorChange]);
  const renderArt = () => {
    switch (variant) {
      case TimerArtVariants.COFFEE_CUP:
        return <CoffeeCupSvg progress={progress} />;
      case TimerArtVariants.SQUARE:
        return <Square progress={progress} />;
      case TimerArtVariants.SQUARE2:
        return <Square2 progress={progress} />;
      default:
        return <CoffeeCupSvg progress={progress} />;
    }
  };

  return <View style={[styles.container, style]}>{renderArt()}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { TimerArt, TimerArtVariants };
