import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Colors from "@/constants/colors";
import { categories, products, companyInfo } from "@/constants/data";

const { width } = Dimensions.get("window");

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={18} color={Colors.accent} style={{ marginBottom: 4 }} />
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
        <Ionicons name={item.icon as any} size={26} color={Colors.accent} />
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

function FeaturedProductCard({ item }: { item: typeof products[0] }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.featuredCard, { opacity: pressed ? 0.9 : 1 }]}
      onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } })}
    >
      <View style={styles.featuredIconBox}>
        <Ionicons name={item.icon as any} size={28} color={Colors.green} />
      </View>
      <Text style={styles.featuredCategory}>{item.category}</Text>
      <Text style={styles.featuredName} numberOfLines={2}>{item.name}</Text>
      <View style={styles.featuredBadge}>
        <Ionicons name="shield-checkmark" size={10} color={Colors.green} />
        <Text style={styles.featuredBadgeText}>36 meses gtia</Text>
      </View>
    </Pressable>
  );
}

function TestimonialCard({ name, text, role }: { name: string; text: string; role: string }) {
  return (
    <View style={styles.testimonialCard}>
      <View style={styles.testimonialQuote}>
        <Ionicons name="chatbubble-ellipses" size={18} color={Colors.accent} />
      </View>
      <Text style={styles.testimonialText}>{text}</Text>
      <View style={styles.testimonialAuthor}>
        <View style={styles.testimonialAvatar}>
          <Ionicons name="person" size={16} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.testimonialName}>{name}</Text>
          <Text style={styles.testimonialRole}>{role}</Text>
        </View>
      </View>
    </View>
  );
}

function QuickActionButton({ icon, label, onPress, color }: { icon: string; label: string; onPress: () => void; color?: string }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.quickAction, { opacity: pressed ? 0.85 : 1 }]}
      onPress={onPress}
    >
      <View style={[styles.quickActionIcon, color ? { backgroundColor: color } : {}]}>
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

  const featuredProducts = [
    products.find(p => p.id === 'kit-ganadero'),
    products.find(p => p.id === 'camionera-puente'),
    products.find(p => p.id === 'brete-inoxidable'),
    products.find(p => p.id === 'ordeno-mecanico'),
    products.find(p => p.id === 'cuarto-frio'),
  ].filter(Boolean) as typeof products;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight, '#2A6B4A']}
        style={[styles.heroSection, { paddingTop: insets.top + webTopInset + 20 }]}
      >
        <View style={styles.heroTopRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="leaf" size={18} color={Colors.accent} />
          </View>
          <Text style={styles.heroCompanyName}>SOFTGAN</Text>
        </View>
        <Text style={styles.heroTitle}>Soluciones para{'\n'}el Campo</Text>
        <Text style={styles.heroSubtitle}>
          Industria carnica, lactea y ganadera. Basculas, bretes, ordeños y mucho mas.
        </Text>
        <View style={styles.heroStatsRow}>
          <StatCard value={companyInfo.stats.clients} label="Clientes" icon="people" />
          <StatCard value={companyInfo.stats.projects} label="Proyectos" icon="checkmark-done" />
          <StatCard value="36" label="Meses Gtia" icon="shield-checkmark" />
        </View>
      </LinearGradient>

      <View style={styles.quickActionsContainer}>
        <QuickActionButton icon="logo-whatsapp" label="WhatsApp" color={Colors.whatsapp} onPress={() => {
          const text = encodeURIComponent('Hola Carolina, me gustaria recibir informacion sobre sus productos.');
          Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${text}`);
        }} />
        <QuickActionButton icon="call" label="Llamar" color={Colors.green} onPress={() => Linking.openURL(`tel:${companyInfo.phone.replace(/\s/g, '')}`)} />
        <QuickActionButton icon="document-text" label="Cotizar" color={Colors.accent} onPress={() => router.push("/(tabs)/contact")} />
        <QuickActionButton icon="cube" label="Productos" color={Colors.primary} onPress={() => router.push("/(tabs)/products")} />
      </View>

      <View style={styles.promoBanner}>
        <LinearGradient
          colors={[Colors.accent, Colors.accentLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.promoGradient}
        >
          <View style={styles.promoContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTag}>DESTACADO</Text>
              <Text style={styles.promoTitle}>Basculas con Garantia de 36 Meses</Text>
              <Text style={styles.promoDesc}>Life Warranty en repuestos. Despacho a todo Colombia.</Text>
            </View>
            <Pressable
              style={styles.promoBtn}
              onPress={() => router.push({ pathname: "/(tabs)/products", params: { category: 'ganaderas' } })}
            >
              <Text style={styles.promoBtnText}>Ver</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Productos Destacados</Text>
          <Pressable onPress={() => router.push("/(tabs)/products")}>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
          {featuredProducts.map((p) => (
            <FeaturedProductCard key={p.id} item={p} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <Pressable onPress={() => router.push("/(tabs)/products")}>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} item={cat} onPress={() => router.push({ pathname: "/(tabs)/products", params: { category: cat.id } })} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.servicesPreview}>
        <Text style={styles.sectionTitleCenter}>Nuestros Servicios</Text>
        <View style={styles.servicesGrid}>
          {[
            { icon: 'cart', label: 'Venta', color: Colors.green },
            { icon: 'construct', label: 'Instalacion', color: Colors.accent },
            { icon: 'build', label: 'Mantenimiento', color: Colors.primary },
            { icon: 'analytics', label: 'Calibracion', color: '#3498DB' },
            { icon: 'school', label: 'Asesoria', color: '#9B59B6' },
            { icon: 'business', label: 'Obra Civil', color: '#E67E22' },
          ].map((svc, idx) => (
            <Pressable
              key={idx}
              style={({ pressed }) => [styles.servicePreviewItem, { opacity: pressed ? 0.85 : 1 }]}
              onPress={() => router.push("/(tabs)/services")}
            >
              <View style={[styles.servicePreviewIcon, { backgroundColor: `${svc.color}15` }]}>
                <Ionicons name={svc.icon as any} size={22} color={svc.color} />
              </View>
              <Text style={styles.servicePreviewLabel}>{svc.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitleCenter}>Lo que Dicen Nuestros Clientes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.testimonialScroll}>
          <TestimonialCard
            name="Carlos M."
            role="Ganadero - Antioquia"
            text="Las basculas de SOFTGAN son excelentes. Llevamos 3 años sin ninguna falla. El servicio tecnico es rapido y eficiente."
          />
          <TestimonialCard
            name="Maria L."
            role="Finca La Esperanza"
            text="Instalaron todo el sistema de ordeño y la bascula. Muy profesionales. La garantia de 36 meses nos dio mucha tranquilidad."
          />
          <TestimonialCard
            name="Jorge R."
            role="Planta de Lacteos - Boyaca"
            text="Los cuartos frios y el esterilizador funcionan perfecto. El equipo de Carolina nos asesoro muy bien en todo el proceso."
          />
        </ScrollView>
      </View>

      <View style={styles.advantagesSection}>
        <Text style={styles.sectionTitleCenter}>Por que Elegirnos</Text>
        {companyInfo.advantages.map((adv, idx) => (
          <View key={idx} style={styles.advantageRow}>
            <View style={styles.advantageCheck}>
              <Ionicons name="checkmark" size={14} color={Colors.white} />
            </View>
            <Text style={styles.advantageText}>{adv}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [styles.ctaCard, { opacity: pressed ? 0.9 : 1 }]}
        onPress={() => router.push("/(tabs)/contact")}
      >
        <LinearGradient
          colors={[Colors.whatsapp, '#20BD57']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaGradient}
        >
          <View style={styles.ctaContent}>
            <Ionicons name="logo-whatsapp" size={28} color={Colors.white} />
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>Solicite una Cotizacion</Text>
              <Text style={styles.ctaSubtitle}>Nuestra asesora Carolina le atendera por WhatsApp</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </View>
        </LinearGradient>
      </Pressable>

      <View style={styles.socialSection}>
        <Text style={styles.socialTitle}>Siguenos en Redes</Text>
        <View style={styles.socialRow}>
          <Pressable style={[styles.socialBtn, { backgroundColor: '#1877F2' }]} onPress={() => Linking.openURL(`https://www.facebook.com/${companyInfo.facebook}`)}>
            <Ionicons name="logo-facebook" size={22} color={Colors.white} />
          </Pressable>
          <Pressable style={[styles.socialBtn, { backgroundColor: '#E4405F' }]} onPress={() => Linking.openURL(`https://www.instagram.com/${companyInfo.instagram}/`)}>
            <Ionicons name="logo-instagram" size={22} color={Colors.white} />
          </Pressable>
          <Pressable style={[styles.socialBtn, { backgroundColor: '#FF0000' }]} onPress={() => Linking.openURL(`https://www.youtube.com/@${companyInfo.youtube}`)}>
            <Ionicons name="logo-youtube" size={22} color={Colors.white} />
          </Pressable>
          <Pressable style={[styles.socialBtn, { backgroundColor: Colors.whatsapp }]} onPress={() => {
            const text = encodeURIComponent('Hola Carolina, me gustaria recibir informacion.');
            Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${text}`);
          }}>
            <Ionicons name="logo-whatsapp" size={22} color={Colors.white} />
          </Pressable>
        </View>
      </View>

      <View style={styles.footerSection}>
        <Text style={styles.footerBrand}>SOFTGAN</Text>
        <Text style={styles.footerTagline}>{companyInfo.tagline}</Text>
        <Text style={styles.footerCopyright}>Todos los derechos reservados</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  heroSection: { paddingHorizontal: 20, paddingBottom: 30 },
  heroTopRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
  logoBadge: { width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(232, 166, 35, 0.15)", alignItems: "center", justifyContent: "center" },
  heroCompanyName: { fontFamily: "Inter_700Bold", fontSize: 18, color: Colors.accent, letterSpacing: 4 },
  heroTitle: { fontFamily: "Inter_700Bold", fontSize: 32, color: Colors.white, lineHeight: 40, marginBottom: 12 },
  heroSubtitle: { fontFamily: "Inter_400Regular", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 22, marginBottom: 24 },
  heroStatsRow: { flexDirection: "row", gap: 12 },
  statCard: { flex: 1, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 14, padding: 12, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  statValue: { fontFamily: "Inter_700Bold", fontSize: 20, color: Colors.accent },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 },
  quickActionsContainer: { flexDirection: "row", paddingHorizontal: 20, gap: 12, marginTop: -20, marginBottom: 20 },
  quickAction: { flex: 1, alignItems: "center", gap: 6 },
  quickActionIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  quickActionLabel: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: Colors.darkGray },
  promoBanner: { marginHorizontal: 20, borderRadius: 16, overflow: "hidden", marginBottom: 24 },
  promoGradient: { padding: 18 },
  promoContent: { flexDirection: "row", alignItems: "center", gap: 14 },
  promoTag: { fontFamily: "Inter_700Bold", fontSize: 10, color: Colors.primary, letterSpacing: 2, marginBottom: 4 },
  promoTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: Colors.primary, marginBottom: 4 },
  promoDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: "rgba(27, 58, 45, 0.6)", lineHeight: 16 },
  promoBtn: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(27, 58, 45, 0.1)", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  promoBtnText: { fontFamily: "Inter_700Bold", fontSize: 14, color: Colors.primary },
  sectionContainer: { marginBottom: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 20, color: Colors.text },
  sectionTitleCenter: { fontFamily: "Inter_700Bold", fontSize: 20, color: Colors.text, textAlign: "center", marginBottom: 14, paddingHorizontal: 20 },
  seeAllText: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: Colors.accent },
  featuredScroll: { paddingLeft: 20, paddingRight: 8, gap: 12 },
  featuredCard: { width: width * 0.38, backgroundColor: Colors.cardBg, borderRadius: 16, padding: 14, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  featuredIconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: "rgba(39, 174, 96, 0.08)", alignItems: "center", justifyContent: "center", marginBottom: 10 },
  featuredCategory: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: Colors.green, textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 4 },
  featuredName: { fontFamily: "Inter_700Bold", fontSize: 13, color: Colors.text, marginBottom: 8 },
  featuredBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(39, 174, 96, 0.08)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: "flex-start" },
  featuredBadgeText: { fontFamily: "Inter_400Regular", fontSize: 9, color: Colors.green },
  categoriesScroll: { paddingLeft: 20, paddingRight: 8, gap: 12 },
  categoryCard: { width: width * 0.42, backgroundColor: Colors.cardBg, borderRadius: 16, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  categoryIconContainer: { width: 48, height: 48, borderRadius: 14, backgroundColor: "rgba(232, 166, 35, 0.1)", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  categoryName: { fontFamily: "Inter_700Bold", fontSize: 14, color: Colors.text, marginBottom: 4 },
  categoryDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: Colors.textSecondary, lineHeight: 16, marginBottom: 10 },
  categoryFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  categoryCount: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: Colors.accent },
  servicesPreview: { marginBottom: 24, paddingHorizontal: 20 },
  servicesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  servicePreviewItem: { width: "30%" as any, alignItems: "center", gap: 6 },
  servicePreviewIcon: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  servicePreviewLabel: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: Colors.darkGray, textAlign: "center" },
  testimonialScroll: { paddingLeft: 20, paddingRight: 8, gap: 12 },
  testimonialCard: { width: width * 0.72, backgroundColor: Colors.cardBg, borderRadius: 16, padding: 18, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  testimonialQuote: { marginBottom: 10 },
  testimonialText: { fontFamily: "Inter_400Regular", fontSize: 14, color: Colors.text, lineHeight: 22, marginBottom: 14, fontStyle: "italic" as const },
  testimonialAuthor: { flexDirection: "row", alignItems: "center", gap: 10 },
  testimonialAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(232, 166, 35, 0.1)", alignItems: "center", justifyContent: "center" },
  testimonialName: { fontFamily: "Inter_700Bold", fontSize: 13, color: Colors.text },
  testimonialRole: { fontFamily: "Inter_400Regular", fontSize: 11, color: Colors.textSecondary },
  advantagesSection: { marginHorizontal: 20, marginBottom: 24 },
  advantageRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10, backgroundColor: Colors.cardBg, padding: 14, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  advantageCheck: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.green, alignItems: "center", justifyContent: "center" },
  advantageText: { fontFamily: "Inter_400Regular", fontSize: 14, color: Colors.text, flex: 1 },
  ctaCard: { marginHorizontal: 20, borderRadius: 18, overflow: "hidden", marginBottom: 24 },
  ctaGradient: { padding: 20 },
  ctaContent: { flexDirection: "row", alignItems: "center", gap: 14 },
  ctaTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: Colors.white, marginBottom: 4 },
  ctaSubtitle: { fontFamily: "Inter_400Regular", fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 18 },
  socialSection: { marginHorizontal: 20, marginBottom: 24 },
  socialTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: Colors.text, marginBottom: 14 },
  socialRow: { flexDirection: "row", gap: 12 },
  socialBtn: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 3 },
  footerSection: { alignItems: "center", paddingVertical: 24, borderTopWidth: 1, borderTopColor: Colors.lightGray, marginHorizontal: 20 },
  footerBrand: { fontFamily: "Inter_700Bold", fontSize: 16, color: Colors.primary, letterSpacing: 4, marginBottom: 6 },
  footerTagline: { fontFamily: "Inter_400Regular", fontSize: 12, color: Colors.textSecondary, textAlign: "center", marginBottom: 4 },
  footerCopyright: { fontFamily: "Inter_400Regular", fontSize: 10, color: Colors.mediumGray },
});
