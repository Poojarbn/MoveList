import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, RefreshControl, Animated } from 'react-native';
import { fetchMoviesRequest } from '../redux/actions/movieActions';
import { useNavigation } from '@react-navigation/native';

const MoviesScreen = () => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { movies, loading, error } = useSelector(state => state.movies);
    const [errorMessage, setErrorMessage] = useState(null);
    const errorOpacity = useState(new Animated.Value(0))[0];

    useEffect(() => {
        dispatch(fetchMoviesRequest('https://api.sampleapis.com/movies/animation'));
    }, [dispatch]);

    const onRefresh = () => {
        dispatch(fetchMoviesRequest());
    };


    useEffect(() => {
        if (error) {
            setErrorMessage('No Data Found. Please Try Again!!.');
            Animated.timing(errorOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
        } else {
            setErrorMessage(null);
            Animated.timing(errorOpacity, { toValue: 0, duration: 1000, useNativeDriver: true }).start();
        }
    }, [error, errorOpacity]);

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigate('MovieDetails', { movie: item })}>
            <View style={styles.movieItem}>
                <Image source={{ uri: item.posterURL }} style={styles.poster} resizeMode="cover" />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.imdbId}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            ) : (
                <>
                    {movies?.length > 0 ? (
                        <FlatList
                            data={movies}
                            renderItem={renderMovieItem}
                            keyExtractor={(item) => item.id.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={onRefresh}
                                    colors={["black"]}
                                    progressBackgroundColor="#000000"
                                />
                            }
                        />
                    ) : (
                        <Animated.View style={[styles.errorContainer, { opacity: errorOpacity }]}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </Animated.View>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    movieItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6,
    },
    poster: {
        width: 120,
        height: 180,
        marginRight: 10,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666666',
    },
    errorContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default MoviesScreen;
