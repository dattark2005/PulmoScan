import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';


const MyDropdown = ({ data, change }) => {
    const [isFocus, setIsFocus] = React.useState(false);
    return (
        <>
            <Dropdown
                className='w-[40%]'
                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select' : '...'}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={change}
                 />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        padding: 16,
    },
    dropdown: {
        height: 40,
        borderColor: '#786452',
        borderWidth: 1,
        borderRadius: 8,
        width: 100,
        paddingHorizontal: 5,
    },
    icon: {
        marginRight: 0,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default MyDropdown