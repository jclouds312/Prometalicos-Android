import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Colors from "@/constants/colors";
import { companyInfo } from "@/constants/data";

function TimelineItem({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLine}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineConnector} />
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineYear}>{year}</Text>
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text style={styles.timelineDesc}>{description}</Text>
      </View>
    </View>
  );
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.valueCard}>
      <View style={styles.valueIconContainer}>
        <Ionicons name={icon as any} size={24} color={Colors.accent} />
      </View>
      <Text style={styles.valueTitle}>{title}</Text>
      <Text style={styles.valueDesc}>{description}</Text>
    </View>
  );
}

function TeamMember({ name, role, icon }: { name: string; role: string; icon: string }) {
  return (
    <View style={styles.teamCard}>
      <View style={styles.teamAvatar}>
        <Ionicons name={icon as any} size={28} color={Colors.primary} />
      </View>
      <Text style={styles.teamName}>{name}</Text>
      <Text style={styles.teamRole}>{role}</Text>
    </View>
  );
}

function CertCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.certCard}>
      <Ionicons name={icon as any} size={22} color={Colors.green} />
      <View style={{ flex: 1 }}>
        <Text style={styles.certTitle}>{title}</Text>
        <Text style={styles.certDesc}>{description}</Text>
      </View>
    </View>
  );
}

export default function AboutScreen() {
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
        colors={[Colors.primary, Colors.primaryLight, '#2A6B4A']}
        style={[styles.header, { paddingTop: insets.top + webTopInset + 16 }]}
      >
        <View style={styles.headerBadgeRow}>
          <View style={styles.headerLogoBadge}>
            <Ionicons name="leaf" size={20} color={Colors.accent} />
          </View>
          <Text style={styles.headerBrand}>SOFTGAN</Text>
        </View>
        <Text style={styles.headerTitle}>Sobre Nosotros</Text>
        <Text style={styles.headerSubtitle}>
          Tecnologia al servicio del campo colombiano
        </Text>
      </LinearGradient>

      <View style={styles.missionSection}>
        <View style={styles.missionCard}>
          <View style={styles.missionIconRow}>
            <View style={[styles.missionIcon, { backgroundColor: 'rgba(39, 174, 96, 0.1)' }]}>
              <Ionicons name="flag" size={22} color={Colors.green} />
            </View>
            <Text style={styles.missionLabel}>Mision</Text>
          </View>
          <Text style={styles.missionText}>
            Ofrecer soluciones integrales de alta calidad para la industria carnica, lactea y ganadera en Colombia, brindando equipos de pesaje, procesamiento y automatizacion con soporte tecnico especializado y garantia extendida.
          </Text>
        </View>

        <View style={styles.missionCard}>
          <View style={styles.missionIconRow}>
            <View style={[styles.missionIcon, { backgroundColor: 'rgba(232, 166, 35, 0.1)' }]}>
              <Ionicons name="eye" size={22} color={Colors.accent} />
            </View>
            <Text style={styles.missionLabel}>Vision</Text>
          </View>
          <Text style={styles.missionText}>
            Ser la empresa lider en soluciones tecnologicas para el sector agropecuario colombiano, reconocida por la innovacion, calidad y compromiso con el desarrollo del campo.
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Nuestros Valores</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.valuesScroll}>
          <ValueCard
            icon="diamond"
            title="Calidad"
            description="Equipos con los mas altos estandares de fabricacion y materiales premium"
          />
          <ValueCard
            icon="shield-checkmark"
            title="Confianza"
            description="Garantia de 36 meses y disponibilidad de repuestos de por vida"
          />
          <ValueCard
            icon="people"
            title="Compromiso"
            description="Atencion personalizada y soporte tecnico continuo post-venta"
          />
          <ValueCard
            icon="bulb"
            title="Innovacion"
            description="Tecnologia de punta aplicada a la industria agropecuaria"
          />
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Nuestra Historia</Text>
        <View style={styles.timelineContainer}>
          <TimelineItem
            year="Inicio"
            title="Fundacion de SOFTGAN"
            description="Nace SOFTGAN con la vision de proveer soluciones tecnologicas para el sector ganadero colombiano."
          />
          <TimelineItem
            year="Crecimiento"
            title="Expansion de Productos"
            description="Ampliacion del portafolio con basculas camioneras, equipos de ordeño y maquinaria para alimento."
          />
          <TimelineItem
            year="Consolidacion"
            title="Cobertura Nacional"
            description="Presencia en todas las regiones ganaderas de Colombia con servicio de instalacion y mantenimiento."
          />
          <TimelineItem
            year="Hoy"
            title="Lider en Soluciones"
            description="Mas de 500 clientes satisfechos, 1,000+ proyectos completados y presencia en toda la cadena carnica y lactea."
          />
        </View>
      </View>

      <View style={styles.statsSection}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryLight]}
          style={styles.statsGradient}
        >
          <Text style={styles.statsTitle}>SOFTGAN en Numeros</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{companyInfo.stats.clients}</Text>
              <Text style={styles.statLabel}>Clientes Satisfechos</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{companyInfo.stats.projects}</Text>
              <Text style={styles.statLabel}>Proyectos Completados</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{companyInfo.stats.maintenances}</Text>
              <Text style={styles.statLabel}>Mantenimientos</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{companyInfo.stats.consultations}</Text>
              <Text style={styles.statLabel}>Asesorias Realizadas</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Nuestro Equipo</Text>
        <View style={styles.teamGrid}>
          <TeamMember name="Equipo Comercial" role="Ventas y Asesoria" icon="people" />
          <TeamMember name="Carolina" role="Asesora Principal" icon="person" />
          <TeamMember name="Equipo Tecnico" role="Instalacion y Soporte" icon="construct" />
          <TeamMember name="Ingenieria" role="Diseño y Desarrollo" icon="cog" />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Certificaciones y Garantias</Text>
        <View style={styles.certsContainer}>
          <CertCard
            icon="shield-checkmark"
            title="Garantia 36 Meses"
            description="Todos nuestros equipos cuentan con garantia de 36 meses por defectos de fabricacion"
          />
          <CertCard
            icon="construct"
            title="Life Warranty en Repuestos"
            description="Disponibilidad de repuestos de por vida para todos nuestros equipos"
          />
          <CertCard
            icon="ribbon"
            title="Certificacion OIML"
            description="Celdas de carga con certificacion internacional OIML para maxima precision"
          />
          <CertCard
            icon="water"
            title="Proteccion IP65 / IP68"
            description="Equipos con proteccion contra polvo y agua para uso en ambientes exigentes"
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sectores que Atendemos</Text>
        <View style={styles.sectorsGrid}>
          {companyInfo.sectors.map((sector, idx) => (
            <View key={idx} style={styles.sectorItem}>
              <View style={styles.sectorBullet}>
                <Ionicons name="checkmark" size={12} color={Colors.white} />
              </View>
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
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Trabajemos Juntos</Text>
            <Text style={styles.ctaSubtitle}>Contacte a nuestra asesora Carolina para una solucion a su medida</Text>
          </View>
          <View style={styles.ctaIcon}>
            <Ionicons name="arrow-forward" size={20} color={Colors.primary} />
          </View>
        </LinearGradient>
      </Pressable>

      <View style={styles.footerSection}>
        <View style={styles.footerInfo}>
          <View style={styles.footerRow}>
            <Ionicons name="globe" size={16} color={Colors.mediumGray} />
            <Text style={styles.footerText}>{companyInfo.website}</Text>
          </View>
          <View style={styles.footerRow}>
            <Ionicons name="mail" size={16} color={Colors.mediumGray} />
            <Text style={styles.footerText}>{companyInfo.email}</Text>
          </View>
          <View style={styles.footerRow}>
            <Ionicons name="call" size={16} color={Colors.mediumGray} />
            <Text style={styles.footerText}>{companyInfo.phone}</Text>
          </View>
        </View>
        <View style={styles.footerSocial}>
          <Pressable style={styles.footerSocialBtn} onPress={() => Linking.openURL(`https://www.facebook.com/${companyInfo.facebook}`)}>
            <Ionicons name="logo-facebook" size={20} color={Colors.mediumGray} />
          </Pressable>
          <Pressable style={styles.footerSocialBtn} onPress={() => Linking.openURL(`https://www.instagram.com/${companyInfo.instagram}/`)}>
            <Ionicons name="logo-instagram" size={20} color={Colors.mediumGray} />
          </Pressable>
          <Pressable style={styles.footerSocialBtn} onPress={() => Linking.openURL(`https://www.youtube.com/@${companyInfo.youtube}`)}>
            <Ionicons name="logo-youtube" size={20} color={Colors.mediumGray} />
          </Pressable>
        </View>
        <Text style={styles.footerCopyright}>SOFTGAN - Todos los derechos reservados</Text>
      </View>
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
    paddingBottom: 30,
  },
  headerBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  headerLogoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(232, 166, 35, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBrand: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.accent,
    letterSpacing: 4,
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
  },
  missionSection: {
    paddingHorizontal: 20,
    marginTop: -14,
    gap: 12,
    marginBottom: 24,
  },
  missionCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  missionIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  missionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  missionLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.text,
  },
  missionText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  valuesScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    gap: 12,
  },
  valueCard: {
    width: 160,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  valueIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(232, 166, 35, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  valueTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: Colors.text,
    marginBottom: 4,
  },
  valueDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  timelineContainer: {
    paddingHorizontal: 20,
  },
  timelineItem: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 4,
  },
  timelineLine: {
    alignItems: "center",
    width: 20,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.green,
    marginTop: 4,
  },
  timelineConnector: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.lightGray,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  timelineYear: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.accent,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    marginBottom: 4,
  },
  timelineTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: Colors.text,
    marginBottom: 4,
  },
  timelineDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  statsSection: {
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 24,
  },
  statsGradient: {
    padding: 24,
  },
  statsTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statBox: {
    width: "47%" as any,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statNumber: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: Colors.accent,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 4,
  },
  teamGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  teamCard: {
    width: "47%" as any,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  teamAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(232, 166, 35, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  teamName: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 2,
  },
  teamRole: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  certsContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  certCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  certTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  certDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  sectorsGrid: {
    paddingHorizontal: 20,
    gap: 8,
  },
  sectorItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.cardBg,
    padding: 12,
    borderRadius: 10,
  },
  sectorBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  sectorText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  ctaCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 24,
  },
  ctaGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 14,
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
    color: "rgba(27, 58, 45, 0.6)",
    lineHeight: 18,
  },
  ctaIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(27, 58, 45, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  footerSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    alignItems: "center",
  },
  footerInfo: {
    gap: 8,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.mediumGray,
  },
  footerSocial: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
  },
  footerSocialBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  footerCopyright: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.mediumGray,
  },
});
