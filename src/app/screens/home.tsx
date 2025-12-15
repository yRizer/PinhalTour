import { MainHeader } from '@/src/components/header';
import { rootColors, rootStyles, rootTexts } from '@/src/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { EVENTOS_EXEMPLO } from '../data/eventos';

import React from 'react';
import { CATEGORIAS } from '../data/categories';
import { LUGARES_POPULARES } from '../data/places';

import { RightIconButton } from '@/src/components/buttons';

export default function HomeScreen() {
  const opacity = useSharedValue(0);

  const [selectedEventoId, setSelectedEventoId] = React.useState<number | null>(null);

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

  function renderItemEvento(evento: any) {

    const height = useSharedValue(0);

    useEffect(() => {
      height.value = withTiming(selectedEventoId === evento.id ? 150 : 0, { duration: 300 });
    }, [selectedEventoId]);

    var animatedHeight = useAnimatedStyle(() => {
      return {
        height: height.value,
      };
    });

    return (
      <Pressable key={evento.id} style={styles.eventoCard} onPress={setSelectedEventoId.bind(null, evento.id)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.eventoData}>
            <Text style={styles.eventoDia}>{evento.dia}</Text>
            <Text style={styles.eventoMes}>{evento.mes}</Text>
          </View>

          <Text style={styles.eventoTitulo}>{evento.titulo}</Text>

          <View style={styles.eventoIcone}>
            <Ionicons name={evento.icone} size={28} color={rootColors.verde} />
          </View>
        </View>

        { selectedEventoId === evento.id &&
          <Animated.View style={[{ overflow: 'hidden' }, animatedHeight]}>
            <Text style={[rootTexts.text, { marginTop: 12, color: rootColors.marrom, opacity: 0.8 }]}>  {evento.descricao}</Text>
            <View style={{ width: '100%', marginTop: 18, flexDirection: 'row', justifyContent: 'flex-start', gap: 12 }}>
              <RightIconButton
                text='Localização'
                rightIcon='google-maps'
                width={'auto'}
                backgroundColor={rootColors.vinho}
                textColor={rootColors.branco}
                paddingHorizontal={16}
                paddingVertical={8}
                iconSize={20}
                borderRadius={8}
              />
              <RightIconButton
                text='Agendar'
                rightIcon='calendar-check'
                width={'auto'}
                outLine={{ borderColor: rootColors.vinho, borderWidth: 2 }}
                backgroundColor='#00000000'
                textColor={rootColors.marrom}
                paddingHorizontal={16}
                paddingVertical={8}
                iconSize={20}
                borderRadius={8}
              />
              <RightIconButton
                text='Fechar'
                rightIcon='close'
                width={'auto'}
                outLine={{ borderColor: rootColors.vinho, borderWidth: 2 }}
                backgroundColor='#00000000'
                textColor={rootColors.marrom}
                paddingHorizontal={16}
                paddingVertical={8}
                iconSize={20}
                borderRadius={8}
                onPress={function (){setSelectedEventoId(null)}}
              />
            </View>
          </Animated.View>
        }
      </Pressable>
    )
  }

  return (
    <View style={rootStyles.container}>
      <MainHeader />

      {/* Content */}
      <Animated.ScrollView
        style={[styles.conteudo, animatedStyle]}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Principal */}
        <View style={styles.containerBanner}>
          <Image
            source={require('@/assets/images/imagens-pinhal/portal-pinhal.jpg')}
            style={styles.imagemBanner}
          />
          <View style={styles.sobreposicaoBanner} />
          <View style={styles.conteudoBanner}>
            <Text style={styles.textoBanner}>Explore a Rota do Café e Vinho</Text>
            <Pressable style={styles.botaoBanner}>
              <Text style={styles.textoBotaoBanner}>Saiba Mais</Text>
            </Pressable>
          </View>
        </View>

        {/* Categorias */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Categorias</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerCategorias}
          >
            {CATEGORIAS.map((categoria) => (
              <Pressable key={categoria.id} style={styles.cardCategoria}>
                <View style={styles.iconeCategoria}>
                  <Ionicons
                    name={categoria.icon as any}
                    size={32}
                    color={rootColors.marrom}
                  />
                </View>
                <Text style={styles.textoCategoria}>{categoria.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Lugares Populares */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Lugares Populares</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerLugares}
          >
            {LUGARES_POPULARES.map((lugar) => (
              <Pressable key={lugar.id} style={styles.cardLugar}>
                <Image
                  source={typeof lugar.imagem === 'string' ? { uri: lugar.imagem } : lugar.imagem}
                  style={styles.imagemLugar}
                />
                <Pressable style={styles.botaoFavoritoLugar}>
                  <Ionicons name="heart-outline" size={20} color={rootColors.vinho} />
                </Pressable>
                <View style={styles.infoLugar}>
                  <Text style={styles.nomeLugar}>{lugar.nome}</Text>
                  <Text style={styles.descricaoLugar}>{lugar.descricao}</Text>
                  <View style={styles.containerAvaliacao}>
                    <Ionicons name="star" size={16} color={rootColors.amarelo} />
                    <Text style={styles.textoAvaliacao}>{lugar.rating}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.secao, { marginBottom: 150 }]}>
          <Text style={styles.tituloSecao}>Próximos Eventos</Text>
          <View style={styles.containerEventos}>
            {EVENTOS_EXEMPLO.map((evento, index) => (
              renderItemEvento(evento)
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
  },
  containerBanner: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  imagemBanner: {
    width: '100%',
    height: '100%',
  },
  sobreposicaoBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  conteudoBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  textoBanner: {
    color: rootColors.branco,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  botaoBanner: {
    alignSelf: 'flex-start',
    backgroundColor: rootColors.vinho,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textoBotaoBanner: {
    color: rootColors.branco,
    fontSize: 14,
    fontWeight: '600',
  },
  botaoFavorito: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  secao: {
    marginTop: 8,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: '600',
    color: rootColors.marrom,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  containerCategorias: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  cardCategoria: {
    backgroundColor: rootColors.branco,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 100,
    height: 100,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconeCategoria: {
    marginBottom: 8,
  },
  textoCategoria: {
    fontSize: 12,
    color: rootColors.marrom,
    textAlign: 'center',
  },
  containerLugares: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  cardLugar: {
    backgroundColor: rootColors.branco,
    borderRadius: 12,
    marginRight: 16,
    width: 205,
    height: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imagemLugar: {
    width: '100%',
    height: 120,
  },
  botaoFavoritoLugar: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F9F6F0CF',
    borderRadius: 50,
    padding: 6,
  },
  infoLugar: {
    padding: 12,
  },
  nomeLugar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: rootColors.marrom,
    marginBottom: 4,
  },
  descricaoLugar: {
    fontSize: 12,
    color: rootColors.marrom,
    opacity: 0.7,
    marginBottom: 8,
  },
  containerAvaliacao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoAvaliacao: {
    fontSize: 14,
    color: rootColors.marrom,
    marginLeft: 4,
    fontWeight: '600',
  },
  containerEventos: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  eventoCard: {
    backgroundColor: rootColors.branco,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventoData: {
    backgroundColor: rootColors.vinho,
    borderRadius: 12,
    width: 60,
    height: 60,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventoDia: {
    fontSize: 24,
    fontWeight: 'bold',
    color: rootColors.branco,
  },
  eventoMes: {
    fontSize: 12,
    fontWeight: '600',
    color: rootColors.branco,
  },
  eventoTitulo: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: rootColors.marrom,
  },
  eventoIcone: {
    marginLeft: 8,
  },
});