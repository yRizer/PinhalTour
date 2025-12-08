import { rootColors, rootTexts } from "@/src/styles/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DefaultHeaderProps = {
    title: string;
    backTo?: () => void;
}

type MainHeaderProps = {
    onMenuPress?: () => void;
    onUserPress?: () => void;
}

export function DefaultHeader({ title, backTo = undefined }: DefaultHeaderProps) {

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

export function MainHeader({ onMenuPress, onUserPress }: MainHeaderProps) {
    return (
        <SafeAreaView style={styles.header}>
            <Pressable style={styles.menuButton} onPress={onMenuPress}>
                <MaterialCommunityIcons name="cog-outline" size={28} color={rootColors.marrom} />
            </Pressable>
            
            <Image 
                source={require('@/src/assets/images/logo/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            
            <Pressable style={styles.userButton} onPress={onUserPress}>
                <Ionicons name="person-circle-outline" size={32} color={rootColors.marrom} />
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: rootColors.branco,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    menuButton: {
        padding: 4,
    },
    logo: {
        width: 50,
        height: 50,
    },
    userButton: {
        padding: 4,
    },
});