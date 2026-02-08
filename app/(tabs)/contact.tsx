import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Colors from "@/constants/colors";
import { companyInfo } from "@/constants/data";

type RequestType = 'cotizacion' | 'info_tecnica' | 'servicio' | 'repuestos';

function ContactInfoCard({ icon, label, value, onPress }: { icon: string; label: string; value: string; onPress?: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.contactInfoCard, { opacity: pressed && onPress ? 0.85 : 1 }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.contactInfoIcon}>
        <Ionicons name={icon as any} size={20} color={Colors.green} />
      </View>
      <View style={styles.contactInfoText}>
        <Text style={styles.contactInfoLabel}>{label}</Text>
        <Text style={styles.contactInfoValue}>{value}</Text>
      </View>
      {onPress && <Ionicons name="open-outline" size={16} color={Colors.mediumGray} />}
    </Pressable>
  );
}

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [requestType, setRequestType] = useState<RequestType>('cotizacion');
  const [submitted, setSubmitted] = useState(false);

  if (!fontsLoaded) return null;

  const webTopInset = Platform.OS === "web" ? 67 : 0;

  const requestTypes: { key: RequestType; label: string; icon: string }[] = [
    { key: 'cotizacion', label: 'Cotizacion', icon: 'pricetag' },
    { key: 'info_tecnica', label: 'Info Tecnica', icon: 'information-circle' },
    { key: 'servicio', label: 'Servicio', icon: 'construct' },
    { key: 'repuestos', label: 'Repuestos', icon: 'settings' },
  ];

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) {
      Alert.alert('Campos requeridos', 'Por favor complete nombre y mensaje.');
      return;
    }
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    const typeLabel = requestTypes.find(t => t.key === requestType)?.label || 'Cotizacion';
    const whatsappMsg = encodeURIComponent(
      `Hola Carolina, soy ${name.trim()}.\n\nTipo de solicitud: ${typeLabel}\n${email ? `Email: ${email}\n` : ''}${phone ? `Tel: ${phone}\n` : ''}\n${message.trim()}`
    );
    Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${whatsappMsg}`);

    setSubmitted(true);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${companyInfo.phone.replace(/\s/g, '')}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${companyInfo.email}`);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hola Carolina, me gustaria recibir informacion sobre sus productos.');
    Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${text}`);
  };

  const handleWebsite = () => {
    Linking.openURL(`https://${companyInfo.website}`);
  };

  const handleFacebook = () => {
    Linking.openURL(`https://www.facebook.com/${companyInfo.facebook}`);
  };

  const handleInstagram = () => {
    Linking.openURL(`https://www.instagram.com/${companyInfo.instagram}/`);
  };

  const handleYoutube = () => {
    Linking.openURL(`https://www.youtube.com/@${companyInfo.youtube}`);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        style={[styles.header, { paddingTop: insets.top + webTopInset + 16 }]}
      >
        <Text style={styles.headerTitle}>Contacto</Text>
        <Text style={styles.headerSubtitle}>
          Nuestra asesora Carolina esta lista para atenderle
        </Text>
      </LinearGradient>

      <View style={styles.quickContactRow}>
        <Pressable
          style={({ pressed }) => [styles.quickContactBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={handleWhatsApp}
        >
          <View style={[styles.quickContactIcon, { backgroundColor: 'rgba(37, 211, 102, 0.12)' }]}>
            <Ionicons name="logo-whatsapp" size={22} color={Colors.whatsapp} />
          </View>
          <Text style={styles.quickContactLabel}>WhatsApp</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.quickContactBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={handleCall}
        >
          <View style={[styles.quickContactIcon, { backgroundColor: 'rgba(39, 174, 96, 0.12)' }]}>
            <Ionicons name="call" size={22} color={Colors.green} />
          </View>
          <Text style={styles.quickContactLabel}>Llamar</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.quickContactBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={handleEmail}
        >
          <View style={[styles.quickContactIcon, { backgroundColor: 'rgba(232, 166, 35, 0.12)' }]}>
            <Ionicons name="mail" size={22} color={Colors.accent} />
          </View>
          <Text style={styles.quickContactLabel}>Email</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.quickContactBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={handleWebsite}
        >
          <View style={[styles.quickContactIcon, { backgroundColor: 'rgba(27, 58, 45, 0.08)' }]}>
            <Ionicons name="globe" size={22} color={Colors.primary} />
          </View>
          <Text style={styles.quickContactLabel}>Web</Text>
        </Pressable>
      </View>

      <View style={styles.socialRow}>
        <Pressable style={({ pressed }) => [styles.socialBtn, { backgroundColor: '#1877F2', opacity: pressed ? 0.85 : 1 }]} onPress={handleFacebook}>
          <Ionicons name="logo-facebook" size={20} color={Colors.white} />
          <Text style={styles.socialBtnText}>Facebook</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.socialBtn, { backgroundColor: '#E4405F', opacity: pressed ? 0.85 : 1 }]} onPress={handleInstagram}>
          <Ionicons name="logo-instagram" size={20} color={Colors.white} />
          <Text style={styles.socialBtnText}>Instagram</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.socialBtn, { backgroundColor: '#FF0000', opacity: pressed ? 0.85 : 1 }]} onPress={handleYoutube}>
          <Ionicons name="logo-youtube" size={20} color={Colors.white} />
          <Text style={styles.socialBtnText}>YouTube</Text>
        </Pressable>
      </View>

      {submitted ? (
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={60} color={Colors.green} />
          </View>
          <Text style={styles.successTitle}>Mensaje Enviado</Text>
          <Text style={styles.successText}>
            Su solicitud ha sido enviada por WhatsApp. Carolina se pondra en contacto con usted a la mayor brevedad.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.resetBtn, { opacity: pressed ? 0.85 : 1 }]}
            onPress={resetForm}
          >
            <Text style={styles.resetBtnText}>Enviar otra solicitud</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Solicitar Cotizacion o Servicio</Text>
          <Text style={styles.formSubtitle}>Su mensaje sera enviado directamente por WhatsApp</Text>

          <Text style={styles.inputLabel}>Tipo de solicitud</Text>
          <View style={styles.requestTypeRow}>
            {requestTypes.map((type) => (
              <Pressable
                key={type.key}
                style={[styles.requestTypeBtn, requestType === type.key && styles.requestTypeBtnSelected]}
                onPress={() => setRequestType(type.key)}
              >
                <Ionicons
                  name={type.icon as any}
                  size={14}
                  color={requestType === type.key ? Colors.white : Colors.darkGray}
                />
                <Text style={[styles.requestTypeText, requestType === type.key && styles.requestTypeTextSelected]}>
                  {type.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.inputLabel}>Nombre *</Text>
          <TextInput
            style={styles.input}
            placeholder="Su nombre completo"
            placeholderTextColor={Colors.mediumGray}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@ejemplo.com"
            placeholderTextColor={Colors.mediumGray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Telefono</Text>
          <TextInput
            style={styles.input}
            placeholder="+57 300 000 0000"
            placeholderTextColor={Colors.mediumGray}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.inputLabel}>Mensaje *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describa su necesidad, producto o servicio que requiere..."
            placeholderTextColor={Colors.mediumGray}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Pressable
            style={({ pressed }) => [styles.submitBtn, { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={[Colors.whatsapp, '#20BD57']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitGradient}
            >
              <Ionicons name="logo-whatsapp" size={20} color={Colors.white} />
              <Text style={styles.submitText}>Enviar por WhatsApp</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Informacion de Contacto</Text>
        <ContactInfoCard
          icon="logo-whatsapp"
          label="WhatsApp"
          value="316 326 3971"
          onPress={handleWhatsApp}
        />
        <ContactInfoCard
          icon="call"
          label="Telefono"
          value={companyInfo.phone}
          onPress={handleCall}
        />
        <ContactInfoCard
          icon="mail"
          label="Email"
          value={companyInfo.email}
          onPress={handleEmail}
        />
        <ContactInfoCard
          icon="globe"
          label="Sitio Web"
          value={companyInfo.website}
          onPress={handleWebsite}
        />
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
    paddingBottom: 24,
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
  quickContactRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  quickContactBtn: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  quickContactIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: Colors.cardBg,
  },
  quickContactLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.darkGray,
  },
  socialRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  socialBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.white,
  },
  formContainer: {
    marginHorizontal: 20,
    backgroundColor: Colors.cardBg,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  formTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.text,
    marginBottom: 4,
  },
  formSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 18,
  },
  inputLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.darkGray,
    marginBottom: 6,
    marginTop: 12,
  },
  requestTypeRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
    flexWrap: "wrap",
  },
  requestTypeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: Colors.offWhite,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  requestTypeBtnSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  requestTypeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.darkGray,
  },
  requestTypeTextSelected: {
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  submitBtn: {
    marginTop: 20,
    borderRadius: 14,
    overflow: "hidden",
  },
  submitGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  submitText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.white,
  },
  successContainer: {
    marginHorizontal: 20,
    backgroundColor: Colors.cardBg,
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.text,
    marginBottom: 8,
  },
  successText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  resetBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  resetBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.white,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  infoTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.text,
    marginBottom: 14,
  },
  contactInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  contactInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(39, 174, 96, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  contactInfoText: {
    flex: 1,
  },
  contactInfoLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  contactInfoValue: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.text,
  },
});
