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
import { CATEGORIAS as dataCategories } from '../data/categories';
import { MAPA_SHEET_DATA, pontosTuristicos } from '../data/mapa';

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
      compassPosition={{ bottom: 120, right: 20 }}
      scaleBarPosition={{ bottom: 120, left: 20 }}
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