import { rootColors } from '@/src/styles/styles';
import { Dimensions, StyleSheet } from 'react-native';

const DIMENSIONS = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        width: DIMENSIONS.width,
        backgroundColor: rootColors.branco,
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    dragIcon: {
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16,
        width: 124,
        height: 8,
        borderRadius: 4,
        backgroundColor: rootColors.verde,
    },
    textDescription: {
        marginBlock: 16,
        marginInline: 35,
        fontSize: 20,
        color: '#333',
        // alignSelf: 'center',
    },
    floatingButtonContainer: {
        position: 'absolute',
        top: -80, // Posiciona o botão 80px acima do topo do sheet
        right: 20,
        zIndex: 1001,
    }
});