import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  LayoutChangeEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View
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
  const router = useRouter();
  const categoryScrollRef = useRef<ScrollView>(null);

  const [activeCategory, setActiveCategory] = useState("Running");
  const [feedMode, setFeedMode] = useState<"forYou" | "school">("forYou");

  const underlineX = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;

  const onCategoryPress = (cat: string) => {
    setActiveCategory(cat);
    animateUnderline(cat);
    scrollToCategory(cat);
  };
  

  // Store layout info for each category
  const categoryLayouts = useRef<Record<string, { x: number; width: number }>>(
    {}
  ).current;

  const scrollToCategory = (cat: string) => {
  const layout = categoryLayouts[cat];
    if (!layout || !categoryScrollRef.current) return;
  
    // How far from the left we want the item (center-ish)
    const offset = Math.max(layout.x - 100, 0);
  
    categoryScrollRef.current.scrollTo({
      x: offset,
      animated: true,
    });
  };
  

  const animateUnderline = (cat: string) => {
    const layout = categoryLayouts[cat];
    if (!layout) return;

    Animated.parallel([
      Animated.spring(underlineX, {
        toValue: layout.x,
        useNativeDriver: false,
        damping: 18,
        stiffness: 150,
      }),
      Animated.spring(underlineWidth, {
        toValue: layout.width,
        useNativeDriver: false,
        damping: 18,
        stiffness: 150,
      }),
    ]).start();
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* ================= TOP BAR ================= */}
      <View
        style={{
          paddingTop: 55,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT: App Icon */}
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/runicon.png")}
            style={{ width: 32, height: 32, borderRadius: 8 }}
          />
        </TouchableOpacity>

        {/* CENTER: Feed Mode */}
        <View style={{ flexDirection: "row" }}>
          {["forYou", "school"].map((mode) => {
            const active = feedMode === mode;
            return (
              <TouchableOpacity
                key={mode}
                onPress={() => setFeedMode(mode as any)}
                style={{
                  marginHorizontal: 8,
                  paddingBottom: 4,
                  borderBottomWidth: 2,
                  borderBottomColor: active ? "#fff" : "transparent",
                }}
              >
                <Text
                  style={{
                    color: active ? "#fff" : "#777",
                    fontWeight: "600",
                  }}
                >
                  {mode === "forYou" ? "For you" : "My school"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* RIGHT: Messages */}
        <TouchableOpacity onPress={() => router.push("/messages")}>
          <Ionicons name="chatbubble-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ================= CATEGORY BAR ================= */}
      <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#111",
        paddingBottom: 6,
      }}
    >
      <ScrollView
        horizontal
        ref={categoryScrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        <View style={{ flexDirection: "row" }}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => onCategoryPress(cat)}
              onLayout={(e: LayoutChangeEvent) => {
                categoryLayouts[cat] = {
                  x: e.nativeEvent.layout.x,
                  width: e.nativeEvent.layout.width,
                };

                // Initialize underline on first render
                if (cat === activeCategory) {
                  underlineX.setValue(e.nativeEvent.layout.x);
                  underlineWidth.setValue(e.nativeEvent.layout.width);
                }
              }}
              style={{ marginRight: 18 }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: activeCategory === cat ? "700" : "500",
                  color: activeCategory === cat ? "#fff" : "#777",
                  paddingBottom: 6,
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Animated underline */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 12, // matches contentContainer padding
            height: 3,
            backgroundColor: "#8B5CF6", // Fizz-like purple
            transform: [{ translateX: underlineX }],
            width: underlineWidth,
            borderRadius: 2,
          }}
        />
      </ScrollView>
    </View>



      {/* ================= PENDING NOTICE ================= */}
      {isPending && (
      <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
        <View
          style={{
            backgroundColor: "#111",
            padding: 14,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", marginBottom: 4 }}>
            Verification in progress
          </Text>
          <Text style={{ color: "#aaa", fontSize: 13 }}>
            You can browse posts but can’t post until verified.
          </Text>
        </View>
      </View>
)}


      {/* ================= POSTS ================= */}
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
              marginBottom: 20,
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
      {/* ================= CREATE POST BUTTON ================= */}
      <TouchableOpacity
        onPress={() =>
          router.push(`/create-post?status=${isPending ? "pending" : "verified"}`)
        }
        disabled={isPending}
        style={{
          position: "absolute",
          bottom: 24,
          right: 16,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isPending ? "#333" : "#8B5CF6",
          paddingVertical: 12,
          paddingHorizontal: 18,
          borderRadius: 24,
          opacity: isPending ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontWeight: "600",
            marginRight: 6,
          }}
        >
          + Post
        </Text>
      </TouchableOpacity>

    </View>
  );
}
