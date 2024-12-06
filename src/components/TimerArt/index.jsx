// components/TimerArt/index.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CoffeeCupSvg from './variants/CoffeeCupSvg';
// Future imports for other timer arts
// import StudyLampSvg from './variants/StudyLampSvg';
// import CodeEditorSvg from './variants/CodeEditorSvg';

const TimerArtVariants = {
  COFFEE_CUP: 'COFFEE_CUP',
  // STUDY_LAMP: 'STUDY_LAMP',
  // CODE_EDITOR: 'CODE_EDITOR',
};

const TimerArt = ({ variant = TimerArtVariants.COFFEE_CUP, progress, style }) => {
  const renderArt = () => {
    switch (variant) {
      case TimerArtVariants.COFFEE_CUP:
        return <CoffeeCupSvg progress={progress} />;
      // case TimerArtVariants.STUDY_LAMP:
      //   return <StudyLampSvg progress={progress} />;
      // case TimerArtVariants.CODE_EDITOR:
      //   return <CodeEditorSvg progress={progress} />;
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
