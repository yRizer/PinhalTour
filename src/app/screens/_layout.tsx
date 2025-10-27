// app/(tabs)/_layout.js
import CustomTabBar from 'Components/tabBar'; // <-- Seu componente customizado
import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs
            // Diga ao Expo Router para usar seu componente como a TabBar
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="favoritos" options={{ title: 'Favoritos' }} />
            <Tabs.Screen name="qr code" options={{ title: 'QR Code' }} />
            <Tabs.Screen name="mapa" options={{ title: 'Mapa' }} />
            <Tabs.Screen name="eventos" options={{ title: 'Eventos' }} />
        </Tabs>
    );
}
