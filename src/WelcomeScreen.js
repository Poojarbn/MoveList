import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const WelcomeScreen = ({ navigation }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(100)).current;
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();

            const timer = setTimeout(() => {
                navigation.navigate('MoviesScreen');
            }, 4000);

            return () => clearTimeout(timer);
        } else {
            opacity.setValue(0);
            translateY.setValue(100);
        }
    }, [isFocused, navigation, opacity, translateY]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animationContainer, { opacity, transform: [{ translateY }] }]}>
                <Text style={styles.welcomeText}>Welcome to My App!</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    animationContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333333',
        textShadowColor: '#cccccc',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
});

export default WelcomeScreen;
