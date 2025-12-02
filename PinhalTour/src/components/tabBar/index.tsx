// components/CustomTabBar.js
import { rootColors, rootTexts } from '@/src/styles/styles';
import { Ionicons } from '@expo/vector-icons'; // Exemplo com ícones
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { styles } from './styles';

type TabBarButtonProps = {
    route: any;
    isFocused: boolean;
    onPress: () => void;
};


// Componente de botão individual para facilitar
function TabBarButton({ route, isFocused, onPress }: TabBarButtonProps) {
    const scale = useSharedValue(isFocused ? 1.2 : 1);
    const color = useSharedValue(isFocused ? rootColors.vinho : rootColors.marrom);
    const qrColor = useSharedValue(isFocused ? '#FFFFFF' : '#F9F9F9');
    const qrViewScale = useSharedValue(isFocused ? 1.1 : 1);

    // Observa a mudança do `isFocused` e dispara a animação
    useEffect(() => {
        scale.value = withSpring(isFocused ? 1.2 : 1);
        color.value = withTiming(isFocused ? rootColors.vinho : rootColors.marrom, { duration: 300 });
        qrColor.value = withTiming(isFocused ? '#FFFFFF' : '#F9F9F9', { duration: 300 });
        qrViewScale.value = withSpring(isFocused ? 1.1 : 1);
    }, [isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            color: color.value,
        };
    });

    const animatedQrTextStyle = useAnimatedStyle(() => {
        return {
            color: qrColor.value,
        };
    });

    const animatedQrViewStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: qrViewScale.value }],
        };
    });


    const getIconName = (routeName: string) => {
        if (routeName === 'home') return isFocused ? 'home' : 'home-outline';
        if (routeName === 'favoritos') return isFocused ? 'star' : 'star-outline';
        if (routeName === 'qr code') return isFocused ? 'qr-code' : 'qr-code-outline';
        if (routeName === 'mapa') return isFocused ? 'map' : 'map-outline';
        if (routeName === 'eventos') return isFocused ? 'calendar-clear' : 'calendar-clear-outline';
        return 'help';
    };

    if (route.name === 'qr code') {
        return (
            <Pressable onPress={onPress}>
                <Animated.View style={[styles.qrTabButton, animatedQrViewStyle]}>
                    <Animated.View style={animatedIconStyle}>
                        <Ionicons
                            name={getIconName(route.name)}
                            size={24}
                            color={isFocused ? '#FFFFFF' : '#F9F9F9'} // Você também pode animar a cor
                        />
                    </Animated.View>
                    <Animated.Text style={[rootTexts.auxiliary, animatedQrTextStyle]}>
                        {route.name === 'qr code' ? 'QR Code' : null}
                    </Animated.Text>
                </Animated.View>
            </Pressable>
        )
    }

    return (
        <Pressable onPress={onPress} style={styles.tabButton}>
            <Animated.View style={animatedIconStyle}>
                <Ionicons
                    name={getIconName(route.name)}
                    size={24}
                    color={isFocused ? rootColors.vinho : rootColors.marrom} // Você também pode animar a cor
                />
            </Animated.View>
            <Animated.Text style={[rootTexts.auxiliary, animatedTextStyle]}>
                {route.name === 'home' ? 'Home' : null}
                {route.name === 'favoritos' ? 'Favoritos' : null}
                {route.name === 'mapa' ? 'Mapa' : null}
                {route.name === 'eventos' ? 'Eventos' : null}
            </Animated.Text>
        </Pressable>
    );
}

type CustomTabBarProps = {
    state: any;
    navigation: any;
};

// A barra principal que renderiza os botões
export default function CustomTabBar({ state, navigation }: CustomTabBarProps) {
    return (

        <View style={styles.tabBarContainer}>
            {state.routes.map((route: { key: string; name: string }, index: number) => {
                const isFocused: boolean = state.index === index;

                const onPress = (): void => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TabBarButton
                        key={route.key}
                        route={route}
                        isFocused={isFocused}
                        onPress={onPress}
                    />
                );
            })}
        </View>
    );
}

