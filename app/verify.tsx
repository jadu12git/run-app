import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function VerifyScreen() {
  const router = useRouter();
  const [idImage, setIdImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  /* ---------- Camera ---------- */
  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
    }
  };

  /* ---------- Gallery ---------- */
  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
    }
  };

  /* ---------- Submit ---------- */
  const submitForReview = async () => {
    setSubmitting(true);

    // 🚧 Backend will go here later (upload + status update)

    setTimeout(() => {
        router.replace("pending");
    }, 800);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 24,
        paddingTop: 80,
      }}
    >
      {/* Title */}
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Verify your student status
      </Text>

      <Text
        style={{
          color: "#aaa",
          fontSize: 16,
          marginBottom: 32,
        }}
      >
        Upload a clear photo of your valid student ID. This is used only for
        verification and is never shown publicly.
      </Text>

      {/* ---------- PREVIEW / CAPTURE AREA ---------- */}
      {!idImage ? (
        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#333",
            backgroundColor: "#111",
            padding: 20,
            marginBottom: 32,
          }}
        >
          <TouchableOpacity
            onPress={takePhoto}
            style={{
              backgroundColor: "#fff",
              paddingVertical: 14,
              borderRadius: 30,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold" }}>
              Take photo with camera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickFromGallery}
            style={{
              backgroundColor: "#222",
              paddingVertical: 14,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Upload from gallery
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Preview */}
          <Image
            source={{ uri: idImage }}
            style={{
              width: "100%",
              height: 220,
              borderRadius: 16,
              marginBottom: 24,
            }}
            resizeMode="cover"
          />

          {/* Actions */}
          <TouchableOpacity
            onPress={() => setIdImage(null)}
            style={{
              backgroundColor: "#222",
              paddingVertical: 14,
              borderRadius: 30,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Retake / choose another
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={submitting}
            onPress={submitForReview}
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
              {submitting ? "Submitting…" : "Submit for review"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
