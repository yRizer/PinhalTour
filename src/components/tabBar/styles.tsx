import { rootColors } from '@/src/styles/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'relative',
        flexDirection: 'row',
        height: 80,
        backgroundColor: rootColors.branco,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrTabButton: {
        top: -30,
        width: 90,
        height: 90,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: rootColors.vinho,
        alignSelf: 'center',
        shadowColor: rootColors.vinho,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    }
});