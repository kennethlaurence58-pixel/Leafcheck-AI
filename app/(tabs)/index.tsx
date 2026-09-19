import { BottomNav } from "@/components/bottom-nav";
import { GreetingHeader } from "@/components/greeting-header";
import { MetricCard } from "@/components/metric-card";
import { PlantOverviewCard } from "@/components/plant-overview-card";
import { usePlantData } from "@/context/plant-data";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const data = usePlantData();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.topBackground} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 120 }]}
      >
        <GreetingHeader />

        <PlantOverviewCard />

        <View style={styles.aiEstimatesContainer}>
          <Text style={styles.sectionTitle}>AI Estimates</Text>

          <View style={styles.metricsGrid}>
          <MetricCard
            title="Soil Moisture"
            value={data.soilMoisture}
            unit="%"
            status="healthy"
            onPress={() => undefined}
          />
          <MetricCard title="Soil pH" value={data.soilPh} unit="" status="healthy" onPress={() => undefined} />
          <MetricCard
            title="Temperature"
            value={data.temperature}
            unit=""
            status="healthy"
            onPress={() => undefined}
          />
          <MetricCard
            title="Recent Alerts"
            value={data.recentAlerts}
            unit=""
            status={data.recentAlerts > 2 ? "critical" : data.recentAlerts > 0 ? "warning" : "healthy"}
            onPress={() => undefined}
          />
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  content: {
    flexGrow: 1,
  },
  topBackground: {
    position: "absolute",
    top: 0,
    width: 476,
    height: 263,
    left: "50%",
    marginLeft: -238,
    backgroundColor: "#2F8135",
    borderBottomLeftRadius: 112,
    borderBottomRightRadius: 112,
  },
  aiEstimatesContainer: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#25B853",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B1B1B",
    marginBottom: 14,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },
});
