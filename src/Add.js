import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard} from 'react-native'
import React, { useState }  from 'react';
import { firebase } from '../config';

const Home = () => {
    const todoRef = firebase.firestore().collection('newData');
    const [addData, setAddData] = useState('');

    // add a new field
    const addField = () => {
        // check if we have new field data
        if(addData && addData.length > 0){
            // get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() =>{
                    // release the new field state
                    setAddData('');
                    // release KeyBoard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    // show an alert in case of error
                    alert(error);
                })
        }
    }

    return(
        <View style = {{flex:1, justifyContent:'center'}}>
            <View style = {styles.formContainer}>
                <TextInput
                style = {styles.input}
                placeholder='Add data'
                placeholderTextColor= '#aaaaaa'
                onChangeText={(heading) => setAddData(heading)}
                value = {addData}
                multiline = {true}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                />
                <TouchableOpacity style= {styles.button} onPress={addData}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
    },
    input : {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius:5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize:20
    }
})

export default Home