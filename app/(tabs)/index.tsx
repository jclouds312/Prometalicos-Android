import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Colors from "@/constants/colors";
import { categories, companyInfo } from "@/constants/data";

const { width } = Dimensions.get("window");

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function CategoryCard({ item, onPress }: { item: typeof categories[0]; onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.categoryCard, { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
      onPress={onPress}
    >
      <View style={styles.categoryIconContainer}>
        <Ionicons name={item.icon as any} size={28} color={Colors.accent} />
      </View>
      <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.categoryDesc} numberOfLines={2}>{item.description}</Text>
      <View style={styles.categoryFooter}>
        <Text style={styles.categoryCount}>{item.productCount} productos</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.accent} />
      </View>
    </Pressable>
  );
}

function QuickActionButton({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.quickAction, { opacity: pressed ? 0.85 : 1 }]}
      onPress={onPress}
    >
      <View style={styles.quickActionIcon}>
        <Ionicons name={icon as any} size={22} color={Colors.white} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });

  if (!fontsLoaded) return null;

  const webTopInset = Platform.OS === "web" ? 67 : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight, '#1E3A5F']}
        style={[styles.heroSection, { paddingTop: insets.top + webTopInset + 20 }]}
      >
        <View style={styles.heroTopRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="scale" size={20} color={Colors.accent} />
          </View>
          <Text style={styles.heroCompanyName}>PROMETALICOS</Text>
        </View>
        <Text style={styles.heroTitle}>Expertos en{'\n'}Pesaje y Control</Text>
        <Text style={styles.heroSubtitle}>
          Mas de 50 años diseñando y fabricando soluciones de pesaje industrial en Colombia
        </Text>
        <View style={styles.heroStatsRow}>
          <StatCard value="50+" label="Años" />
          <StatCard value="ISO" label="Certificados" />
          <StatCard value="ONAC" label="Acreditados" />
        </View>
      </LinearGradient>

      <View style={styles.quickActionsContainer}>
        <QuickActionButton
          icon="call"
          label="Llamar"
          onPress={() => router.push("/(tabs)/contact")}
        />
        <QuickActionButton
          icon="chatbubble-ellipses"
          label="WhatsApp"
          onPress={() => router.push("/(tabs)/contact")}
        />
        <QuickActionButton
          icon="document-text"
          label="Cotizar"
          onPress={() => router.push("/(tabs)/contact")}
        />
        <QuickActionButton
          icon="cube"
          label="Tienda"
          onPress={() => router.push("/(tabs)/products")}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <Pressable onPress={() => router.push("/(tabs)/products")}>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              item={cat}
              onPress={() => router.push({ pathname: "/(tabs)/products", params: { category: cat.id } })}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sectores que Atendemos</Text>
        <View style={styles.sectorsGrid}>
          {companyInfo.sectors.map((sector, idx) => (
            <View key={idx} style={styles.sectorChip}>
              <View style={styles.sectorDot} />
              <Text style={styles.sectorText}>{sector}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.ctaCard, { opacity: pressed ? 0.9 : 1 }]}
        onPress={() => router.push("/(tabs)/contact")}
      >
        <LinearGradient
          colors={[Colors.accent, Colors.accentLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaGradient}
        >
          <View style={styles.ctaContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>Solicite una Cotizacion</Text>
              <Text style={styles.ctaSubtitle}>Nuestros asesores le ayudaran a encontrar la solucion ideal</Text>
            </View>
            <View style={styles.ctaIconContainer}>
              <Ionicons name="arrow-forward" size={24} color={Colors.primary} />
            </View>
          </View>
        </LinearGradient>
      </Pressable>

      <View style={styles.certSection}>
        <Text style={styles.certTitle}>Certificaciones</Text>
        <View style={styles.certGrid}>
          {companyInfo.certifications.slice(0, 4).map((cert, idx) => (
            <View key={idx} style={styles.certBadge}>
              <Ionicons name="shield-checkmark" size={18} color={Colors.success} />
              <Text style={styles.certText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(232, 166, 35, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCompanyName: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.accent,
    letterSpacing: 3,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    color: Colors.white,
    lineHeight: 40,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 22,
    marginBottom: 24,
  },
  heroStatsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.accent,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
  quickActionsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginTop: -20,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  quickActionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.darkGray,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  seeAllText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.accent,
  },
  categoriesScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    gap: 12,
  },
  categoryCard: {
    width: width * 0.42,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(232, 166, 35, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  categoryDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: 10,
  },
  categoryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryCount: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.accent,
  },
  sectorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 8,
  },
  sectorChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  sectorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  sectorText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.text,
  },
  ctaCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 24,
  },
  ctaGradient: {
    padding: 20,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  ctaTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 4,
  },
  ctaSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(10, 22, 40, 0.7)",
    lineHeight: 18,
  },
  ctaIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(10, 22, 40, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  certSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  certTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.text,
    marginBottom: 14,
  },
  certGrid: {
    gap: 10,
  },
  certBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.cardBg,
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  certText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.text,
  },
});
