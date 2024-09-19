import { Text, View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import MyText from '../components/MyText';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import MyDropdown from '../components/MyDropdown';
import MyButton from '../components/MyButton';
import detectDisease from '../algorithms/algo';
import { SafeAreaView } from 'react-native-safe-area-context';

const choice = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
]
const breathLong = [
    { label: '(a) >= 6 months', value: true },
    { label: '(b) < 6 months', value: false }
]
const peakFlow = [
    { label: '(a) < 80%', value: true },
    { label: '(b) >= 80%', value: false }
]
const ageDisease = [
    { label: '(a) >= 40 years of age', value: true },
    { label: '(b) < 40 years of age', value: false }
]

const disease = [
    { label: '(a)asthma', value: 'asthma' },
    { label: '(b)allergic rhinitis', value: 'allergic rhinitis' },
    { label: '(c)eczema', value: 'eczema' },
    { label: '(d)others', value: 'others' },
]

const Index = () => {
    const [isFocus, setIsFocus] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [info, setInfo] = React.useState({
        name: '',
        isbreath: '',
        isbreathlong: '',
        iscough: '',
        agedisease: '',
        isasymptomatic: '',
        dosmoke: '',
        dosmokeyear: '',
        dosmokebiomass: '',
        dosmokeyearduration: '',
        peakflow: ''
    });

    const handleSubmit = () => {
        const result = detectDisease(info)
        console.log(result)
        !show ? setShow(true) : setShow(false)
    }

    const handleReset = () => {
        setInfo({
            name: '',
            isbreath: '',
            isbreathlong: '',
            iscough: '',
            agedisease: '',
            isasymptomatic: '',
            dosmoke: '',
            dosmokeyear: '',
            dosmokebiomass: '',
            dosmokeyearduration: '',
            peakflow: ''
        })
    }

    const handleInputChange = (key) => (text) => {
        setInfo({ ...info, [key]: text });
    };

    console.log(info);
    return (
        <SafeAreaView>
            <ScrollView className='ml-5 space-y-5'>
                <View className='flex-row items-center w-[80%] h-10'>
                    <MyText className='h-8'>Enter your Name : </MyText>
                    <TextInput
                        className='h-8 w-[100%]'
                        inputMode='text'
                        cursorColor='#786452'
                        placeholder='Name input'
                        onChangeText={handleInputChange('name')}
                    />
                </View>
                <View className='flex-row items-center w-[80%] h-10'>
                    <MyText className='h-8'>Do you have Breathlessness ?  </MyText>
                    <MyDropdown
                        data={choice}
                        change={handleInputChange('isbreath')}
                    />
                </View>
                <View className={`flex-row items-center w-[80%] h-10 ${info.isbreath.value ? 'visible' : 'hidden'}`}>
                    <MyText className='h-8'>For how Long ? </MyText>
                    <MyDropdown
                        data={breathLong}
                        change={handleInputChange('isbreathlong')}
                    />
                </View>
                {/* <View className={`flex-row items-center w-[80%] h-10 ${info.isbreath.value == 'Yes' ? 'visible' : 'hidden' }`}>
        <MyText className='h-8'>From what Age ? </MyText>
        <TextInput
          className='h-8 w-[100%]'
          inputMode='numeric'
          cursorColor='#786452'
          placeholder='Age'
          onChangeText={handleInputChange('isbreathage')}
        />
      </View> */}
                <View className={`flex-row items-center w-[80%] h-10 ${info.isbreathlong.value ? 'visible' : 'hidden'}`}>
                    <MyText className='h-8'>Do you have cough ?  </MyText>
                    <MyDropdown
                        data={choice}
                        change={handleInputChange('iscough')}
                    />
                </View>
                {/* <View className={`flex-row items-center w-[80%] h-10 ${info.iscough.value == 'Yes' ? 'visible' : 'hidden' }`}>
        <MyText className='h-8'>For how Long ? </MyText>
        <TextInput
          className='h-8 w-[100%]'
          inputMode='numeric'
          cursorColor='#786452'
          placeholder='(in months)'
          onChangeText={handleInputChange('iscoughlong')}
        />
      </View>
      <View className={`flex-row items-center w-[80%] h-10 ${info.iscough.value == 'Yes' ? 'visible' : 'hidden' }`}>
        <MyText className='h-8'>From what Age ? </MyText>
        <TextInput
          className='h-8 w-[100%]'
          inputMode='numeric'
          cursorColor='#786452'
          placeholder='Age'
          onChangeText={handleInputChange('iscoughage')}
        />
      </View> 
      <View className={`flex-row items-center w-[80%] h-10 ${info.iscough.value == 'Yes' ? 'visible' : 'hidden' }`}>
        <MyText className='h-8'>From what Age ? </MyText>
        <TextInput
          className='h-8 w-[100%]'
          inputMode='text'
          cursorColor='#786452'
          placeholder='Yes/No(strictly)'
          onChangeText={handleInputChange('iscoughexpectoration')}
        />
      </View> */}
                <View className={`flex-row items-center w-[80%] h-15 space-x-3 ${info.iscough.value ? 'visible' : 'hidden'}`}>
                    <MyText className='h-8'>PeakFlow meter Value </MyText>
                    <MyDropdown
                        data={peakFlow}
                        change={handleInputChange('peakflow')}
                    />
                </View>
                <View className={`flex-row items-center w-[55%] h-15 space-x-3 ${info.peakflow.value ? 'visible' : 'hidden'}`}>
                    <MyText className='h-8'>Age of onset of symptomss?(Consider the earliest age)</MyText>
                    <MyDropdown
                        data={ageDisease}
                        change={handleInputChange('agedisease')}
                    />
                </View>

                <View className={`flex-row items-center w-[80%] h-15 space-x-3 ${info.agedisease.value ? 'visible' : 'hidden'}`}>
                    <MyText className='h-8'>Do you smoke?</MyText>
                    <Dropdown
                        className='w-[40%]'
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={choice}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={handleInputChange('dosmoke')} />
                </View>
                <View className={`flex-row items-center w-[80%] h-15 space-x-3 ${info.dosmoke.value ? 'visible' : 'hidden'}`}>
                    <MyText className='h-8'>How many pack per year ?</MyText>
                    <TextInput
                        className='h-8 w-[100%]'
                        inputMode='numeric'
                        cursorColor='#786452'
                        placeholder='Packs per year'
                        onChangeText={handleInputChange('dosmokeyear')}
                    />
                </View>
                {/* <View className={`flex-row items-center w-[80%] h-15 space-x-3 ${info.dosmoke.value ? 'visible' : 'hidden'}`}>
        <MyText className='h-8'>Were you exposed directly to biomass smoke while cooking food?</MyText>
        <MyDropdown
          data={choice}
          change={handleInputChange('dosmokebiomass')}
        />
      </View> */}
                <View className={`flex-row items-center w-[80%] h-15 space-x-3 ${info.dosmoke.value ? 'visible' : 'hidden'}`}>
                    <MyText className='h-8'>total duration of exposure: </MyText>
                    <TextInput
                        className='h-8 w-[100%]'
                        inputMode='numeric'
                        cursorColor='#786452'
                        placeholder='Duration(in years)'
                        onChangeText={handleInputChange('dosmokeyearduration')}
                    />
                </View>
                <View className={`flex-row items-center w-[80%] h-15 space-x-3 ${(parseInt(info.dosmokeyear) >= 10) || (parseInt(info.dosmokeyear) < 10 && parseInt(info.dosmokeyearduration) >= 20) ? 'visible' : 'hidden'}`}>
                    <MyText className='h-8'>Did you have intermittent asymptomatic periods &gt; 7 days?</MyText>
                    <MyDropdown
                        data={choice}
                        change={handleInputChange('isasymptomatic')}
                    />
                </View>
                {/* <View className='flex-row items-center w-[55%] h-15 space-x-3'>
        <MyText className='h-8'>Does anybody in your family (blood relative) have history of atopy?</MyText>
        <MyDropdown
          data={disease}
          change={handleInputChange('dorelative')}
        />
      </View>
      <View className={`flex-row items-center w-[80%] h-15 space-x-3 ${info.dorelative.value ? 'visible' : 'hidden'}`}>
        <MyText className='h-8'>total duration of exposure: </MyText>
        <Dropdown
          className='w-[40%]'
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={disease}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleInputChange('disease')} />
      </View> */}
                <View className='flex-row space-x-2 items-center justify-center'>
                    <View>
                        <MyButton
                            title={`${show ? 'Hide Result' : 'Get Result'}`}
                            color='#00f2f2'
                            onPress={handleSubmit}
                        />
                    </View>
                    <View>
                        <MyButton
                            title='Reset'
                            color='#00f2f2'
                            onPress={handleReset}
                        />
                    </View>
                </View>
                <View>
                    <Text className={`${show ? 'visible' : 'hidden'}`} id='result'>Result = {show ? detectDisease(info) : ''}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
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

export default Index