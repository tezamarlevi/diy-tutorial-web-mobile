import { useEffect, useState, useCallback } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/AuthContext';
import api from '../src/api';
import { COLORS, SHADOWS } from '../src/theme';
import { Ionicons } from '@expo/vector-icons';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1612367990403-73ef3e67bc4f?q=80&w=800&auto=format&fit=crop';

const TutorialCard = ({ tutorial, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <Image source={{ uri: tutorial.image || DEFAULT_IMAGE }} style={styles.cardImage} />
        <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{tutorial.category}</Text>
        </View>
        <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={2}>{tutorial.title}</Text>
            <View style={styles.cardMeta}>
                <Ionicons name="time-outline" size={14} color={COLORS.textMuted} />
                <Text style={styles.metaText}>{tutorial.duration} mins</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{tutorial.level || 'Beginner Friendly'}</Text>
            </View>
            <Text style={styles.cardDesc} numberOfLines={2}>{tutorial.description}</Text>
            <Text style={styles.author}>By {tutorial.createdBy?.name || 'Unknown'}</Text>
        </View>
    </TouchableOpacity>
);

export default function Home() {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { logout } = useAuth();
    const router = useRouter();

    const fetchTutorials = async () => {
        try {
            const res = await api.get('/tutorials');
            setTutorials(res.data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchTutorials();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTutorials();
    }, []);

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>DIY Tutorials</Text>
                    <Text style={styles.headerSubtitle}>Discover & learn new skills</Text>
                </View>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/create')}>
                        <Ionicons name="add" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tutorial List */}
            <FlatList
                data={tutorials}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TutorialCard
                        tutorial={item}
                        onPress={() => router.push(`/tutorial/${item._id}`)}
                    />
                )}
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Ionicons name="book-outline" size={64} color={COLORS.textMuted} />
                        <Text style={styles.emptyText}>No tutorials yet</Text>
                        <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/create')}>
                            <Text style={styles.emptyBtnText}>Create the first one!</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.primary,
    },
    headerSubtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 10,
    },
    addBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.errorBg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    cardImage: {
        width: '100%',
        height: 180,
    },
    categoryBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    categoryText: {
        color: COLORS.white,
        fontSize: 11,
        fontWeight: '600',
    },
    cardBody: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 8,
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    metaDot: {
        color: COLORS.textMuted,
        marginHorizontal: 2,
    },
    cardDesc: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 18,
        marginBottom: 8,
    },
    author: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    empty: {
        alignItems: 'center',
        paddingTop: 80,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginTop: 12,
        marginBottom: 16,
    },
    emptyBtn: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
    },
    emptyBtnText: {
        color: COLORS.white,
        fontWeight: '600',
    },
});
