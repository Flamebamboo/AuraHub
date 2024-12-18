// components/TimerArt/index.jsx
import React from 'react';
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

const TimerArt = ({ variant = 'COFFEE_CUP', progress, style }) => {
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
