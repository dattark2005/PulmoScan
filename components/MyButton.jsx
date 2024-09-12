import { View, Text, Button } from 'react-native'
import React from 'react'

const MyButton = ({ title, color, onPress }) => {
    return (
        <Button
            title={title}
            color={color}
            onPress={onPress}
        />
    )
}

export default MyButton