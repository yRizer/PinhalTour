// app/(tabs)/_layout.js
import { rootColors } from '@/src/styles/styles';
import CustomTabBar from 'Components/tabBar'; // <-- Seu componente customizado
import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs
            // Diga ao Expo Router para usar seu componente como a TabBar
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="home" options={{ title: 'Home', headerTitleAlign: 'center', headerStyle: { backgroundColor: rootColors.branco } }} />
            <Tabs.Screen name="favoritos" options={{ title: 'Favoritos', headerTitleAlign: 'center', headerStyle: { backgroundColor: rootColors.branco } }} />
            <Tabs.Screen name="qr code" options={{ title: 'QR Code', headerTitleAlign: 'center', headerStyle: { backgroundColor: rootColors.branco } }} />
            <Tabs.Screen name="mapa" options={{ title: 'Mapa', headerTitleAlign: 'center', headerStyle: { backgroundColor: rootColors.branco } }} />
            <Tabs.Screen name="eventos" options={{ title: 'Eventos', tabBarBadge: 3, headerTitleAlign: 'center', headerStyle: { backgroundColor: rootColors.branco } }} />
        </Tabs>
    );
}
