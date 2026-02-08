import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Linking,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Colors from "@/constants/colors";
import { products, companyInfo } from "@/constants/data";
import { useFavorites } from "@/contexts/FavoritesContext";

const { width } = Dimensions.get("window");

function RelatedProductCard({ item }: { item: typeof products[0] }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.relatedCard, { opacity: pressed ? 0.9 : 1 }]}
      onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } })}
    >
      <View style={styles.relatedIcon}>
        <Ionicons name={item.icon as any} size={24} color={Colors.green} />
      </View>
      <Text style={styles.relatedName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.relatedCategory} numberOfLines={1}>{item.category}</Text>
    </Pressable>
  );
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteType, setQuoteType] = useState<'cotizacion' | 'info' | 'envio'>('cotizacion');

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

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleQuote = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    const text = encodeURIComponent(`Hola Carolina, me gustaria recibir cotizacion del producto: ${product.name}\n\nCategoria: ${product.category}`);
    Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${text}`);
  };

  const handleSubmitQuote = () => {
    if (!quoteName.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingrese su nombre.');
      return;
    }
    const typeLabels = { cotizacion: 'Cotizacion del producto', info: 'Informacion tecnica', envio: 'Costos de envio' };
    const msg = encodeURIComponent(
      `Hola Carolina, soy ${quoteName.trim()}.\n\nSolicitud: ${typeLabels[quoteType]}\nProducto: ${product.name}\nCategoria: ${product.category}\n${quotePhone ? `Tel: ${quotePhone}\n` : ''}\n${quoteMessage || 'Me gustaria recibir mas informacion.'}`
    );
    Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${msg}`);
    setShowQuoteForm(false);
  };

  const handleEmailQuote = () => {
    const subject = encodeURIComponent(`Cotizacion: ${product.name}`);
    const body = encodeURIComponent(`Hola,\n\nMe gustaria recibir cotizacion del siguiente producto:\n\nProducto: ${product.name}\nCategoria: ${product.category}\n\nGracias.`);
    Linking.openURL(`mailto:${companyInfo.email}?subject=${subject}&body=${body}`);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${companyInfo.phone.replace(/\s/g, '')}`);
  };

  const handleToggleFav = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleFavorite(product.id);
  };

  const fav = isFavorite(product.id);

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
          <View style={styles.heroTopRow}>
            <Pressable style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color={Colors.white} />
            </Pressable>
            <Pressable style={styles.favBtn} onPress={handleToggleFav}>
              <Ionicons name={fav ? "heart" : "heart-outline"} size={22} color={fav ? "#E74C3C" : Colors.white} />
            </Pressable>
          </View>

          <View style={styles.heroIconContainer}>
            <Ionicons name={product.icon as any} size={56} color={Colors.accent} />
          </View>
          <Text style={styles.heroCategory}>{product.category}</Text>
          <Text style={styles.heroTitle}>{product.name}</Text>

          <View style={styles.heroBadges}>
            <View style={styles.heroBadge}>
              <Ionicons name="shield-checkmark" size={12} color={Colors.accent} />
              <Text style={styles.heroBadgeText}>36 meses gtia</Text>
            </View>
            <View style={styles.heroBadge}>
              <Ionicons name="construct" size={12} color={Colors.accent} />
              <Text style={styles.heroBadgeText}>Life Warranty</Text>
            </View>
            <View style={styles.heroBadge}>
              <Ionicons name="airplane" size={12} color={Colors.accent} />
              <Text style={styles.heroBadgeText}>Envio nacional</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Descripcion</Text>
          <Text style={styles.descText}>{product.description}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Especificaciones Tecnicas</Text>
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
          <Text style={styles.sectionTitle}>Caracteristicas</Text>
          {product.features.map((feat, idx) => (
            <View key={idx} style={styles.featureRow}>
              <View style={styles.featureDot}>
                <Ionicons name="checkmark" size={14} color={Colors.white} />
              </View>
              <Text style={styles.featureText}>{feat}</Text>
            </View>
          ))}
        </View>

        <View style={styles.guaranteeSection}>
          <LinearGradient
            colors={['rgba(39, 174, 96, 0.08)', 'rgba(39, 174, 96, 0.03)']}
            style={styles.guaranteeGradient}
          >
            <View style={styles.guaranteeRow}>
              <View style={styles.guaranteeIcon}>
                <Ionicons name="shield-checkmark" size={24} color={Colors.green} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.guaranteeTitle}>Garantia de 36 Meses</Text>
                <Text style={styles.guaranteeDesc}>Por defectos de fabricacion. Disponibilidad de repuestos de por vida (Life Warranty).</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.extraInfoSection}>
          <View style={styles.extraInfoRow}>
            <Ionicons name="construct" size={18} color={Colors.accent} />
            <Text style={styles.extraInfoText}>Instalacion y montaje profesional disponible</Text>
          </View>
          <View style={styles.extraInfoRow}>
            <Ionicons name="airplane" size={18} color={Colors.accent} />
            <Text style={styles.extraInfoText}>Despacho a todo Colombia</Text>
          </View>
          <View style={styles.extraInfoRow}>
            <Ionicons name="school" size={18} color={Colors.accent} />
            <Text style={styles.extraInfoText}>Capacitacion tecnica incluida</Text>
          </View>
          <View style={styles.extraInfoRow}>
            <Ionicons name="analytics" size={18} color={Colors.accent} />
            <Text style={styles.extraInfoText}>Calibracion con pesas patron certificadas</Text>
          </View>
        </View>

        {showQuoteForm && (
          <View style={styles.quoteFormSection}>
            <Text style={styles.quoteFormTitle}>Solicitar Cotizacion o Asesoria</Text>
            <Text style={styles.quoteFormSubtitle}>Para: {product.name}</Text>

            <Text style={styles.quoteLabel}>Tipo de solicitud</Text>
            <View style={styles.quoteTypeRow}>
              {([
                { key: 'cotizacion' as const, label: 'Cotizacion', icon: 'pricetag' },
                { key: 'info' as const, label: 'Info Tecnica', icon: 'information-circle' },
                { key: 'envio' as const, label: 'Costos Envio', icon: 'airplane' },
              ]).map((type) => (
                <Pressable
                  key={type.key}
                  style={[styles.quoteTypeBtn, quoteType === type.key && styles.quoteTypeBtnSelected]}
                  onPress={() => setQuoteType(type.key)}
                >
                  <Ionicons name={type.icon as any} size={14} color={quoteType === type.key ? Colors.white : Colors.darkGray} />
                  <Text style={[styles.quoteTypeText, quoteType === type.key && styles.quoteTypeTextSelected]}>{type.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.quoteLabel}>Nombre *</Text>
            <TextInput
              style={styles.quoteInput}
              placeholder="Su nombre"
              placeholderTextColor={Colors.mediumGray}
              value={quoteName}
              onChangeText={setQuoteName}
            />

            <Text style={styles.quoteLabel}>Telefono</Text>
            <TextInput
              style={styles.quoteInput}
              placeholder="+57 300 000 0000"
              placeholderTextColor={Colors.mediumGray}
              value={quotePhone}
              onChangeText={setQuotePhone}
              keyboardType="phone-pad"
            />

            <Text style={styles.quoteLabel}>Mensaje</Text>
            <TextInput
              style={[styles.quoteInput, { minHeight: 80, textAlignVertical: 'top' }]}
              placeholder="Detalle su necesidad..."
              placeholderTextColor={Colors.mediumGray}
              value={quoteMessage}
              onChangeText={setQuoteMessage}
              multiline
            />

            <View style={styles.quoteActions}>
              <Pressable
                style={({ pressed }) => [styles.quoteCancel, { opacity: pressed ? 0.85 : 1 }]}
                onPress={() => setShowQuoteForm(false)}
              >
                <Text style={styles.quoteCancelText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.quoteSubmit, { opacity: pressed ? 0.9 : 1 }]}
                onPress={handleSubmitQuote}
              >
                <Ionicons name="logo-whatsapp" size={18} color={Colors.white} />
                <Text style={styles.quoteSubmitText}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        )}

        {relatedProducts.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>Productos Relacionados</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedScroll}>
              {relatedProducts.map((p) => (
                <RelatedProductCard key={p.id} item={p} />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) + (Platform.OS === 'web' ? 34 : 0) }]}>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={handleCall}
        >
          <Ionicons name="call" size={20} color={Colors.primary} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={handleEmailQuote}
        >
          <Ionicons name="mail" size={20} color={Colors.primary} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={() => setShowQuoteForm(!showQuoteForm)}
        >
          <Ionicons name="document-text" size={20} color={Colors.primary} />
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
            <Text style={styles.quoteBtnText}>Cotizar</Text>
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
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  favBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 26,
    backgroundColor: "rgba(232, 166, 35, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
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
    marginBottom: 14,
  },
  heroBadges: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  heroBadgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
  },
  contentSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
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
  guaranteeSection: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  guaranteeGradient: {
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(39, 174, 96, 0.15)",
    borderRadius: 16,
  },
  guaranteeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  guaranteeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(39, 174, 96, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  guaranteeTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.green,
    marginBottom: 2,
  },
  guaranteeDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
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
  quoteFormSection: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  quoteFormTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    color: Colors.text,
    marginBottom: 4,
  },
  quoteFormSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  quoteLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 6,
    marginTop: 10,
  },
  quoteTypeRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  quoteTypeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 8,
    backgroundColor: Colors.offWhite,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  quoteTypeBtnSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  quoteTypeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.darkGray,
  },
  quoteTypeTextSelected: {
    color: Colors.white,
  },
  quoteInput: {
    backgroundColor: Colors.offWhite,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  quoteActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  quoteCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    alignItems: "center",
  },
  quoteCancelText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.darkGray,
  },
  quoteSubmit: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: Colors.whatsapp,
  },
  quoteSubmitText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.white,
  },
  relatedSection: {
    marginTop: 24,
  },
  relatedScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    gap: 12,
  },
  relatedCard: {
    width: 140,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  relatedIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(39, 174, 96, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  relatedName: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.text,
    marginBottom: 2,
  },
  relatedCategory: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 8,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
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
    paddingVertical: 14,
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
