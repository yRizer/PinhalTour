import { Pressable, Text } from "react-native";
import { styles } from "./styles";

type ButtonProps = {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    return (
        <Pressable style={[styles.buttonContainer]}>
            <Text style={styles.textButton}>{text}</Text>
        </Pressable>
    );
}