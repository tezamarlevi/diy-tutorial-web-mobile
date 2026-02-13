import { Redirect } from 'expo-router';
import { useAuth } from '../src/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../src/theme';

export default function Index() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (isAuthenticated) {
        return <Redirect href="/home" />;
    }

    return <Redirect href="/login" />;
}
