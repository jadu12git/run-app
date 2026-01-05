import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const CATEGORIES = [
  "Running",
  "New",
  "Career",
  "Sports",
  "Entertainment",
  "Relationship",
  "Food",
  "Religion",
  "Politics",
  "Cracked guys",
];

export default function CreatePostScreen() {
  const router = useRouter();
  const { status } = useLocalSearchParams<{ status?: string }>();
  const isPending = status === "pending";

  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Running");

  return (
    <View style={{ flex: 1, backgroundColor: "#000", paddingTop: 60 }}>
      {/* ================= HEADER ================= */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Cancel</Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          New Post
        </Text>

        <TouchableOpacity
          disabled={isPending || content.trim().length === 0}
          style={{
            opacity:
              isPending || content.trim().length === 0 ? 0.4 : 1,
          }}
        >
          <Text style={{ color: "#8B5CF6", fontSize: 18, fontWeight: "600" }}>
            Post
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= PENDING NOTICE ================= */}
      {isPending && (
        <View
          style={{
            backgroundColor: "#111",
            padding: 14,
            marginHorizontal: 16,
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", marginBottom: 4 }}>
            Verification required
          </Text>
          <Text style={{ color: "#aaa", fontSize: 13 }}>
            You’ll be able to post once your student ID is approved.
          </Text>
        </View>
      )}

      {/* ================= INPUT ================= */}
      <TextInput
        multiline
        editable={!isPending}
        placeholder="What’s happening on your campus?"
        placeholderTextColor="#666"
        value={content}
        onChangeText={setContent}
        style={{
          color: "#fff",
          fontSize: 16,
          paddingHorizontal: 16,
          paddingTop: 12,
          minHeight: 160,
          textAlignVertical: "top",
        }}
      />

      {/* ================= CATEGORY PICKER ================= */}
      <View style={{ marginTop: 16 }}>
        <Text
          style={{
            color: "#aaa",
            fontSize: 13,
            marginLeft: 16,
            marginBottom: 8,
          }}
        >
          Category
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {CATEGORIES.map((cat) => {
            const active = cat === category;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                disabled={isPending}
                style={{
                  marginRight: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 20,
                  backgroundColor: active ? "#8B5CF6" : "#111",
                }}
              >
                <Text
                  style={{
                    color: active ? "#fff" : "#aaa",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
