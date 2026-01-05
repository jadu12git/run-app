import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type Tab = "new" | "trending";

const MOCK_POSTS = [
  {
    id: "1",
    content: "Why do lectures always get cancelled right before exams?",
    votes: 42,
  },
  {
    id: "2",
    content: "Legon students, where do you eat after 10pm?",
    votes: 67,
  },
  {
    id: "3",
    content: "Group projects are the biggest scam in university.",
    votes: 120,
  },
];

export default function FeedScreen() {
  const { status } = useLocalSearchParams<{ status?: string }>();
  const isPending = status === "pending";

  const [activeTab, setActiveTab] = useState<Tab>("new");

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* ---------- HEADER ---------- */}
      <View
        style={{
          paddingTop: 60,
          paddingHorizontal: 24,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#111",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>
          Feed
        </Text>

        {/* Tabs */}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {["new", "trending"].map((tab) => {
            const isActive = activeTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as Tab)}
                style={{
                  marginRight: 24,
                  paddingBottom: 8,
                  borderBottomWidth: 2,
                  borderBottomColor: isActive ? "#fff" : "transparent",
                }}
              >
                <Text
                  style={{
                    color: isActive ? "#fff" : "#777",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {tab === "new" ? "New" : "Trending"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ---------- PENDING NOTICE ---------- */}
      {isPending && (
        <View
          style={{
            backgroundColor: "#111",
            padding: 16,
            margin: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", marginBottom: 6 }}>
            Verification in progress
          </Text>
          <Text style={{ color: "#aaa", fontSize: 14 }}>
            You can read posts, but you’ll be able to post once your student ID
            is approved.
          </Text>
        </View>
      )}

      {/* ---------- POSTS ---------- */}
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#111",
              borderRadius: 16,
              padding: 16,
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                lineHeight: 22,
                marginBottom: 12,
              }}
            >
              {item.content}
            </Text>

            <Text style={{ color: "#777", fontSize: 13 }}>
              ▲ {item.votes} upvotes
            </Text>
          </View>
        )}
      />

      {/* ---------- CREATE POST CTA ---------- */}
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 24,
        }}
      >
        <TouchableOpacity
          disabled={isPending}
          style={{
            backgroundColor: isPending ? "#333" : "#fff",
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: isPending ? "#777" : "#000",
              fontSize: 32,
              fontWeight: "bold",
              marginTop: -2,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
