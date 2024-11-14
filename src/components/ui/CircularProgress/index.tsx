import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Svg, { Circle, CircleProps } from 'react-native-svg';

interface CircularProgressProps {
  value?: number;
  duration?: number;
  strokeColorConfig?: Array<{
    color: string;
    value: number;
  }>;
  progressValueColor?: string;
}

type AnimatedCircleProps = CircleProps & {
  strokeDashoffset?: Animated.AnimatedInterpolation<string | number>;
  stroke?: Animated.AnimatedInterpolation<string>;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  duration = 2500,
  strokeColorConfig = [
    { color: 'red', value: 0 },
    { color: 'orange', value: 50 },
    { color: 'green', value: 100 },
  ],
  progressValueColor = '#000'
}) => {
  const [progress] = useState(new Animated.Value(0));
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayText, setDisplayText] = useState('0%');
  
  useEffect(() => {
    animatedValue.addListener(({ value: v }) => {
      setDisplayText(`${Math.round(v)}%`);
    });

    Animated.parallel([
      Animated.timing(progress, {
        toValue: value,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: value,
        duration: duration,
        useNativeDriver: true,
      })
    ]).start();

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [value]);

  const radius = 45;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const animatedColor = progress.interpolate({
    inputRange: strokeColorConfig.map(config => config.value),
    outputRange: strokeColorConfig.map(config => config.color),
  });

  return (
    <View style={styles.wrapper}>
      <Svg height={radius * 2} width={radius * 2} style={styles.svg}>
        <Circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <AnimatedCircle
          stroke={animatedColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </Svg>
      <Animated.Text
        style={[
          styles.progressText,
          { color: progressValueColor }
        ]}
      >
        {displayText}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
    position: 'absolute',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CircularProgress;