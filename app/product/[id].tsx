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

const categoryIcons: Record<string, string> = {
  'industriales': 'cube',
  'ganaderas': 'leaf',
  'camioneras': 'car',
  'dinamometros': 'fitness',
  'perifericos': 'settings',
  'software': 'desktop',
};

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

  const iconName = categoryIcons[product.categoryId] || 'cube';

  const handleQuote = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    const text = encodeURIComponent(`Hola, me gustaria recibir cotizacion del producto: ${product.name}`);
    Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${text}`);
  };

  const handleEmailQuote = () => {
    const subject = encodeURIComponent(`Cotizacion: ${product.name}`);
    const body = encodeURIComponent(`Hola,\n\nMe gustaria recibir cotizacion del siguiente producto:\n\nProducto: ${product.name}\nCategoria: ${product.category}\n\nGracias.`);
    Linking.openURL(`mailto:${companyInfo.email}?subject=${subject}&body=${body}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryLight, '#1E3A5F']}
          style={[styles.heroSection, { paddingTop: insets.top + webTopInset + 12 }]}
        >
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </Pressable>

          <View style={styles.heroIconContainer}>
            <Ionicons name={iconName as any} size={64} color={Colors.accent} />
          </View>
          <Text style={styles.heroCategory}>{product.category}</Text>
          <Text style={styles.heroTitle}>{product.name}</Text>
        </LinearGradient>

        <View style={styles.contentSection}>
          <Text style={styles.descTitle}>Descripcion</Text>
          <Text style={styles.descText}>{product.description}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.descTitle}>Especificaciones</Text>
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

        <View style={styles.certRow}>
          <Ionicons name="shield-checkmark" size={18} color={Colors.success} />
          <Text style={styles.certRowText}>Fabricado bajo normas ISO 9001, OIML, NTC 2031 y CE</Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) + (Platform.OS === 'web' ? 34 : 0) }]}>
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
            colors={[Colors.accent, Colors.accentLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.quoteBtnGradient}
          >
            <Ionicons name="logo-whatsapp" size={20} color={Colors.primary} />
            <Text style={styles.quoteBtnText}>Solicitar Cotizacion</Text>
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
    width: 110,
    height: 110,
    borderRadius: 28,
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
    fontSize: 24,
    color: Colors.white,
    textAlign: "center",
    lineHeight: 30,
  },
  contentSection: {
    paddingHorizontal: 20,
    marginTop: 24,
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
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  certRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "rgba(34, 197, 94, 0.08)",
    padding: 14,
    borderRadius: 12,
  },
  certRowText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.text,
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
    color: Colors.primary,
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
