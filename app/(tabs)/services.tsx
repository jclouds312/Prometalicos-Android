import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Colors from "@/constants/colors";
import { services, companyInfo } from "@/constants/data";

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <View style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <View style={styles.serviceIconContainer}>
          <Ionicons name={service.icon as any} size={26} color={Colors.green} />
        </View>
        <Text style={styles.serviceName}>{service.name}</Text>
      </View>
      <Text style={styles.serviceDescription}>{service.description}</Text>
      <View style={styles.serviceDetails}>
        {service.details.map((detail, idx) => (
          <View key={idx} style={styles.detailRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.green} />
            <Text style={styles.detailText}>{detail}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function AdvantageItem({ text, index }: { text: string; index: number }) {
  return (
    <View style={styles.advantageItem}>
      <View style={styles.advantageNumber}>
        <Text style={styles.advantageNumberText}>{String(index + 1).padStart(2, '0')}</Text>
      </View>
      <Text style={styles.advantageText}>{text}</Text>
    </View>
  );
}

export default function ServicesScreen() {
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
        colors={[Colors.primary, Colors.primaryLight]}
        style={[styles.header, { paddingTop: insets.top + webTopInset + 16 }]}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Servicios</Text>
            <Text style={styles.headerSubtitle}>
              Soluciones integrales para su operacion
            </Text>
          </View>
          <View style={styles.headerBadge}>
            <Ionicons name="construct" size={18} color={Colors.accent} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{companyInfo.stats.maintenances}</Text>
          <Text style={styles.statLabel}>Mantenimientos</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{companyInfo.stats.consultations}</Text>
          <Text style={styles.statLabel}>Asesorias</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{companyInfo.stats.projects}</Text>
          <Text style={styles.statLabel}>Proyectos</Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>Sobre SOFTGAN</Text>
        <Text style={styles.aboutText}>
          SOFTGAN ofrece soluciones integrales para la industria carnica, lactea y ganadera. Desde basculas ganaderas y camioneras hasta equipos de ordeño, esterilizacion y cuartos frios.
        </Text>
        <Text style={styles.aboutText}>
          Contamos con un equipo tecnico especializado y ofrecemos garantia de 36 meses por defectos de fabricacion en todos nuestros equipos, con disponibilidad de repuestos de por vida.
        </Text>
      </View>

      <View style={styles.advantagesSection}>
        <Text style={styles.advantagesSectionTitle}>Nuestras Ventajas</Text>
        {companyInfo.advantages.map((adv, idx) => (
          <AdvantageItem key={idx} text={adv} index={idx} />
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [styles.contactCta, { opacity: pressed ? 0.9 : 1 }]}
        onPress={() => router.push("/(tabs)/contact")}
      >
        <LinearGradient
          colors={[Colors.accent, Colors.accentLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.contactCtaGradient}
        >
          <Ionicons name="logo-whatsapp" size={24} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.contactCtaTitle}>Necesita un Servicio?</Text>
            <Text style={styles.contactCtaSubtitle}>Escriba a nuestra asesora Carolina</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={Colors.primary} />
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.white,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 20,
  },
  headerBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(232, 166, 35, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: -14,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.green,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 4,
  },
  servicesContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  serviceCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "rgba(39, 174, 96, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceName: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    color: Colors.text,
    flex: 1,
  },
  serviceDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  serviceDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.text,
    flex: 1,
  },
  aboutSection: {
    marginHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  aboutSectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.white,
    marginBottom: 12,
  },
  aboutText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 22,
    marginBottom: 10,
  },
  advantagesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  advantagesSectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.text,
    marginBottom: 16,
  },
  advantageItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
    backgroundColor: Colors.cardBg,
    padding: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  advantageNumber: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  advantageNumberText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.accent,
  },
  advantageText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  contactCta: {
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 24,
  },
  contactCtaGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 14,
  },
  contactCtaTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.primary,
  },
  contactCtaSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(27, 58, 45, 0.6)",
  },
});
