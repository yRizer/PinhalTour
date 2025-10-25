import { StyleSheet } from "react-native";

export const rootColors = {
    primary: "#4CAF50",
    vinho: "#8C3B4A",
    background: "#F5EFE0",
    marrom: "#4A3F35",
    amarelo: "#F9A826",
    branco: "#F9F6F0"
}


export const rootStyles = StyleSheet.create({
})

export const rootTexts = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: rootColors.marrom,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: rootColors.marrom,
    },
    text: {
        fontSize: 16,
        color: rootColors.marrom,
    }
})