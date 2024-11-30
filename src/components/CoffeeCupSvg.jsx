import React, { useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedProps, withTiming, useSharedValue } from 'react-native-reanimated';

// we are creating a custom animatable components with Animated Object
//
const AnimatedPath = Animated.createAnimatedComponent(Path);

const CoffeeCupSvg = ({ progress = 0 }) => {
  //useSharedValue lets you define shared values in your components
  const fillProgress = useSharedValue(1);

  useEffect(() => {
    //when using useSharedValue, values MUST be acess & modified through .value property

    //withTiming is a animation function used to animate progress
    //TODO: EXPLORE config
    fillProgress.value = withTiming(progress, {
      duration: 1000,
    });
  }, [progress]);

  // the fill Pattern for the coffee cup from svg converter
  const fillPath =
    'M30 78h36M28 77h39M28 76h40M27 75h42M26 74h44M25 73h46M24 72h47M24 71h47M23 70h49M22 69h50M22 68h50M21 67h52M21 66h52M21 65h52M21 64h52M21 63h52M21 62h52M21 61h52M21 60h52M21 59h52M21 58h52M21 57h52M21 56h52M21 55h52M21 54h52M21 53h52M21 52h52M21 51h52M21 50h52M21 49h52M21 48h52M21 47h52M21 46h52M21 45h52M21 44h52M21 43h52M21 42h52M21 41h52M21 40h52M21 39h51M21 38h51M21 37h50M21 36h50M21 35h50M21 34h50M21 33h50M21 32h50M21 31h50M21 30h50';
  //useAnimatedProps is a hook that updates everytime the animated value changes in this scenario it is the  fillProgress
  const animatedProps = useAnimatedProps(() => {
    // in SVG path, the M command stands for "move to" by splitting on M
    // it allows us to break down each path making it easier to animate
    const lines = fillPath.split('M');
    const totalLines = lines.length;
    const linesToShow = Math.floor(totalLines * (1 - fillProgress.value));

    //
    const visiblePath = lines
      .slice(0, linesToShow)
      .map((line, index) => (index === 0 ? line : 'M' + line))
      .join('');

    return {
      d: visiblePath || '', // Use empty string if no lines should be shown
    };
  });

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.5 100 100"
      shapeRendering="crispEdges"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Cup outline */}
      <Path
        stroke="#000000"
        d="M19 28h54M19 29h55M19 30h2M71 30h3M19 31h2M71 31h3M19 32h2M71 32h3M19 33h2M71 33h3M19 34h2M71 34h3M19 35h2M71 35h3M19 36h2M71 36h3M19 37h2M71 37h3M19 38h2M72 38h2M19 39h2M72 39h13M19 40h2M73 40h14M19 41h2M73 41h2M83 41h4M19 42h2M73 42h2M85 42h3M19 43h2M73 43h2M85 43h3M19 44h2M73 44h2M86 44h2M19 45h2M73 45h2M86 45h2M19 46h2M73 46h2M87 46h1M19 47h2M73 47h2M87 47h1M19 48h2M73 48h2M87 48h1M19 49h2M73 49h2M86 49h2M19 50h2M73 50h2M86 50h2M19 51h2M73 51h2M86 51h2M19 52h2M73 52h2M86 52h1M19 53h2M73 53h2M86 53h1M19 54h2M73 54h2M86 54h1M19 55h2M73 55h2M85 55h2M19 56h2M73 56h2M85 56h2M19 57h2M73 57h2M85 57h2M19 58h2M73 58h2M84 58h3M19 59h2M73 59h2M83 59h3M19 60h2M73 60h2M83 60h3M19 61h2M73 61h2M83 61h3M19 62h2M73 62h2M82 62h4M19 63h2M73 63h2M81 63h4M19 64h2M73 64h2M79 64h4M19 65h2M73 65h2M78 65h4M19 66h2M73 66h2M76 66h4M20 67h1M73 67h6M20 68h2M72 68h5M20 69h2M72 69h4M21 70h2M72 70h3M22 71h2M71 71h4M22 72h2M71 72h3M23 73h2M71 73h3M24 74h2M70 74h3M25 75h2M69 75h4M25 76h3M68 76h4M26 77h2M67 77h4M27 78h3M66 78h3M28 79h40M30 80h37"
      />

      {/* Animated fill */}
      <AnimatedPath stroke="#ff0000" animatedProps={animatedProps} />
    </Svg>
  );
};

export default CoffeeCupSvg;
