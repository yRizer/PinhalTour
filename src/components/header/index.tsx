import { rootColors, rootTexts } from "@/src/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    title: string;
    backTo?: () => void;
}

export function DefaultHeader({ title, backTo = undefined }: Props) {

    return (
        <SafeAreaView style={{ paddingVertical: 18, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: rootColors.branco, boxSizing: "border-box", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 3.84, elevation: 10 }}>
            {backTo && (
                <Pressable
                    style={{ justifyContent: "center", alignItems: "center", padding: 8, borderRadius: 100, position: "absolute", left: 12, bottom: 16 }}
                    onPress={backTo}
                >
                    <Ionicons name="arrow-back" size={24} color={rootColors.marrom} />
                </Pressable>
            )}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Text style={[rootTexts.subtitle, { fontWeight: "500" }]}>{title}</Text>
            </View>
        </SafeAreaView>
    )
}