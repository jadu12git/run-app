import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function PendingScreen() {
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
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Verification in progress
      </Text>

      <Text
        style={{
          color: "#aaa",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        We’re reviewing your student ID. This usually takes less than 24 hours.
        You’ll get full access once approved. Explore feed now
      </Text>

        <TouchableOpacity
        onPress={() => router.replace("/feed?status=pending")}
        style={{
            backgroundColor: "#fff",
            paddingVertical: 16,
            paddingHorizontal: 36,
            borderRadius: 30,
        }}
        >
        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
            Go to feed
        </Text>
        </TouchableOpacity>

    </View>
  );
}
