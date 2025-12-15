import { Ionicons } from '@expo/vector-icons';
import { SheetUp } from 'Components/bottomSheets';
import { CarrosselImages, NavigationDots } from 'Components/carrossel';
import { DefaultHeader } from 'Components/header';
import * as NavigationBar from 'expo-navigation-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { rootColors } from '../styles/styles';
import { CONTENT_DATA } from './data/qrDescription';



export default function QRDescriptionScreen() {
    const { QRCode } = useLocalSearchParams();
    // const { data: response, loading, error } = useQRData(QRCode);
    const { width: windowWidth } = useWindowDimensions();
    const [images, setImages] = useState<any[] | undefined>(undefined);

    const accessKey = 'vjn-z0cbZF4Y0tEZmxv-varFcodbAR_apBuPjKcDigQ'; // Replace with your actual Unsplash Access Key

    async function getRandomUnsplashImages() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=6&query=igreja`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // When fetching multiple images, the API returns an array of image objects.
            if (Array.isArray(data)) {
                return data.map(image => image.urls.regular);
            }
            // Fallback for a single image response, although with `count`, it should be an array.
            return data.urls.regular;
        } catch (error) {
            console.error("Error fetching random Unsplash image:", error);
            return null;
        }
    }

    useEffect(() => {
        // Example usage:
        getRandomUnsplashImages().then(imageUrls => {
            if (imageUrls && Array.isArray(imageUrls)) {
                setImages(imageUrls);
            }
        });
    }, []);

    NavigationBar.setVisibilityAsync('hidden')

    let colection: any = null;

    // if (response?.status === 'success' && response.data) {
    //     [colection] = response.data;
    // }

    const renderFloatingButton = () => (
        <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleNewScan}
            activeOpacity={0.8}
        >
            <Ionicons name="qr-code" size={28} color="#FFFFFF" />
        </TouchableOpacity>
    );

    const handleNewScan = () => {
        router.dismissTo('/screens/qr code');
    };

    return (
        <View style={{ flex: 1 }}>
            <DefaultHeader title={'Igreja'} backTo={()=>{router.dismissTo('/screens/qr code')}}/>
            <SafeAreaProvider>
                <SafeAreaView style={[styles.container]} edges={['top']}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        {/* {loading && renderLoading()} */}

                        {/* {error && renderError()} */}

                        {/* {response?.status === 'error' && !loading && renderInvalidQRCode()} */}

                        {/* {colection && !loading && (
                            <>
                                <View style={{ position: "relative", backgroundColor: '#FFFFFF', flex: 1 }}>
                                    <View style={{ position: "relative" }}>
                                        <CarrosselImages images={colection.images} width={windowWidth} height={60} heightPercentage={true} />
                                        <View style={styles.navigationDotsContainer}>
                                            <NavigationDots images={colection.images} />
                                        </View>
                                    </View>

                                    <SheetUp
                                        SheetOverDrag={10}
                                        SetPosY={58}
                                        Percentage={true}
                                        Close={false}
                                        description={colection.descricao}
                                        floatingButton={renderFloatingButton()}
                                    />
                                </View>
                            </>
                        )} */}
                        {images && (
                            <View style={{ position: "relative", backgroundColor: '#FFFFFF', flex: 1 }}>
                                <View style={{ position: "relative" }}>
                                    <CarrosselImages images={images} width={windowWidth} height={60} heightPercentage={true} />
                                    <View style={styles.navigationDotsContainer}>
                                        <NavigationDots images={images} />
                                    </View>
                                </View>
                                <SheetUp
                                    SheetOverDrag={10}
                                    SetPosY={58}
                                    Percentage={true}
                                    Close={false}
                                    // description={'teste'}
                                    floatingButton={renderFloatingButton()}
                                    content={CONTENT_DATA}
                                />
                            </View>
                        )}
                    </GestureHandlerRootView>
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: rootColors.branco,
    },
    navigationDotsContainer: {
        bottom: 35,
        padding: 3,
        width: '25%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.28)",
        alignSelf: "center",
        borderRadius: 10,
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#7B1E3A',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#7B1E3A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
})