import {
    Animated,
    ImageBackground,
    ScrollView,
    StyleSheet,
    useAnimatedValue,
    useWindowDimensions
} from "react-native";

type DotsProps = {
    images: Array<{
        title: string,
        color: string,
    }>;
}

type CarrosselImagesProps = {
    images: any[];
    width: number;
    height: number;
    heightPercentage?: boolean;
}

const { width: windowWidth, height: windowHeight } = useWindowDimensions();
var scrollX = useAnimatedValue(0);

export function CarrosselImages({ images, width, height, heightPercentage = false }: CarrosselImagesProps) {
    scrollX = useAnimatedValue(0);
    console.log('Carregando carrossel');
    
    if (heightPercentage) {
        height = windowHeight * (height / 100);
    }
    return (
        <ScrollView
            style={{ width: width, height: height }}
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ])}
            scrollEventThrottle={1}>
            {images.map((source, index) => {
                console.log(source);
                return (
                    <ImageBackground
                        source={{ uri: source }}
                        style={{ width: width, height: height }}
                        key={index}>
                    </ImageBackground>
                )
            })}
        </ScrollView>
    )
};

export function NavigationDots({ images }: DotsProps) {
    const dots = images.map((image, imageIndex) => {
        const flex = scrollX.interpolate({
            inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
            ],
            outputRange: [1, 3, 1],
            extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
            inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { flex, opacity }]}
            />
        );
    })

    return (dots)
}

const styles = StyleSheet.create({
    normalDot: {
        flex: 1,
        height: 3,
        borderRadius: 4,
        backgroundColor: '#f5f5f5ff',
        marginHorizontal: 4,
    },
})