import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import api from '../src/api';
import { COLORS, SHADOWS } from '../src/theme';
import { Ionicons } from '@expo/vector-icons';

const LEVEL_OPTIONS = ['Beginner Friendly', 'Intermediate', 'Advanced Level'];

export default function Create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('Beginner Friendly');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!title || !description || !content || !duration || !category) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        setLoading(true);
        try {
            await api.post('/tutorials', {
                title, description, content, videoUrl, duration: Number(duration), category, level, image,
            });
            Alert.alert('Success', 'Tutorial created!', [
                { text: 'OK', onPress: () => router.replace('/home') },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to create tutorial');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={22} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Tutorial</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
                    <InputField label="Title *" placeholder="e.g. How to Build a Birdhouse" value={title} onChangeText={setTitle} icon="create-outline" />
                    <InputField label="Image URL" placeholder="https://example.com/image.jpg" value={image} onChangeText={setImage} icon="image-outline" keyboardType="url" />
                    <InputField label="YouTube URL" placeholder="https://youtube.com/watch?v=..." value={videoUrl} onChangeText={setVideoUrl} icon="logo-youtube" keyboardType="url" />

                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <InputField label="Category *" placeholder="Woodworking" value={category} onChangeText={setCategory} icon="pricetag-outline" />
                        </View>
                        <View style={styles.rowItem}>
                            <InputField label="Duration *" placeholder="30" value={duration} onChangeText={setDuration} icon="time-outline" keyboardType="numeric" />
                        </View>
                    </View>

                    {/* Level Picker */}
                    <Text style={styles.label}>Level *</Text>
                    <View style={styles.levelRow}>
                        {LEVEL_OPTIONS.map((lvl) => (
                            <TouchableOpacity
                                key={lvl}
                                style={[styles.levelChip, level === lvl && styles.levelChipActive]}
                                onPress={() => setLevel(lvl)}
                            >
                                <Text style={[styles.levelChipText, level === lvl && styles.levelChipTextActive]}>{lvl}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <InputField label="Description *" placeholder="Brief summary..." value={description} onChangeText={setDescription} icon="document-text-outline" multiline />
                    <InputField label="Steps / Content *" placeholder="Step-by-step instructions..." value={content} onChangeText={setContent} icon="list-outline" multiline tall />

                    <TouchableOpacity style={[styles.submitBtn, loading && { opacity: 0.6 }]} onPress={handleSubmit} disabled={loading}>
                        <Text style={styles.submitText}>{loading ? 'Creating...' : 'Create Tutorial'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const InputField = ({ label, placeholder, value, onChangeText, icon, multiline, tall, keyboardType }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputWrapper, multiline && styles.inputWrapperMultiline]}>
            <Ionicons name={icon} size={18} color={COLORS.textMuted} style={styles.inputIcon} />
            <TextInput
                style={[styles.input, multiline && styles.multilineInput, tall && { height: 120 }]}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textMuted}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : 'center'}
                keyboardType={keyboardType}
                autoCapitalize={keyboardType === 'url' ? 'none' : 'sentences'}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
        backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border,
    },
    backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surfaceAlt, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
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
    submitBtn: {
        backgroundColor: COLORS.primary, borderRadius: 14, height: 54,
        justifyContent: 'center', alignItems: 'center', marginTop: 16, ...SHADOWS.small,
    },
    submitText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
