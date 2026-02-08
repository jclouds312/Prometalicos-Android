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
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Colors from "@/constants/colors";
import { products, companyInfo } from "@/constants/data";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });

  const product = products.find((p) => p.id === id);

  if (!fontsLoaded) return null;

  const webTopInset = Platform.OS === "web" ? 67 : 0;

  if (!product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + webTopInset + 20, alignItems: 'center', justifyContent: 'center' }]}>
        <Ionicons name="alert-circle" size={48} color={Colors.mediumGray} />
        <Text style={styles.notFoundText}>Producto no encontrado</Text>
        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  const handleQuote = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    const text = encodeURIComponent(`Hola Carolina, me gustaria recibir cotizacion del producto: ${product.name}\n\nCategoria: ${product.category}`);
    Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${text}`);
  };

  const handleEmailQuote = () => {
    const subject = encodeURIComponent(`Cotizacion: ${product.name}`);
    const body = encodeURIComponent(`Hola,\n\nMe gustaria recibir cotizacion del siguiente producto:\n\nProducto: ${product.name}\nCategoria: ${product.category}\n\nGracias.`);
    Linking.openURL(`mailto:${companyInfo.email}?subject=${subject}&body=${body}`);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${companyInfo.phone.replace(/\s/g, '')}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryLight, '#2A6B4A']}
          style={[styles.heroSection, { paddingTop: insets.top + webTopInset + 12 }]}
        >
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </Pressable>

          <View style={styles.heroIconContainer}>
            <Ionicons name={product.icon as any} size={56} color={Colors.accent} />
          </View>
          <Text style={styles.heroCategory}>{product.category}</Text>
          <Text style={styles.heroTitle}>{product.name}</Text>
        </LinearGradient>

        <View style={styles.guaranteeBanner}>
          <Ionicons name="shield-checkmark" size={18} color={Colors.green} />
          <Text style={styles.guaranteeText}>Garantia 36 meses por defectos de fabricacion</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.descTitle}>Descripcion</Text>
          <Text style={styles.descText}>{product.description}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.descTitle}>Especificaciones Tecnicas</Text>
          <View style={styles.specsGrid}>
            {product.specs.map((spec, idx) => {
              const parts = spec.split(': ');
              return (
                <View key={idx} style={styles.specCard}>
                  <Text style={styles.specLabel}>{parts[0]}</Text>
                  <Text style={styles.specValue}>{parts[1] || parts[0]}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.descTitle}>Caracteristicas</Text>
          {product.features.map((feat, idx) => (
            <View key={idx} style={styles.featureRow}>
              <View style={styles.featureDot}>
                <Ionicons name="checkmark" size={14} color={Colors.white} />
              </View>
              <Text style={styles.featureText}>{feat}</Text>
            </View>
          ))}
        </View>

        <View style={styles.extraInfoSection}>
          <View style={styles.extraInfoRow}>
            <Ionicons name="construct" size={18} color={Colors.accent} />
            <Text style={styles.extraInfoText}>Disponibilidad de repuestos (Life Warranty)</Text>
          </View>
          <View style={styles.extraInfoRow}>
            <Ionicons name="airplane" size={18} color={Colors.accent} />
            <Text style={styles.extraInfoText}>Despacho a todo Colombia</Text>
          </View>
          <View style={styles.extraInfoRow}>
            <Ionicons name="school" size={18} color={Colors.accent} />
            <Text style={styles.extraInfoText}>Asesoria tecnica incluida</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) + (Platform.OS === 'web' ? 34 : 0) }]}>
        <Pressable
          style={({ pressed }) => [styles.callBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={handleCall}
        >
          <Ionicons name="call" size={20} color={Colors.primary} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.emailBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={handleEmailQuote}
        >
          <Ionicons name="mail" size={20} color={Colors.primary} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.quoteBtn, { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
          onPress={handleQuote}
        >
          <LinearGradient
            colors={[Colors.whatsapp, '#20BD57']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.quoteBtnGradient}
          >
            <Ionicons name="logo-whatsapp" size={20} color={Colors.white} />
            <Text style={styles.quoteBtnText}>Cotizar Ahora</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
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
    alignItems: "center",
  },
  backBtn: {
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  heroIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 26,
    backgroundColor: "rgba(232, 166, 35, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(232, 166, 35, 0.2)",
  },
  heroCategory: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.accent,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.white,
    textAlign: "center",
    lineHeight: 28,
  },
  guaranteeBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginTop: -14,
    backgroundColor: "rgba(39, 174, 96, 0.08)",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(39, 174, 96, 0.15)",
    marginBottom: 8,
  },
  guaranteeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.green,
    flex: 1,
  },
  contentSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  descTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.text,
    marginBottom: 12,
  },
  descText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  specsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  specCard: {
    width: "48%" as any,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  specLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  specValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: Colors.text,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  featureDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  extraInfoSection: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 18,
    gap: 14,
  },
  extraInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  extraInfoText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    flex: 1,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 10,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  callBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  emailBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  quoteBtn: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  quoteBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  quoteBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.white,
  },
  notFoundText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 12,
  },
  backLink: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  backLinkText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.white,
  },
});
