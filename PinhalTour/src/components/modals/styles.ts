import { rootColors } from "@/src/styles/styles";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalView: {
        width: "80%",
        height: "auto",
        minHeight: 200,
        margin: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalHead: {
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    modalIcon: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ee6b001e"
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 24,
        fontWeight: 500
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
    },
    closeButton: {
        width: 150,
        height: 45,
        backgroundColor: rootColors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
})