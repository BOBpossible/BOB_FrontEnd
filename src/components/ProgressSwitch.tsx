import {Animated} from 'react-native';

// export const progressValue = useState(new Animated.Value(-10))[0];

export function moveLeft(progressValue: any) {
  Animated.timing(progressValue, {
    toValue: 40,
    duration: 200,
    useNativeDriver: false,
  }).start();
}
export function moveRight(progressValue: any) {
  Animated.timing(progressValue, {
    toValue: -10,
    duration: 200,
    useNativeDriver: false,
  }).start();
}
