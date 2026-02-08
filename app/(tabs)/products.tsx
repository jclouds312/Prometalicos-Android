import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Platform,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Colors from "@/constants/colors";
import { categories, products, type Product } from "@/constants/data";

function CategoryPill({ id, name, icon, selected, onPress }: { id: string; name: string; icon: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={[styles.pill, selected && styles.pillSelected]}
      onPress={onPress}
    >
      <Ionicons
        name={(selected ? icon.replace('-outline', '') : icon) as any}
        size={16}
        color={selected ? Colors.white : Colors.darkGray}
      />
      <Text style={[styles.pillText, selected && styles.pillTextSelected]} numberOfLines={1}>
        {name.replace('Basculas ', '').replace('Equipos de ', '').replace('Equipo ', '').replace('Maquinaria para ', '')}
      </Text>
    </Pressable>
  );
}

function ProductCard({ item }: { item: Product }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.productCard, { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
      onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } })}
    >
      <View style={styles.productImageContainer}>
        <Ionicons
          name={item.icon as any}
          size={32}
          color={Colors.green}
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productDesc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.productSpecs}>
          {item.specs.slice(0, 2).map((spec, idx) => (
            <View key={idx} style={styles.specBadge}>
              <Text style={styles.specText}>{spec.split(': ')[1] || spec}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.productArrow}>
        <Ionicons name="chevron-forward" size={20} color={Colors.mediumGray} />
      </View>
    </Pressable>
  );
}

export default function ProductsScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(params.category || 'all');
  const [searchText, setSearchText] = useState('');
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(params.category);
    }
  }, [params.category]);

  if (!fontsLoaded) return null;

  const webTopInset = Platform.OS === "web" ? 67 : 0;

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchesSearch = searchText === '' ||
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.category.toLowerCase().includes(searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + webTopInset + 12 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Productos</Text>
            <Text style={styles.headerSubtitle}>{filteredProducts.length} productos disponibles</Text>
          </View>
          <View style={styles.headerBadge}>
            <Ionicons name="leaf" size={18} color={Colors.accent} />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={Colors.mediumGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.5)" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'all', name: 'Todos', icon: 'apps-outline', description: '', productCount: 0 }, ...categories]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <CategoryPill
              id={item.id}
              name={item.name}
              icon={item.icon}
              selected={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
            />
          )}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard item={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={48} color={Colors.mediumGray} />
            <Text style={styles.emptyText}>No se encontraron productos</Text>
            <Text style={styles.emptySubtext}>Intente con otra busqueda o categoria</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  headerBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(232, 166, 35, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.white,
  },
  categoriesContainer: {
    backgroundColor: Colors.offWhite,
    paddingVertical: 12,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  pillSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.darkGray,
  },
  pillTextSelected: {
    color: Colors.white,
  },
  productsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  productImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: "rgba(39, 174, 96, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  productInfo: {
    flex: 1,
  },
  productCategory: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.green,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  productName: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: Colors.text,
    marginBottom: 4,
  },
  productDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: 8,
  },
  productSpecs: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  specBadge: {
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  specText: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: Colors.darkGray,
  },
  productArrow: {
    padding: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 8,
  },
  emptyText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.text,
    marginTop: 8,
  },
  emptySubtext: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
