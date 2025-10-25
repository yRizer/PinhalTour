import { rootColors } from "@/src/styles/styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DimensionValue, Pressable, Text } from "react-native";
import { styles } from "./styles";

type ButtonProps = {
    text: string;
    textColor?: string;
    width?: DimensionValue;
    outLine?: { borderWidth: number, borderColor: string };
    backgroundColor?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
}

export default function Button({ text, width = '100%', outLine, backgroundColor, textColor, onPress, leftIcon, rightIcon }: ButtonProps) {
    return (
        <Pressable
            style={[styles.buttonContainer,
            {
                width: width,
                backgroundColor: backgroundColor ? backgroundColor : rootColors.vinho,
                borderWidth: outLine?.borderWidth,
                borderColor: outLine?.borderColor,
            }
            ]}
            onPress={onPress}>

            <Text style={[styles.textButton, { color: textColor ? textColor : rootColors.branco }]}>{text}</Text>

            {leftIcon && <Ionicons name={leftIcon} size={30} color={textColor ? textColor : rootColors.branco} style={{ position: 'absolute', left: 30 }} />}
            {rightIcon && <Ionicons name={rightIcon} size={30} color={textColor ? textColor : rootColors.branco} style={{ position: 'absolute', right: 30 }} />}
            
        </Pressable>
    );
}