// app/index.js (ou qualquer tela sua)
import { rootStyles } from '@/src/styles/styles';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function QRScannerScreen() {
  // 1. Crie um valor compartilhado para a animação
  const opacity = useSharedValue(0);
  const qrCodeLock = useRef(false);
  const [hasPermission, setHasPermission] = useCameraPermissions();


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

  useEffect(() => {
    const requestPermission = async () => {
      setHasPermission();
    };
    requestPermission();
  }, [setHasPermission]);

  function handleQRCodeScanned(data: string) {
    console.log(data);
    // router.push({ pathname: '/qr-description', params: { QRCode: data } });
  }

  return (
    <Animated.View style={[rootStyles.container, animatedStyle]}>
      <CameraView
        style={styles.cameraContainer}
        onBarcodeScanned={({ data }) => {
          if (data && !qrCodeLock.current) {
            qrCodeLock.current = true
            setTimeout(() => handleQRCodeScanned(data), 500)
          }
        }} />
      <View style={styles.disfocusOverlay}>
        <View style={styles.focusArea} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  disfocusOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  focusArea: {
    width: 250,
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
  }
})