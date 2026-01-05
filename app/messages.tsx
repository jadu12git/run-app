import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingTop: 60,
        paddingHorizontal: 24,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#fff", fontSize: 22 }}>←</Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: "bold",
            marginLeft: 16,
          }}
        >
          Messages
        </Text>
      </View>

      {/* Empty state */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#777", fontSize: 16, textAlign: "center" }}>
          No messages yet.
          {"\n"}Start a conversation from a post.
        </Text>
      </View>
    </View>
  );
}
