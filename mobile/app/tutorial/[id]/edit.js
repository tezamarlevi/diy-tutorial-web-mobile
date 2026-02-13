import { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../../src/api';
import { useAuth } from '../../../src/AuthContext';
import { COLORS, SHADOWS } from '../../../src/theme';
import { Ionicons } from '@expo/vector-icons';

const LEVEL_OPTIONS = ['Beginner Friendly', 'Intermediate', 'Advanced Level'];

export default function EditTutorial() {
    const { id } = useLocalSearchParams();
    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get(`/tutorials/${id}`);
                if (res.data.createdBy?._id !== user?.id) {
                    Alert.alert('Error', 'You can only edit your own tutorials');
                    router.back();
                    return;
                }
                setTutorial(res.data);
            } catch (e) {
                Alert.alert('Error', 'Failed to load tutorial');
                router.back();
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const update = (key, val) => setTutorial((prev) => ({ ...prev, [key]: val }));

    const handleSave = async () => {
        if (!tutorial.title || !tutorial.description || !tutorial.content || !tutorial.duration || !tutorial.category) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }
        setSaving(true);
        try {
            await api.put(`/tutorials/${id}`, { ...tutorial, duration: Number(tutorial.duration) });
            Alert.alert('Success', 'Tutorial updated!', [
                { text: 'OK', onPress: () => router.back() },
            ]);
        } catch (e) {
            Alert.alert('Error', 'Failed to update');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = () => {
        Alert.alert('Delete Tutorial', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    try {
                        await api.delete(`/tutorials/${id}`);
                        router.replace('/home');
                    } catch (e) {
                        Alert.alert('Error', 'Failed to delete');
                    }
                },
            },
        ]);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (!tutorial) return null;

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={22} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Tutorial</Text>
                    <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
                        <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
                    <Field label="Title *" value={tutorial.title} onChangeText={(v) => update('title', v)} icon="create-outline" />
                    <Field label="Image URL" value={tutorial.image} onChangeText={(v) => update('image', v)} icon="image-outline" />
                    <Field label="YouTube URL" value={tutorial.videoUrl} onChangeText={(v) => update('videoUrl', v)} icon="logo-youtube" />

                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <Field label="Category *" value={tutorial.category} onChangeText={(v) => update('category', v)} icon="pricetag-outline" />
                        </View>
                        <View style={styles.rowItem}>
                            <Field label="Duration *" value={String(tutorial.duration)} onChangeText={(v) => update('duration', v)} icon="time-outline" keyboardType="numeric" />
                        </View>
                    </View>

                    {/* Level Picker */}
                    <Text style={styles.label}>Level</Text>
                    <View style={styles.levelRow}>
                        {LEVEL_OPTIONS.map((lvl) => (
                            <TouchableOpacity key={lvl} style={[styles.levelChip, tutorial.level === lvl && styles.levelChipActive]} onPress={() => update('level', lvl)}>
                                <Text style={[styles.levelChipText, tutorial.level === lvl && styles.levelChipTextActive]}>{lvl}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Field label="Description *" value={tutorial.description} onChangeText={(v) => update('description', v)} icon="document-text-outline" multiline />
                    <Field label="Steps / Content *" value={tutorial.content} onChangeText={(v) => update('content', v)} icon="list-outline" multiline tall />

                    <TouchableOpacity style={[styles.saveBtn, saving && { opacity: 0.6 }]} onPress={handleSave} disabled={saving}>
                        <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const Field = ({ label, value, onChangeText, icon, multiline, tall, keyboardType }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputWrapper, multiline && styles.inputWrapperMultiline]}>
            <Ionicons name={icon} size={18} color={COLORS.textMuted} style={styles.inputIcon} />
            <TextInput
                style={[styles.input, multiline && styles.multilineInput, tall && { height: 120 }]}
                value={value || ''}
                onChangeText={onChangeText}
                placeholderTextColor={COLORS.textMuted}
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : 'center'}
                keyboardType={keyboardType}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
        backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border,
    },
    backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surfaceAlt, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
    deleteBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.errorBg, justifyContent: 'center', alignItems: 'center' },
    form: { padding: 20, paddingBottom: 60 },
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 6 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
        borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 12,
    },
    inputWrapperMultiline: { alignItems: 'flex-start', paddingTop: 12 },
    inputIcon: { marginRight: 8 },
    input: { flex: 1, height: 48, fontSize: 14, color: COLORS.text },
    multilineInput: { height: 80, paddingTop: 0 },
    row: { flexDirection: 'row', gap: 12 },
    rowItem: { flex: 1 },
    levelRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    levelChip: {
        flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border,
        backgroundColor: COLORS.surface, alignItems: 'center',
    },
    levelChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    levelChipText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary },
    levelChipTextActive: { color: COLORS.white },
    saveBtn: {
        backgroundColor: COLORS.primary, borderRadius: 14, height: 54,
        justifyContent: 'center', alignItems: 'center', marginTop: 16, ...SHADOWS.small,
    },
    saveBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
