// app/index.js (ou qualquer tela sua)
import { SheetUp } from '@/src/components/bottomSheets';
import MainTextInput from '@/src/components/textInput';
import { rootColors, rootStyles, rootTexts } from '@/src/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import Mapbox, { Camera, locationManager, LocationPuck, MapView, MarkerView, requestAndroidLocationPermissions } from '@rnmapbox/maps';
import { useFocusEffect } from 'expo-router'; // ou '@react-navigation/native'
import React, { useCallback, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  function handleMarkerClicked(ponto: typeof pontosTuristicos[0]) {
    adicionarSheetData();
  }

  const MAPBOX_PUBLIC_TOKEN = 'pk.eyJ1Ijoicnl6ZXIiLCJhIjoiY21memo3NnMzMDNhNTJvb3JyOGt2N3h1ayJ9.oIBS2SuCrZMbGJ4tY424iQ';

  Mapbox.setAccessToken(MAPBOX_PUBLIC_TOKEN);

  requestAndroidLocationPermissions().then(() => {
    locationManager.start();
  });

  return (
    <GestureHandlerRootView style={[rootStyles.container, { backgroundColor: '#222222ff' }]}>

      <Mapa onMarkerClicked={handleMarkerClicked} />

      <SafeAreaView style={styles.mapHeader}>
        <MainTextInput placeholder='Pesquise algum lugar...' marginInline={20} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {dataCategories.map(((item) => (
            categoryItem({ item })
          )))}
        </ScrollView>
      </SafeAreaView>

      {/* <Animated.Text style={[rootTexts.title, animatedStyle, { color: rootColors.branco }]}>
        Mapa
      </Animated.Text> */}

      {/* <Button text='teste' width={'auto'} onPress={adicionarSheetData} />
      <Button text='apagar' width={'auto'} onPress={apagarSheetData} /> */}

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

type MapaProps = {
  onMarkerClicked?: (ponto: typeof pontosTuristicos[0]) => void;
};

export function Mapa({ onMarkerClicked }: MapaProps) {

  function handleMarkerClicked(ponto: typeof pontosTuristicos[0]) {
    if (onMarkerClicked) {
      onMarkerClicked(ponto);
    }
  }


  return (
    <MapView
      logoEnabled={false}
      attributionEnabled={false}
      style={[{ flex: 1 }]}
      styleURL='mapbox://styles/mapbox/dark-v11' projection='globe'
      compassEnabled={true}
      compassPosition={{ bottom: 20, right: 20 }}
      scaleBarPosition={{ bottom: 20, left: 20 }}
    >
      <Camera
        zoomLevel={13}
        animationMode={'flyTo'}
        animationDuration={3000}
        followUserLocation={false}
        centerCoordinate={[-46.75694597373476, -22.193703351116405]}
      />

      {pontosTuristicos.map((ponto) => {
        // Verificamos se este marcador é o que está selecionado

        return (
          <MarkerView
            key={ponto.id}
            id={ponto.id.toString()}
            coordinate={ponto.coordenadas}
            allowOverlap={true}
          >
            {/* O Pressable é o container. Seu estilo muda se for selecionado */}
            <Pressable
              // Usamos uma função no estilo para adicionar estilos condicionais
              style={[
                styles.markerContainer,
              ]}
              pointerEvents='auto'
              onPressIn={(event) => {
                handleMarkerClicked(ponto)
              }}
            >
              <Image source={ponto.imagem} style={styles.markerImage} />
            </Pressable>
          </MarkerView>
        );
      })}

      <LocationPuck
        visible={true}
        puckBearingEnabled={true}
        puckBearing={'heading'}
        pulsing={{ isEnabled: true }}
      />
    </MapView>
  )
}

const pontosTuristicos = [
  {
    id: 1,
    nome: 'Igreja Matriz',
    descricao: 'Uma bela igreja histórica no centro da cidade.',
    coordenadas: [-46.74681904570734, -22.193903727089243], // Exemplo de coordenadas (longitude, latitude)
    imagem: require('../../../assets/images/imagesMapMarker/IgrejaMatriz.jpg'), // Substitua pelo caminho da imagem local
  },
  {
    id: 2,
    nome: 'Museu da Cidade',
    descricao: 'Um museu que conta a história da cidade.',
    coordenadas: [-46.748, -22.195], // Exemplo de coordenadas (longitude, latitude)
    imagem: require('../../../assets/images/imagesMapMarker/MuseuCidade.jpg'), // Substitua pelo caminho da imagem local
  },
  {
    id: 3,
    nome: 'Praça da Independência',
    descricao: 'Uma praça histórica onde ocorreram eventos importantes.',
    coordenadas: [-46.749, -22.194], // Exemplo de coordenadas (longitude, latitude)
    imagem: require('../../../assets/images/imagesMapMarker/PracaIndependencia.jpg'), // Substitua pelo caminho da imagem local
  },
  {
    id: 4,
    nome: 'Palacio do Café',
    descricao: 'Um palácio histórico que remonta à era do café.',
    coordenadas: [-46.750, -22.196], // Exemplo de coordenadas (longitude, latitude)
    imagem: require('../../../assets/images/imagesMapMarker/PalacioCafe.jpg'), // Substitua pelo caminho da imagem local
  },
  {
    id: 5,
    nome: 'Cânara Municipal',
    descricao: 'A sede do governo local com arquitetura impressionante.',
    coordenadas: [-46.751, -22.193], // Exemplo de coordenadas (longitude, latitude)
    imagem: require('../../../assets/images/imagesMapMarker/CamaraMunicipal.jpg'), // Substitua pelo caminho da imagem local
  },
  {
    id: 6,
    nome: 'Cine Theatro Avenida',
    descricao: 'Um teatro histórico que exibe filmes clássicos e peças teatrais.',
    coordenadas: [-46.752, -22.197], // Exemplo de coordenadas (longitude, latitude)
    imagem: require('../../../assets/images/imagesMapMarker/CineTheatroAvenida.jpg'), // Substitua pelo caminho da imagem local
  },
  {
    id: 7,
    nome: 'Cia da Hebe',
    descricao: 'peça central na história de Espírito Santo do Pinhal. Construído em 1903, a princípio como residência, o casarão abrigou setores municipais e o primeiro cartório da comarca.',
    coordenadas: [-46.753, -22.198], // Exemplo de coordenadas (longitude, latitude)
    imagem: require('../../../assets/images/imagesMapMarker/CiaHebe.jpg'), // Substitua pelo caminho da imagem local
  },
]

const styles = StyleSheet.create({
  mapHeader: {
    position: 'absolute',
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
  markerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 40,
    borderColor: '#8C3B4A',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    overflow: 'hidden',
    zIndex: 1,
  },
  markerImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    resizeMode: 'stretch',
  },
})