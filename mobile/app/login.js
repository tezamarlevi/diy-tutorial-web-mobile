import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView,
    Platform, ScrollView, Alert,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../src/AuthContext';
import { COLORS, SHADOWS } from '../src/theme';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (result.success) {
            router.replace('/home');
        } else {
            Alert.alert('Error', result.error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="hammer" size={32} color={COLORS.white} />
                    </View>
                    <Text style={styles.title}>DIY Tutorials</Text>
                    <Text style={styles.subtitle}>Welcome back! Sign in to continue.</Text>
                </View>

                {/* Form */}
                <View style={styles.card}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="you@example.com"
                                placeholderTextColor={COLORS.textMuted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor={COLORS.textMuted}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textMuted} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleLogin} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <Link href="/register" style={styles.link}>Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.textSecondary,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 24,
        ...SHADOWS.medium,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceAlt,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 14,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 15,
        color: COLORS.text,
    },
    eyeIcon: {
        padding: 4,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 14,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        ...SHADOWS.small,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    link: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});
