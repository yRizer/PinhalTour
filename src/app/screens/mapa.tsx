// app/index.js (ou qualquer tela sua)
import { SheetUp } from '@/src/components/bottomSheets';
import { Button } from '@/src/components/buttons';
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
import { CATEGORIAS as dataCategories } from '../data/categories';
import { MAPA_SHEET_DATA } from '../data/mapa';

type MapPointData = {
  id: string;
  titulo: string;
  endereco: string;
  latitude: number;
  longitude: number;
  image: string;
  distancia: number;
  estrelas: number;
  descricao: string;
  avaliacoes: {
    nome: string;
    avaliacao: number;
    comentario: string;
    data: string;
  }[];
};

export default function MapaScreen() {

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [bottomSheetData, setBottomSheetData] = React.useState<MapPointData | undefined>(undefined)

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
        apagarSheetData();
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

  function adicionarSheetData() {
    if (!bottomSheetData) {
      setBottomSheetData(
        MAPA_SHEET_DATA
      );
    }
  }

  function apagarSheetData() {
    setBottomSheetData(undefined);
  }

  return (
    <GestureHandlerRootView style={[rootStyles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#222222ff' }]}>
      <View style={styles.mapHeader}>
        <MainTextInput placeholder='Pesquise algum lugar...' marginInline={20} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {dataCategories.map((item) => (
            categoryItem({
              item: {
                ...item,
                id: String(item.id),
                icon: item.icon as keyof typeof Ionicons.glyphMap,
              }
            })
          ))}
        </ScrollView>
      </View>

      <Animated.Text style={[rootTexts.title, animatedStyle, { color: rootColors.branco }]}>
        Mapa
      </Animated.Text>

      <Button text='teste' width={'auto'} onPress={adicionarSheetData} />
      <Button text='apagar' width={'auto'} onPress={apagarSheetData} />

      {bottomSheetData &&
        <SheetUp
          SetPosY={75}
          Percentage={true}
          mapsData={bottomSheetData}
          onClose={apagarSheetData}
          toClose={true}
        />
      }
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mapHeader: {
    position: 'absolute',
    top: 25,
    width: '100%',
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
    paddingHorizontal: 20,
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