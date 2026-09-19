import { Ionicons } from "@expo/vector-icons";
import { usePlantData } from "@/context/plant-data";
import { NativeSyntheticEvent, NativeScrollEvent, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useState } from "react";

export function PlantOverviewCard() {
  const data = usePlantData();
  const { width } = useWindowDimensions();
  const pageWidth = Math.max(280, width - 74);
  const [activePage, setActivePage] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.overviewTitle}>
          <Text style={styles.greenText}>Plant </Text>Overview
        </Text>
        <Text style={styles.subtitle}>From My Spaces</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.plantArtwork}
          contentContainerStyle={styles.carouselContent}
          onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setActivePage(Math.round(event.nativeEvent.contentOffset.x / pageWidth));
          }}
        >
          {[["Balcony", "leaf"], ["Window", "leaf-outline"], ["Garden", "flower-outline"]].map(([name, icon]) => (
            <View key={name} style={[styles.carouselPage, { width: pageWidth }]}>
              <Ionicons name={icon as "leaf"} size={125} color="#2D7D3D" />
              <Text style={styles.balcony}>{name}</Text>
              <View style={styles.statusBadge}>
                <View><Text style={styles.statusLabel}>Healthy</Text><Text style={styles.statusValue}>{data.healthy}</Text></View>
                <View><Text style={styles.statusLabel}>Needs Care</Text><Text style={[styles.statusValue, { color: "#F4A900" }]}>{data.needsCare}</Text></View>
                <View><Text style={styles.statusLabel}>Critical</Text><Text style={[styles.statusValue, { color: "#E53935" }]}>{data.critical}</Text></View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.carouselDots}>
          {[0, 1, 2].map((page) => (
            <View key={page} style={[styles.carouselDot, page === activePage && styles.carouselDotActive]} />
          ))}
        </View>
        <View style={styles.healthRow}>
          <View style={styles.healthHeader}>
            <Text style={styles.healthLabel}>Overall Health</Text>
            <Text style={styles.healthPercent}>{data.overallHealth}%</Text>
          </View>
          <View style={styles.healthTrack}>
            <View style={[styles.healthProgress, { width: `${data.overallHealth}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#25B853",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
    height: 300,
    padding: 17,
    backgroundColor: "#FFFFFF",
  },
  overviewTitle: { fontSize: 18, fontWeight: "700", color: "#111111" },
  greenText: { color: "#25A84A" },
  subtitle: { fontSize: 12, color: "#777777", marginBottom: 7 },
  plantArtwork: { flex: 1, backgroundColor: "#DEDEDD", borderRadius: 24, overflow: "hidden" },
  carouselContent: { flexGrow: 1 },
  carouselPage: { justifyContent: "center", alignItems: "center", position: "relative" },
  balcony: { position: "absolute", left: 13, bottom: 11, fontSize: 18, color: "#FFFFFF", fontWeight: "700" },
  statusBadge: { position: "absolute", right: 7, bottom: 7, width: 170, height: 35, backgroundColor: "#FFFFFF", paddingHorizontal: 8, borderRadius: 18, flexDirection: "row", justifyContent: "space-around", alignItems: "center", elevation: 3 },
  statusValue: { color: "#20B64D", fontSize: 14, lineHeight: 15, fontWeight: "700", textAlign: "center" },
  statusLabel: { color: "#111111", fontSize: 7, lineHeight: 8, textAlign: "center" },
  carouselDots: { position: "absolute", bottom: 29, left: 0, right: 0, flexDirection: "row", justifyContent: "center", gap: 6 },
  carouselDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#D0D0D0" },
  carouselDotActive: { backgroundColor: "#20B64D" },
  healthRow: { paddingTop: 6 },
  healthHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  healthLabel: { fontSize: 11, color: "#555555" },
  healthPercent: { fontSize: 11, color: "#20B64D" },
  healthTrack: { height: 7, borderRadius: 3, backgroundColor: "#E5E5E5", marginTop: 3 },
  healthProgress: { height: 7, borderRadius: 3, backgroundColor: "#20B64D" },
});
