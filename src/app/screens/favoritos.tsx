import { MainHeader } from '@/src/components/header';
import { rootColors, rootStyles } from '@/src/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { LUGARES_FAVORITOS } from '../data/favoritos';

export default function FavoritosScreen() {
  const opacity = useSharedValue(0);
  const [favoritos, setFavoritos] = useState(LUGARES_FAVORITOS);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useFocusEffect(
    useCallback(() => {
      opacity.value = withTiming(1, { duration: 500 });

      return () => {
        opacity.value = withTiming(0, { duration: 200 });
      };
    }, [])
  );

  const toggleFavorito = (id: number) => {
    setFavoritos(prevFavoritos => 
      prevFavoritos.map(lugar => 
        lugar.id === id ? { ...lugar, isFavorito: !lugar.isFavorito } : lugar
      )
    );
  };

  const renderStars = (rating: number) => {
    return (
      <View style={estilos.containerEstrelas}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name="star"
            size={16}
            color={star <= rating ? rootColors.amarelo : '#D3D3D3'}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={rootStyles.container}>
      <MainHeader />
      
      <Animated.View style={[estilos.conteudo, animatedStyle]}>
        <Text style={estilos.tituloSecao}>Lugares Favoritos</Text>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={estilos.conteudoScroll}
        >
          {favoritos.map((lugar) => (
            <View key={lugar.id} style={estilos.cartao}>
              <Image source={lugar.imagem} style={estilos.imagemCartao} />
              
              <View style={estilos.conteudoCartao}>
                <View style={estilos.cabecalhoCartao}>
                  <Text style={estilos.tituloCartao}>{lugar.nome}</Text>
                  <Pressable onPress={() => toggleFavorito(lugar.id)}>
                    <Ionicons
                      name={lugar.isFavorito ? 'heart' : 'heart-outline'}
                      size={24}
                      color={rootColors.vinho}
                    />
                  </Pressable>
                </View>
                
                <Text style={estilos.descricaoCartao}>{lugar.descricao}</Text>
                {renderStars(lugar.rating)}
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: '600',
    color: rootColors.marrom,
    marginBottom: 16,
  },
  conteudoScroll: {
    paddingBottom: 20,
  },
  cartao: {
    backgroundColor: rootColors.branco,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagemCartao: {
    width: '100%',
    height: 160,
  },
  conteudoCartao: {
    padding: 16,
  },
  cabecalhoCartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tituloCartao: {
    fontSize: 18,
    fontWeight: '600',
    color: rootColors.marrom,
    flex: 1,
  },
  descricaoCartao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  containerEstrelas: {
    flexDirection: 'row',
    gap: 2,
  },
});