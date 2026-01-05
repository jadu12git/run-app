import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOutAndNavigate = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400, // fade duration (ms)
      useNativeDriver: true,
    }).start(() => {
      router.replace("/welcome");
    });
  };

  useEffect(() => {
    const fallback = setTimeout(() => {
      fadeOutAndNavigate();
    }, 2500);

    return () => clearTimeout(fallback);
  }, []);


  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Video
        source={require("../assets/splash.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isMuted
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded && status.didJustFinish) {
            fadeOutAndNavigate();
          }
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
