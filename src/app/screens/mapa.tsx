// app/index.js (ou qualquer tela sua)
import { SheetUp } from '@/src/components/bottomSheets';
import MainTextInput from '@/src/components/textInput';
import { rootColors, rootStyles, rootTexts } from '@/src/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router'; // ou '@react-navigation/native'
import React, { useCallback, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const dataCategories: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: '1', name: 'Históricos', icon: 'hourglass-outline' },
  { id: '2', name: 'Naturais', icon: 'leaf-outline' },
  { id: '3', name: 'Culturais', icon: 'library-outline' },
  { id: '4', name: 'Gastronomia', icon: 'cafe-outline' },
  { id: '5', name: 'Aventura', icon: 'bicycle-outline' },
];

export default function MapaScreen() {

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  // 1. Crie um valor compartilhado para a animação
  const opacity = useSharedValue(0);

  // 2. Crie o estilo animado
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // 3. Use o useFocusEffect
  useFocusEffect(
    useCallback(() => {
      // O que fazer quando a tela GANHA foco
      opacity.value = withTiming(1, { duration: 500 });

      return () => {
        // Opcional: O que fazer quando a tela PERDE foco
        // Útil se você quiser reverter a animação
        opacity.value = withTiming(0, { duration: 200 });
      };
    }, [])
  );

  function categoryItem({ item }: { item: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap } }) {
    const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

    var backGroundColor = useSharedValue(selectedCategories.includes(item.id) ? rootColors.vinho : rootColors.branco);
    var color = useSharedValue(selectedCategories.includes(item.id) ? rootColors.branco : rootColors.marrom);

    var iconColor = useSharedValue(0)
    
    useEffect(() => {
      backGroundColor.value = withTiming(selectedCategories.includes(item.id) ? rootColors.vinho : rootColors.branco, { duration: 100 });
      color.value = withTiming(selectedCategories.includes(item.id) ? rootColors.branco : rootColors.marrom, { duration: 100 });
      iconColor.value = withTiming(selectedCategories.includes(item.id) ? 1 : 0, { duration: 100 });
    }, [selectedCategories]);

    var animatedBackground = useAnimatedStyle(() => {
      return {
        backgroundColor: backGroundColor.value,
      };
    });

    var animatedText = useAnimatedStyle(() => {
      return {
        color: color.value,
      };
    });

    var animatedIconColor = useAnimatedStyle(() => {
      return {
        color: interpolateColor(
          iconColor.value,
          [0, 1],
          [rootColors.marrom, rootColors.branco]
        ),
      };
    });

    return (
      <Pressable key={item.id} onPress={function () { handleCategoryPress(item.id) }}>
        <Animated.View style={[styles.categoryItem, animatedBackground]}>
          <Animated.Text style={[rootTexts.auxiliary, animatedText]}>{item.name}</Animated.Text>
          <AnimatedIcon name={item.icon} size={24} style={animatedIconColor} />
        </Animated.View>
      </Pressable>
    );
  }

  function handleCategoryPress(categoryId: string) {

    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        // Remove a categoria se já estiver selecionada
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        // Adiciona a categoria se não estiver selecionada
        return [...prevSelected, categoryId];
      }
    });
  }

  return (
    <GestureHandlerRootView style={[rootStyles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#222222ff' }]}>
      <View style={styles.mapHeader}>
        <MainTextInput placeholder='Pesquise algum lugar...' />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {dataCategories.map(((item) => (
            categoryItem({ item })
          )))}
        </ScrollView>
      </View>

      <Animated.Text style={[rootTexts.title, animatedStyle, { color: rootColors.branco }]}>
        Mapa
      </Animated.Text>

      <SheetUp
        SetPosY={75}
        SheetHeight={1000}
        Percentage={true}
        description="Arraste para cima para ver mais opções"
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mapHeader: {
    position: 'absolute',
    top: 25,
    width: '90%',
    height: 'auto',
  },
  inputSearch: {
    padding: 15,
    height: 'auto',
  },
  categoriesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    overflow: 'visible',
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})