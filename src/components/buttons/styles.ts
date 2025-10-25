import { rootColors } from "@/src/styles/styles";

export const styles = {
    buttonContainer: {
        padding: 25,
        backgroundColor: rootColors.vinho,
        borderRadius: 20,
        alignItems: "center" as const,
    },
    textButton: {
        color: rootColors.branco,
        fontSize: 24,
        fontWeight: "400" as const,
    }
}