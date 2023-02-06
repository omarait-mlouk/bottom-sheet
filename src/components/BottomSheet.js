import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const WINDOW_HEIGHT = Dimensions.get('window').height
const MAX_TRANSLATE_Y = -WINDOW_HEIGHT + 50

const BottomSheet = forwardRef(({ children }, ref) => {
    const translateY = useSharedValue(0)
    const prevTranslateY = useSharedValue(0)
    const active = useSharedValue(false)

    const scrollTo = useCallback((destination) => {
        "worklet";
        active.value = destination !== 0
        translateY.value = withSpring(destination, { damping: 50 })
    }, [])

    const isActive = useCallback(() => {
        return active.value
    }, [])

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
        scrollTo,
        isActive,
    ])

    const onGestureHandler = Gesture.Pan()
    .onStart(() => {
        prevTranslateY.value = translateY.value
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + prevTranslateY.value
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
        if (translateY.value > -WINDOW_HEIGHT/3) {
            scrollTo(0)
            //translateY.value = withSpring(0, { damping: 50 })
        } else if (translateY.value < -WINDOW_HEIGHT/1.5) {
            scrollTo(MAX_TRANSLATE_Y)
            //translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 })
        }
    })

    const rStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [25, 5],
            Extrapolate.CLAMP
        )
        return {
            borderRadius,
            transform: [
                { translateY: translateY.value }
            ]
        }
    })

    return (
        <GestureDetector gesture={onGestureHandler}>
            <Animated.View style={[styles.bottomSheet, rStyle]} >
                <View style={styles.line} />
                {children}
            </Animated.View>
        </GestureDetector>
    )
})

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheet: {
        height: WINDOW_HEIGHT,
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: WINDOW_HEIGHT,
        borderRadius: 25,
    },
    line: {
        height: 4,
        width: 75,
        borderRadius: 2,
        backgroundColor: 'gray',
        alignSelf: 'center',
        marginVertical: 15,
    }
})