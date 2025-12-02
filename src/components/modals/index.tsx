import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, Pressable, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { styles } from "./styles";

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

type WarningProps = {
    visible?: boolean;
    onClose?: () => void;
}

export function InvalidQRCodeModal({ visible = false, onClose = () => { } }: WarningProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose} // Permite fechar com o botão "voltar" do Android
            style={styles.centeredView}
        >
            <View style={styles.centeredView}>
                <Animated.View style={styles.modalView}>
                    <Animated.View style={styles.modalIcon} exiting={ZoomOut}>
                        <AnimatedIonicons
                            entering={ZoomIn.springify().damping(35).stiffness(200).duration(200)}
                            exiting={ZoomOut.duration(200)}
                            name={"warning"}
                            size={50}
                            color="#ee6b00ff"
                        />
                    </Animated.View>
                    <Animated.Text
                        style={styles.modalTitle}
                        entering={FadeInRight}
                        exiting={FadeOut}
                    >QR Code inválido!</Animated.Text>

                    <Pressable style={[styles.closeButton, { marginTop: 30 }]} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Ok</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </Modal >
    )
}