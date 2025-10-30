import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { styles } from "./styles";

type MainTextInputProps = {
    placeholder?: string;
}

export default function MainTextInput({ placeholder }: MainTextInputProps) {
    return (
        <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder={placeholder} />
            <Ionicons name="search" size={24} color="black" />
        </View>
    )
}