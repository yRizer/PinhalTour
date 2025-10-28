// app/index.js (ou qualquer tela sua)
import { rootStyles, rootTexts } from '@/src/styles/styles';
import { useFocusEffect } from 'expo-router'; // ou '@react-navigation/native'
import React, { useCallback } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function HomeScreen() {
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

  return (
    <View style={[rootStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Animated.Text style={[rootTexts.title, animatedStyle]}>
        Tela Inicial
      </Animated.Text>
    </View>
  );
}