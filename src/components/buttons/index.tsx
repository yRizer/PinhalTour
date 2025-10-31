import { rootColors, rootTexts } from "@/src/styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DimensionValue, Pressable, Text, ViewStyle } from "react-native";
import { styles } from "./styles";

type ButtonProps = {
    text: string;
    textColor?: string;
    backgroundColor?: string;
    iconSize?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    width?: DimensionValue;
    outLine?: { borderWidth: number, borderColor: string };
    leftIcon?: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    onPress?: () => void;
}

export function Button({ text, width = '100%', outLine, backgroundColor, textColor, onPress, leftIcon, rightIcon, iconSize = 30, paddingVertical = 20, paddingHorizontal = 20 }: ButtonProps) {
    return (
        <Pressable
            style={[styles.buttonContainer as ViewStyle,
            {
                width: width,
                backgroundColor: backgroundColor ? backgroundColor : rootColors.vinho,
                borderWidth: outLine?.borderWidth,
                borderColor: outLine?.borderColor,
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal
            }
            ]}
            onPress={onPress}>

            {leftIcon && (leftIcon in Ionicons.glyphMap) &&
                <Ionicons name={leftIcon as keyof typeof Ionicons.glyphMap} size={iconSize} color={textColor ? textColor : rootColors.branco} style={{ position: 'absolute', left: 30 }} />}
            {leftIcon && (leftIcon in MaterialCommunityIcons.glyphMap) &&
                <MaterialCommunityIcons name={leftIcon as keyof typeof MaterialCommunityIcons.glyphMap} size={iconSize} color={textColor ? textColor : rootColors.branco} style={{ position: 'absolute', left: 30 }} />}

            <Text style={[styles.textButton, { color: textColor ? textColor : rootColors.branco }]}>{text}</Text>

            {rightIcon && (rightIcon in Ionicons.glyphMap) &&
                <Ionicons name={rightIcon as keyof typeof Ionicons.glyphMap} size={iconSize} color={textColor ? textColor : rootColors.branco} style={{ position: 'absolute', right: 30 }} />}
            {rightIcon && (rightIcon in MaterialCommunityIcons.glyphMap) &&
                <MaterialCommunityIcons name={rightIcon as keyof typeof MaterialCommunityIcons.glyphMap} size={iconSize} color={textColor ? textColor : rootColors.branco} style={{ position: 'absolute', right: 30 }} />}

        </Pressable>
    );
}

export function RightIconButton({ width, backgroundColor, outLine, paddingVertical, paddingHorizontal, text, rightIcon, iconSize, textColor, onPress }: ButtonProps) {
    return (
        <Pressable key='googleMapsButton'
            onPress={onPress}
            style={[styles.RightIconButtonContainer as ViewStyle, {
                width: width,
                backgroundColor: backgroundColor ? backgroundColor : rootColors.vinho,
                borderWidth: outLine?.borderWidth,
                borderColor: outLine?.borderColor,
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal
            }
            ]}>
            <Text style={rootTexts.text}>{text}</Text>
            {rightIcon && (rightIcon in Ionicons.glyphMap) &&
                <Ionicons name={rightIcon as keyof typeof Ionicons.glyphMap} size={iconSize} color={textColor ? textColor : rootColors.branco} />}
            {rightIcon && (rightIcon in MaterialCommunityIcons.glyphMap) &&
                <MaterialCommunityIcons name={rightIcon as keyof typeof MaterialCommunityIcons.glyphMap} size={iconSize} color={textColor ? textColor : rootColors.branco} />}
        </Pressable>
    )
}

