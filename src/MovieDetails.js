import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MovieDetails = ({ route }) => {
    const { movie } = route.params;


    // Dummy description
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum velit ut elit lobortis, nec faucibus risus volutpat. Sed sed neque velit. Nam a nisl leo. Sed suscipit nisl at tincidunt placerat. Nulla at malesuada odio. Vivamus eu lacus non magna pharetra venenatis. Proin eget erat vel quam ultricies egestas. Duis volutpat, nunc sit amet sagittis vestibulum, nunc est scelerisque erat, id consequat ex nisl eu sem.";
    return (
        <View style={styles.container}>
            <Image source={{ uri: movie.posterURL }} style={styles.poster} resizeMode="cover" />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>IMDb ID:</Text>
                    <Text style={styles.detailValue}>{movie.imdbId}</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    poster: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    detailValue: {
        fontSize: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: '#555',
    },
});

export default MovieDetails;
