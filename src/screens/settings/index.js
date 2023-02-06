import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import BottomSheet from '../../components/BottomSheet'

const Settings = () => {
    const bottomSheetRef = useRef(null)

    const onBottomSheetHandler = useCallback(() => {
        const isActive = bottomSheetRef?.current?.isActive() // check if bottom sheet is open
        if (isActive) {
          bottomSheetRef?.current?.scrollTo(0)
        } else {
          bottomSheetRef?.current?.scrollTo(-200)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text>Settings View</Text>
            <Button title='toggle' onPress={onBottomSheetHandler} />
            <BottomSheet ref={bottomSheetRef}></BottomSheet>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    }
})