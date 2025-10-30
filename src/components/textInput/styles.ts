import { rootColors } from "@/src/styles/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    textInputContainer: {
        paddingBlock: 8,
        paddingInline: 15,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        boxSizing: 'border-box',
        backgroundColor: rootColors.branco,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: rootColors.marrom
    }
});