import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const SCHOOLS = [
  "University of Ghana (Legon)",
  "KNUST",
  "University of Cape Coast (UCC)",
  "University of Education, Winneba (UEW)",
  "Ashesi University",
  "Central University",
];

export default function SchoolScreen() {
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 24,
        paddingTop: 80,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Select your school
      </Text>

      <Text
        style={{
          color: "#aaa",
          fontSize: 16,
          marginBottom: 32,
        }}
      >
        This helps us show you posts from your campus only.
      </Text>

      <FlatList
        data={SCHOOLS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = item === selectedSchool;

          return (
            <TouchableOpacity
              onPress={() => setSelectedSchool(item)}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 18,
                borderRadius: 14,
                backgroundColor: isSelected ? "#fff" : "#111",
                marginBottom: 14,
              }}
            >
              <Text
                style={{
                  color: isSelected ? "#000" : "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Continue Button */}
      <TouchableOpacity
        disabled={!selectedSchool}
        onPress={() => router.push("/verify")}
        style={{
          marginTop: 20,
          backgroundColor: selectedSchool ? "#fff" : "#333",
          paddingVertical: 16,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: selectedSchool ? "#000" : "#777",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
