import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AuthScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 24,
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <Text
        style={{
          color: "#fff",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Join RUN
      </Text>

      <Text
        style={{
          color: "#aaa",
          fontSize: 16,
          marginBottom: 40,
        }}
      >
        Sign up with your email to join your campus.
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email address"
        placeholderTextColor="#666"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#111",
          color: "#fff",
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 12,
          marginBottom: 16,
          fontSize: 16,
        }}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "#111",
          color: "#fff",
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 12,
          marginBottom: 24,
          fontSize: 16,
        }}
      />

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => router.push("/school")}
        style={{
          backgroundColor: "#fff",
          paddingVertical: 16,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>

      {/* Login link */}
      <TouchableOpacity
        style={{ marginTop: 24, alignItems: "center" }}
        onPress={() => {}}
      >
        <Text style={{ color: "#aaa" }}>
          Already have an account?{" "}
          <Text style={{ color: "#fff", fontWeight: "600" }}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
