import { RightIconButton } from "@/src/components/buttons";
import { rootColors, rootTexts } from "@/src/styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, Linking, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { styles } from "./styles";

const DIMENSIONS = Dimensions.get('window');

type SheetProps = {
    SheetHeight?: number;
    Percentage?: boolean;
    SheetOverDrag?: number;
    onClose?: () => void;
    Close?: boolean;
    description: string;
    SetPosY?: number;
    Expand?: boolean;
    floatingButton?: React.ReactNode;
    mapsData?: {
        titulo: string,
        endereco: string,
        latitude: number,
        longitude: number,
        image: string,
        distancia: number,
        estrelas: number
    };
}

export function SheetDown(
    {
        SheetHeight = 100,
        Percentage = false,
        SheetOverDrag = 30,
        onClose = () => { },
        Close = true,
        description

    }: SheetProps) {

    if (Percentage === true) {
        SheetHeight = DIMENSIONS.height * (SheetHeight / 100);
    }

    const offset = useSharedValue(0);

    function close() {
        onClose()
    }

    const pan = Gesture.Pan().onChange(function (event) {
        const offsetDelta = event.changeY + offset.value;

        const clamp = Math.max(-SheetOverDrag, offsetDelta)

        offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp)
    })
        .onFinalize(function () {
            if (Close) {
                if (offset.value < SheetHeight / 3) {
                    offset.value = withSpring(0);
                } else {
                    offset.value = withTiming(SheetHeight, {}, function () {
                        // runOnJS(close)();
                    });
                }
            } else {
                offset.value = withSpring(0);
            }
        })

    const translateY = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }))

    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                style={[styles.container, { height: SheetHeight }, translateY]}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}>

                <MaterialCommunityIcons name="minus"
                    size={24}
                    color="#000"
                    style={styles.dragIcon} />

                <Text style={styles.textDescription}>{description}</Text>
            </Animated.View>
        </GestureDetector>
    );
}

export function SheetUp(
    {
        SetPosY = 300,
        SheetHeight = 100,
        Percentage = false,
        SheetOverDrag = 10,
        onClose = () => { },
        Expand = true,
        description,
        floatingButton,
        mapsData = undefined

    }: SheetProps
) {
    if (Percentage === true) {
        SetPosY = DIMENSIONS.height * (SetPosY / 100);
    }

    const offset = useSharedValue(0);

    const pan = Gesture.Pan().onChange(function (event) {
        const offsetDelta = event.changeY + offset.value;
        const clamp = Math.min(SheetOverDrag, Math.max(-SheetOverDrag, offsetDelta))

        if (offsetDelta < -SetPosY + 100) {
            offset.value = offsetDelta > -SetPosY + 100 ? offsetDelta : withSpring(-SetPosY + 100 + clamp);
        } else {
            offset.value = offsetDelta < 0 ? offsetDelta : withSpring(clamp)
        }

    })
        .onFinalize(function (event) {
            if (event.velocityY > 2000) {
                offset.value = withSpring(0, { damping: 5, stiffness: 30, mass: 0.5 });
            } else if ((-offset.value > DIMENSIONS.height / 3 || event.velocityY < -2000) && Expand) {
                offset.value = withSpring(-SetPosY + 100, { damping: 5, stiffness: 50, mass: 0.5 });
            } else {
                offset.value = withSpring(0, { damping: 5, stiffness: 50, mass: 0.5 });
            }
        })

    const translateY = useAnimatedStyle(() => ({
        transform: [{ translateY: SetPosY + offset.value }],
    }))

    const openMap = async () => {
        console.log(mapsData?.latitude, mapsData?.longitude);
        
    const url = `https://www.google.com/maps?q=${mapsData?.longitude},${mapsData?.latitude}z=14`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        console.log(url);
        
        await Linking.openURL(url);
        
      } else {
        console.log('Não foi possível abrir o mapa. Certifique-se de que o Google Maps está instalado no dispositivo.');
      }
    } catch (error) {
      console.log('Ocorreu um erro ao tentar abrir o mapa.');
    }
  };

    return (
        <>
            {floatingButton && (
                <Animated.View style={[styles.floatingButtonContainer, translateY]}>
                    {floatingButton}
                </Animated.View>
            )}
            <GestureDetector gesture={pan}>
                <Animated.View
                    style={[styles.container, { height: SheetHeight }, translateY]}
                    entering={SlideInDown.springify(100).damping(5)}
                    exiting={SlideOutDown}>
                    <View style={styles.dragIcon} />
                    <Text style={styles.textDescription}>{description}</Text>
                    {mapsData &&
                        (
                            <View style={styles.placeDescriptionContainer}>
                                <Text style={rootTexts.title}>{mapsData.titulo}</Text>

                                <View style={styles.placeHeaderContainer}>
                                    <Image source={{ uri: mapsData.image }} style={styles.placeHeaderImage}></Image>
                                    <View style={styles.placeHeaderInfoContainer}>
                                        <View style={{ flexDirection: 'row' }}>

                                            {Array.from({ length: mapsData.estrelas }).map((_, i) => (
                                                <MaterialCommunityIcons key={i} name="star" size={20} color={rootColors.amarelo} />
                                            ))}

                                            {Array.from({ length: 5 - Math.floor(mapsData.estrelas) }).map((_, i) => (
                                                <MaterialCommunityIcons key={i} name="star-outline" size={20} color={rootColors.amarelo} />
                                            ))}

                                        </View>
                                        <Text style={[rootTexts.auxiliary, { opacity: 0.5 }]}>({mapsData.estrelas})</Text>
                                    </View>
                                </View>
                                <Text style={[rootTexts.text, { opacity: 0.7 }]}>{mapsData.endereco}</Text>
                                <View style={styles.placeFooterContainer}>
                                    <View style={styles.placeFooterOptionsContainer}>
                                        <RightIconButton text="Google Maps"
                                            width={'auto'}
                                            backgroundColor={rootColors.branco}
                                            textColor={rootColors.marrom}
                                            outLine={{ borderWidth: 1, borderColor: rootColors.marrom }}
                                            rightIcon="google-maps"
                                            paddingHorizontal={10}
                                            paddingVertical={5}
                                            iconSize={24}
                                            onPress={openMap}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </Animated.View>
            </GestureDetector >
        </>
    );
}