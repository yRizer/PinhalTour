import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { styles } from "./styles";

type MainTextInputProps = {
    placeholder?: string;
    marginInline?: number;
}

export default function MainTextInput({ placeholder, marginInline }: MainTextInputProps) {
    return (
        <View style={[styles.textInputContainer, { marginInline: marginInline || 0 }]}>
            <TextInput style={styles.textInput} placeholder={placeholder} />
            <Ionicons name="search" size={24} color="black" />
        </View>
    )
}