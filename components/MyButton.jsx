import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

const MyButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 9,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#10ad93',
        marginBottom: 17,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 2,
    },
    
});

export default MyButton