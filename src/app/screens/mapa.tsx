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

const dataCategories: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: '1', name: 'Históricos', icon: 'hourglass-outline' },
  { id: '2', name: 'Naturais', icon: 'leaf-outline' },
  { id: '3', name: 'Culturais', icon: 'library-outline' },
  { id: '4', name: 'Gastronomia', icon: 'cafe-outline' },
  { id: '5', name: 'Aventura', icon: 'bicycle-outline' },
];

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
        {
          id: '1',
          titulo: 'Igreja Matriz',
          endereco: 'Praça da Independência - Espirito Santo do Pinhal, SP',
          latitude: -46.74684587373476,
          longitude: -22.193703351116405,
          image: 'https://placehold.co/400/png',
          distancia: 500,
          estrelas: 4.5,
          descricao: 'A Igreja Matriz de Espírito Santo do Pinhal, dedicada a Divino Espírito Santo, é um marco histórico e arquitetônico na cidade. Sua construção imponente e detalhes artísticos a tornam um ponto de referência e visita obrigatória. O interior da igreja abriga belos altares, vitrais coloridos e obras sacras que contam a história da fé e da comunidade local. Além de seu valor religioso, a Igreja Matriz é um importante patrimônio cultural, palco de celebrações e eventos que reúnem os moradores e visitantes.',
          avaliacoes: [
            {
              nome: 'Ana Silva',
              avaliacao: 4,
              comentario: 'Linda igreja, muito bem conservada e com uma energia incrível. Vale a pena a visita!',
              data: '2023-10-26'
            },
            {
              nome: 'Carlos Oliveira',
              avaliacao: 5,
              comentario: 'Arquitetura impressionante e um lugar de muita paz. Recomendo a todos que visitarem Pinhal.',
              data: '2023-10-25'
            },
            {
              nome: 'Beatriz Costa',
              avaliacao: 4,
              comentario: 'Um pouco antiga, mas com muitos detalhes interessantes. Gostei da visita guiada.',
              data: '2023-10-24'
            },
            {
              nome: 'Fernando Rocha',
              avaliacao: 3,
              comentario: 'Bonita, mas esperava mais da parte interna. A praça ao redor é agradável.',
              data: '2023-10-23'
            },
            {
              nome: 'Mariana Santos',
              avaliacao: 4,
              comentario: 'Chique, muito xique xique bahia',
              data: '2023-10-22'
            },
            {
              nome: 'Xeila de Oliveira',
              avaliacao: 5,
              comentario: 'Achei muito é massa',
              data: '2023-10-21'
            },
            {
              nome: 'Pardo Xande',
              avaliacao: 4,
              comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit. A lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
              data: '2023-10-20'
            }
          ]
        }
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
          {dataCategories.map(((item) => (
            categoryItem({ item })
          )))}
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