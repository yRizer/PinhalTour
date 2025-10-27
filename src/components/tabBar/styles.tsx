import { rootColors } from '@/src/styles/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'relative',
        flexDirection: 'row',
        height: 80,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrTabButton: {
        top: -30,
        width: 70,
        height: 70,
        borderRadius: 35,
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