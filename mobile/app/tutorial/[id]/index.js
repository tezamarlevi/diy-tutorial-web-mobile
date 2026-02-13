import { useEffect, useState, useCallback } from 'react';
import {
    View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../../src/api';
import { useAuth } from '../../../src/AuthContext';
import { COLORS, SHADOWS } from '../../../src/theme';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1612367990403-73ef3e67bc4f?q=80&w=800&auto=format&fit=crop';
const SCREEN_WIDTH = Dimensions.get('window').width;

function getYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*)/);
    return match && match[1].length === 11 ? match[1] : null;
}

export default function TutorialLearn() {
    const { id } = useLocalSearchParams();
    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get(`/tutorials/${id}`);
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

    const isCreator = tutorial?.createdBy?._id === user?.id;
    const youtubeId = getYouTubeId(tutorial?.videoUrl);

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
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>Tutorial</Text>
                {isCreator ? (
                    <View style={styles.headerActions}>
                        <TouchableOpacity onPress={() => router.push(`/tutorial/${id}/edit`)} style={styles.editBtn}>
                            <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
                            <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ width: 40 }} />
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Hero Image */}
                <Image source={{ uri: tutorial.image || DEFAULT_IMAGE }} style={styles.heroImage} />

                {/* Title & Meta */}
                <View style={styles.section}>
                    <Text style={styles.title}>{tutorial.title}</Text>
                    <View style={styles.metaRow}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{tutorial.category}</Text>
                        </View>
                        <View style={styles.badgeOutline}>
                            <Text style={styles.badgeOutlineText}>{tutorial.level}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={14} color={COLORS.textMuted} />
                            <Text style={styles.metaText}>{tutorial.duration} mins</Text>
                        </View>
                    </View>
                    <Text style={styles.author}>By {tutorial.createdBy?.name || 'Unknown'}</Text>
                </View>

                {/* Description */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>About This Tutorial</Text>
                    <Text style={styles.cardText}>{tutorial.description}</Text>
                </View>

                {/* YouTube Video */}
                {youtubeId && (
                    <View style={styles.card}>
                        <View style={styles.cardTitleRow}>
                            <Ionicons name="play-circle" size={20} color={COLORS.primary} />
                            <Text style={styles.cardTitle}>Video Tutorial</Text>
                        </View>
                        <View style={styles.videoContainer}>
                            <YoutubePlayer
                                height={Math.round((SCREEN_WIDTH - 72) * 9 / 16)}
                                videoId={youtubeId}
                                webViewProps={{ allowsInlineMediaPlayback: true }}
                            />
                        </View>
                    </View>
                )}

                {/* Steps */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Step-by-Step Guide</Text>
                    {tutorial.content.split('\n').map((line, i) => (
                        line.trim() ? (
                            <Text key={i} style={styles.stepText}>{line}</Text>
                        ) : null
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
        backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border,
    },
    backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surfaceAlt, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, flex: 1, textAlign: 'center' },
    headerActions: { flexDirection: 'row', gap: 8 },
    editBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#EBF5F0', justifyContent: 'center', alignItems: 'center' },
    deleteBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: COLORS.errorBg, justifyContent: 'center', alignItems: 'center' },
    scroll: { paddingBottom: 60 },
    heroImage: { width: '100%', height: 220 },
    section: { padding: 20 },
    title: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
    badge: { backgroundColor: COLORS.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    badgeText: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
    badgeOutline: { borderWidth: 1, borderColor: COLORS.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    badgeOutlineText: { color: COLORS.primary, fontSize: 12, fontWeight: '600' },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { fontSize: 12, color: COLORS.textMuted },
    author: { fontSize: 13, color: COLORS.textSecondary },
    card: { backgroundColor: COLORS.surface, marginHorizontal: 16, marginBottom: 16, borderRadius: 16, padding: 20, ...SHADOWS.small },
    cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
    cardTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
    cardText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22 },
    videoContainer: { borderRadius: 12, overflow: 'hidden' },
    stepText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22, marginBottom: 8 },
});
