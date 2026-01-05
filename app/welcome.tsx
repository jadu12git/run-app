import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        Your campus.
        {"\n"}
        Your voice.
      </Text>

      <Text
        style={{
          color: "#aaa",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Join anonymous conversations happening at your university.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/auth")}
        style={{
          backgroundColor: "#fff",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 30,
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Join your campus
        </Text>
      </TouchableOpacity>
    </View>
  );
}
