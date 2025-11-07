import { RightIconButton } from "@/src/components/buttons";
import { rootColors, rootTexts } from "@/src/styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, Linking, Text, View } from "react-native";
import { Gesture, GestureDetector, ScrollView } from "react-native-gesture-handler";
import Animated, { SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { styles } from "./styles";

const DIMENSIONS = Dimensions.get('window');

type SheetProps = {
    SheetHeight?: number;
    Percentage?: boolean;
    SheetOverDrag?: number;
    onClose?: () => void;
    Close?: boolean;
    description?: string;
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
        estrelas: number,
        descricao: string,
        avaliacoes: {
            nome: string,
            avaliacao: number,
            comentario: string,
            data: string,
        }[],
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
        SheetHeight = 600,
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
        SheetHeight = SetPosY + 50;
    } else {
        SheetHeight = DIMENSIONS.height - SetPosY;
        console.log(SetPosY, SheetHeight, DIMENSIONS.height);
    }


    const offset = useSharedValue(0);

    const pan = Gesture.Pan()
        .onChange(function (event) {
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
                offset.value = withSpring(-SetPosY + 100, { damping: 5, stiffness: 25, mass: 0.5 });
            } else if (offset.value > 0.5) {
                scheduleOnRN(onClose);
            } else {
                offset.value = withSpring(0, { damping: 5, stiffness: 30, mass: 0.5 });
            }
        })

    const native = Gesture.Native();
    const composed = Gesture.Simultaneous(pan, native);

    const translateY = useAnimatedStyle(() => ({
        transform: [{ translateY: SetPosY + offset.value }],
    }))

    const openMap = async () => {

        const url = `https://www.google.com/maps?q=${mapsData?.longitude},${mapsData?.latitude}z=14`;

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                console.log('Não foi possível abrir o mapa. Certifique-se de que o Google Maps está instalado no dispositivo.');
            }
        } catch (error) {
            console.log('Ocorreu um erro ao tentar abrir o mapa.');
        }
    };

    async function navigateTo() {
        console.log('Navegando para:', mapsData?.latitude, mapsData?.longitude);
    }

    function marcarNoCalendario() {
        console.log('Marcar no calendário');
    }

    function selectedMapsData({ mapsData = undefined }: SheetProps) {

        function commentComponent({ index, avaliacao }: { index: number, avaliacao: { nome: string, avaliacao: number, comentario: string, data: string } }) {
            return (
                <View key={index} style={styles.comentaryContainer} >
                    <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                        <View style={{ height: '100%' }}>
                            <Image source={{ uri: 'https://placehold.co/400/png' }} style={{ width: 60, height: 60, borderRadius: 50 }} />
                        </View>
                        <View style={{ flex: 1, height: '100%', gap: 10 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={rootTexts.subtitle}>{avaliacao.nome}</Text>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        {Array.from({ length: avaliacao.avaliacao }).map((_, i) => (
                                            <MaterialCommunityIcons key={i} name="star" size={12} color={rootColors.amarelo} />
                                        ))}

                                        {Array.from({ length: 5 - Math.floor(avaliacao.avaliacao) }).map((_, i) => (
                                            <MaterialCommunityIcons key={i} name="star-outline" size={12} color={rootColors.amarelo} />
                                        ))}
                                    </View>
                                    <Text style={[rootTexts.auxiliary, { opacity: 0.7 }]}>{avaliacao.data}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Text style={rootTexts.text}>{avaliacao.comentario}</Text>
                </View>
            )
        }

        return (
            mapsData &&
            <ScrollView style={styles.placeDescriptionContainer}>
                <View style={{ gap: 10 }}>
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
                </View>
                <View style={{ gap: 10 }}>
                    <Text style={[rootTexts.text, { opacity: 0.7 }]}>{mapsData.endereco}</Text>
                    <View style={styles.placeFooterContainer}>
                        <View style={styles.placeOptionsContainer}>
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
                            <RightIconButton text="Marcar Rota"
                                width={'auto'}
                                backgroundColor={rootColors.branco}
                                textColor={rootColors.marrom}
                                outLine={{ borderWidth: 1, borderColor: rootColors.marrom }}
                                rightIcon="navigate"
                                paddingHorizontal={10}
                                paddingVertical={5}
                                iconSize={24}
                                onPress={navigateTo}
                            />
                            <RightIconButton text="Marcar no Calendário"
                                width={'auto'}
                                backgroundColor={rootColors.branco}
                                textColor={rootColors.marrom}
                                outLine={{ borderWidth: 1, borderColor: rootColors.marrom }}
                                rightIcon="calendar-clear"
                                paddingHorizontal={10}
                                paddingVertical={5}
                                iconSize={24}
                                onPress={marcarNoCalendario}
                            />
                        </View>
                    </View>
                    <View style={{ gap: 10 }}>
                        <Text style={rootTexts.subtitle}>Avaliações</Text>
                        <View style={[styles.placeAvaliationsContainer]}
                        >
                            {mapsData.avaliacoes.map((avaliacao, index) => (
                                commentComponent({ index, avaliacao })
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
    return (
        <>
            {floatingButton && (
                <Animated.View style={[styles.floatingButtonContainer, translateY]}>
                    {floatingButton}
                </Animated.View>
            )}
            <GestureDetector gesture={composed}>
                <Animated.View
                    style={[styles.container, { height: SheetHeight }, translateY]}
                    entering={SlideInDown.springify(100).damping(5)}
                    exiting={SlideOutDown}>
                    <View style={styles.dragIcon} />
                    {description && (<Text style={styles.textDescription}>{description}</Text>)}
                    {mapsData &&
                        selectedMapsData({ mapsData })
                    }
                </Animated.View>
            </GestureDetector >
        </>
    );
}