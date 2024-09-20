import { Text, View, TextInput, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import MyText from '../components/MyText';
import MyButton from '../components/MyButton';
import detectDisease from '../algorithms/algo';
import { firebase } from '../config';

const choice = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
];

const gender = [
    { label: 'Male', value: 'Male'},
    { label: 'Female', value: 'Female'},
    { label: 'Other', value: 'Other'}
];

const breathLong = [
    { label: '>= 6 months', value: true },
    { label: '< 6 months', value: false }
];
const peakFlow = [
    { label: '(a) < 80%', value: true },
    { label: '(b) >= 80%', value: false }
];
const ageDisease = [
    { label: '>= 40 years of age', value: true },
    { label: '< 40 years of age', value: false }
];

const disease = [
    { label: 'asthma', value: 'asthma' },
    { label: 'allergic rhinitis', value: 'allergic rhinitis' },
    { label: 'eczema', value: 'eczema' },
    { label: 'others', value: 'others' },
    { label: 'none', value: 'none' },
]

const Index = () => {
    const [currentStep, setCurrentStep] = React.useState(1);  
    const [show, setShow] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isFocus, setIsFocus] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [info, setInfo] = React.useState({
        name: '',
        gender: '',
        height: '',
        isbreath: '',
        isbreathlong: '',
        breathlessAge: '',
        iscough: '',
        isExpectoration: '',
        peakflow: '',
        agedisease: '',
        isasymptomatic: '',
        dosmoke: '',
        dosmokeyear: '',
        dosmokebiomass: '',
        dosmokeyearduration: '',
        dorelative: '',
    });

    const handleInputChange = (key) => (text) => {
        setInfo({ ...info, [key]: text });
        
    };

    const handleSubmit = () => {
        const result = detectDisease(info);
        console.log(result);
        !show ? setShow(true) : setShow(false);

        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {        
            createdAt: timestamp,   
            ...info,       
            diseaseDetected: result,
        };

        // Save the data to Firebase
        firebase.firestore().collection('userData')
            .add(data)
            .then(() => {
                console.log('Data saved successfully:', data);
            })
            .catch((error) => {
                console.error('Error saving data:', error);
                setError('Error saving data to the database.');
                setModalVisible(true); // Show error in the modal
            });
    };

    const isEmpty = (value) => value === null || value === undefined || value === '';

    const handleContinue = () => {
        let newError = '';

        // Validation based on current step
        if (currentStep === 1) {
            if (isEmpty(info.name) || isEmpty(info.gender) || isEmpty(info.height)) {
                newError = 'Please fill out all fields.';
            }
        } else if (currentStep === 2) {
            if (isEmpty(info.isbreath)) {
                newError = 'Please answer the question.';
            } else if (info.isbreath === true && (isEmpty(info.isbreathlong) || isEmpty(info.breathlessAge))) {
                newError = 'Please answer all questions.';
            }
        } else if (currentStep === 3) {
            if (isEmpty(info.iscough)) {
                newError = 'Please answer the question.';
            } else if (info.iscough === true && isEmpty(info.isExpectoration)) {
                newError = 'Please answer all questions.';
            }
        } else if (currentStep === 4 && isEmpty(info.peakflow)) {
            newError = 'Please fill the peak flow meter reading.';
        } else if (currentStep === 5) {
            if (isEmpty(info.agedisease) || isEmpty(info.dosmoke)) {
                newError = 'Please answer all questions.';
            } else if (info.dosmoke === true && isEmpty(info.dosmokeyear)) {
                newError = 'Please answer all questions.';
            }
        } else if (currentStep === 6) {
            if (isEmpty(info.dosmokebiomass)) {
                newError = 'Please answer the question.';
            } else if (info.dosmokebiomass === true && isEmpty(info.dosmokeyearduration)) {
                newError = 'Please write duration of exposure to biomass.';
            }
        } else if (currentStep === 7) {
            if (info.gender === 'Female' && isEmpty(info.isasymptomatic)) {
                newError = 'Please answer all questions.';
            }
            if (isEmpty(info.dorelative)) {
                newError = 'Please answer the question.';
            }
        }

        if (newError) {
            setError(newError);
            setModalVisible(true);
        } else {
            setError('');
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1); 
    };

    const handleReset = () => {
        setInfo({
            name: '',
            gender: '',
            height: '',
            isbreath: '',
            isbreathlong: '',
            breathlessAge: '',
            iscough: '',
            isExpectoration: '',
            peakflow: '',
            agedisease: '',
            isasymptomatic: '',
            dosmoke: '',
            dosmokeyear: '',
            dosmokebiomass: '',
            dosmokeyearduration: '',
            dorelative: '',
        });
        setCurrentStep(1);
    };   

    return (
        <SafeAreaView>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{error}</Text>
                    <MyButton
                        title="OK"
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    />
                </View>
            </View>
        </Modal>

                {/* Step 1: Name, Gender, Height */}
                {currentStep === 1 && (
                    <View style = {styles.formContainer}>
                        <View style={styles.inputRow}>
                            <MyText>Name:    </MyText>
                            <TextInput
                                style={styles.inputField}
                                inputMode="text"
                                cursorColor="#786452"
                                placeholder="Enter your name here"
                                value={info.name}
                                onChangeText={handleInputChange('name')}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText>Gender:   </MyText>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                placeholderStyle={styles.placeholderStyle} 
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle} 
                                iconStyle={styles.iconStyle} 
                                data={gender} 
                                maxHeight={300}
                                labelField="label"
                                valueField="value" 
                                placeholder={!isFocus ? 'Select' : '...'}
                                value={info.gender} 
                                onFocus={() => setIsFocus(true)} 
                                onBlur={() => setIsFocus(false)} 
                                onChange={item => {
                                    handleInputChange('gender')(item.value); // Update state with selected value
                                }}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText>Height:   </MyText>
                            <TextInput
                                style={styles.inputField}
                                inputMode="numeric"
                                cursorColor="#786452"
                                value={info.height}
                                placeholder="Enter your height (in cm)"
                                onChangeText={(text) => {
                                    const numericValue = text.replace(/[^0-9.]/g, '');
                                    const validValue = numericValue.split('.').length > 2 
                                        ? numericValue.substring(0, numericValue.lastIndexOf('.')) 
                                        : numericValue;
                                    
                                    handleInputChange('height')(validValue);
                                }}
                            />
                        </View>
                        <MyButton title="Continue" onPress={handleContinue} />
                    </View>
                )}

                {/* Step 2: Breathlessness, Long Breath */}
                {currentStep === 2 && (
                    <View style = {styles.formContainer}>
                        <View style={styles.inputRow}>
                            <MyText>Do you have Breathlessness?     </MyText>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                placeholderStyle={styles.placeholderStyle} 
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle} 
                                iconStyle={styles.iconStyle} 
                                data={choice} 
                                maxHeight={300}
                                labelField="label"
                                valueField="value" 
                                placeholder={!isFocus ? 'Select' : '...'}
                                value={info.isbreath} 
                                onFocus={() => setIsFocus(true)} 
                                onBlur={() => setIsFocus(false)} 
                                onChange={item => {
                                    handleInputChange('isbreath')(item.value); // Update state with selected value
                                }}
                            />
                        </View>
                        {info.isbreath === true && (
                            <>
                                <View style={styles.inputRow}>
                                    <MyText>For how long?     </MyText>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                        placeholderStyle={styles.placeholderStyle} 
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle} 
                                        iconStyle={styles.iconStyle} 
                                        data={breathLong} 
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value" 
                                        placeholder={!isFocus ? 'Select' : '...'}
                                        value={info.isbreathlong} 
                                        onFocus={() => setIsFocus(true)} 
                                        onBlur={() => setIsFocus(false)} 
                                        onChange={item => {
                                            handleInputChange('isbreathlong')(item.value); // Update state with selected value
                                        }}
                                    />
                                </View>
                                <View style={styles.inputRow}>
                                    <MyText>From what age?     </MyText>
                                    <TextInput
                                        style={styles.sInputField}
                                        inputMode="numeric"
                                        cursorColor="#786452"
                                        value={info.breathlessAge}
                                        placeholder="Age in years"
                                        onChangeText={handleInputChange('breathlessAge')}
                                    />
                                </View>
                            </>
                        )}
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {/* Step 3: Cough */}
                {currentStep === 3 && (
                    <View style = {styles.formContainer}>
                        <View style={styles.inputRow}>
                            <MyText>Do you have a Cough?    </MyText>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                placeholderStyle={styles.placeholderStyle} 
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle} 
                                iconStyle={styles.iconStyle} 
                                data={choice} 
                                maxHeight={300}
                                labelField="label"
                                valueField="value" 
                                placeholder={!isFocus ? 'Select' : '...'}
                                value={info.iscough} 
                                onFocus={() => setIsFocus(true)} 
                                onBlur={() => setIsFocus(false)} 
                                onChange={item => {
                                    handleInputChange('iscough')(item.value); // Update state with selected value
                                }}
                            />
                        </View>
                        {info.iscough === true && (
                            <>
                            <View style={styles.inputRow}>
                                <MyText>Does your cough have expectoration(mucus/phlegm)?   </MyText>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                    placeholderStyle={styles.placeholderStyle} 
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle} 
                                    iconStyle={styles.iconStyle} 
                                    data={choice} 
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value" 
                                    placeholder={!isFocus ? 'Select' : '...'}
                                    value={info.isExpectoration} 
                                    onFocus={() => setIsFocus(true)} 
                                    onBlur={() => setIsFocus(false)} 
                                    onChange={item => {
                                        handleInputChange('isExpectoration')(item.value); // Update state with selected value
                                    }}
                                />
                            </View>
                            </>
                        )}
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {/* Step 4: PeakFlow meter reading */}
                {currentStep === 4 && (
                   <View style = {styles.formContainer}>
                        <Text style={styles.headerText}>Peak Flow Meter Reading</Text>
                            <TextInput
                                style={styles.peakIn}
                                inputMode='numeric'
                                cursorColor='#786452'
                                value={info.peakflow}
                                onChangeText={(text) => {
                                    const numericValue = text.replace(/[^0-9.]/g, '');
                                    const validValue = numericValue.split('.').length > 2 
                                        ? numericValue.substring(0, numericValue.lastIndexOf('.')) 
                                        : numericValue;
                                    
                                    handleInputChange('peakflow')(validValue);
                                }}
                            />
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                   </View> 
                )}

                {/* Step 4: Age of Disease Onset, Smoking */}
                {currentStep === 5 && (
                    <View style = {styles.formContainer}>
                        <View style={styles.inputRow}>
                            <MyText>Age of onset of symptoms?(Consider the earliest age)        </MyText>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                placeholderStyle={styles.placeholderStyle} 
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle} 
                                iconStyle={styles.iconStyle} 
                                data={ageDisease} 
                                maxHeight={300}
                                labelField="label"
                                valueField="value" 
                                placeholder={!isFocus ? 'Select' : '...'}
                                value={info.agedisease} 
                                onFocus={() => setIsFocus(true)} 
                                onBlur={() => setIsFocus(false)} 
                                onChange={item => {
                                    handleInputChange('agedisease')(item.value); // Update state with selected value
                                }}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText>Do you smoke?       </MyText>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                placeholderStyle={styles.placeholderStyle} 
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle} 
                                iconStyle={styles.iconStyle} 
                                data={choice} 
                                maxHeight={300}
                                labelField="label"
                                valueField="value" 
                                placeholder={!isFocus ? 'Select' : '...'}
                                value={info.dosmoke} 
                                onFocus={() => setIsFocus(true)} 
                                onBlur={() => setIsFocus(false)} 
                                onChange={item => {
                                    handleInputChange('dosmoke')(item.value); // Update state with selected value
                                }}
                            />
                        </View>
                        {info.dosmoke === true && (
                            <>
                            <View style={styles.inputRow}>
                                <MyText className='h-8'>How many packs per year?     </MyText>
                                <TextInput
                                    style={styles.numInput}
                                    inputMode='numeric'
                                    cursorColor='#786452'
                                    value={info.dosmokeyear}
                                    onChangeText={(text) => {
                                        const numericValue = text.replace(/[^0-9.]/g, '');
                                        const validValue = numericValue.split('.').length > 2 
                                            ? numericValue.substring(0, numericValue.lastIndexOf('.')) 
                                            : numericValue;
                                        
                                        handleInputChange('dosmokeyear')(validValue);
                                    }}                                    
                                />
                            </View> 
                            </>
                        )}
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {currentStep === 6 && (
                    <View style = {styles.formContainer}>
                        <View style={styles.inputRow}>
                            <MyText>Were you exposed to biomass smoke while cooking?    </MyText>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                placeholderStyle={styles.placeholderStyle} 
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle} 
                                iconStyle={styles.iconStyle} 
                                data={choice} 
                                maxHeight={300}
                                labelField="label"
                                valueField="value" 
                                placeholder={!isFocus ? 'Select' : '...'}
                                value={info.dosmokebiomass} 
                                onFocus={() => setIsFocus(true)} 
                                onBlur={() => setIsFocus(false)} 
                                onChange={item => {
                                    handleInputChange('dosmokebiomass')(item.value); // Update state with selected value
                                }}
                            />
                        </View>
                        {info.dosmokebiomass === true && (
                            <>
                            <View style={styles.inputRow}>
                                <MyText>Total duration of exposure:     </MyText>
                                <TextInput
                                    style={styles.numInput}
                                    inputMode='numeric'
                                    cursorColor='#786452'
                                    value={info.dosmokeyearduration}
                                    onChangeText={handleInputChange('dosmokeyearduration')}
                                />
                            </View> 
                            </>
                        )}
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {currentStep === 7 && (
                    <View style = {styles.formContainer}>
                        {info.gender === 'Female' && (
                            <>
                            <View style = {styles.inputRow}>
                                <MyText>Do you get asymptomatic periods(i.e.&gt; 7 days)?               </MyText>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                    placeholderStyle={styles.placeholderStyle} 
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle} 
                                    iconStyle={styles.iconStyle} 
                                    data={choice} 
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value" 
                                    placeholder={!isFocus ? 'Select' : '...'}
                                    value={info.isasymptomatic} 
                                    onFocus={() => setIsFocus(true)} 
                                    onBlur={() => setIsFocus(false)} 
                                    onChange={item => {
                                        handleInputChange('isasymptomatic')(item.value); // Update state with selected value
                                    }}
                                />
                            </View>
                            </>
                        )}
                        <View style = {styles.inputRow}>
                            <MyText>Does anyone in your family have history of atopy?</MyText>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]} 
                                placeholderStyle={styles.placeholderStyle} 
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle} 
                                iconStyle={styles.iconStyle} 
                                data={disease} 
                                maxHeight={300}
                                labelField="label"
                                valueField="value" 
                                placeholder={!isFocus ? 'Select' : '...'}
                                value={info.dorelative} 
                                onFocus={() => setIsFocus(true)} 
                                onBlur={() => setIsFocus(false)} 
                                onChange={item => {
                                    handleInputChange('dorelative')(item.value); // Update state with selected value
                                }}
                            />
                        </View>
                        <MyButton title="Get Result" color="#00f2f2"  onPress={() => {
                                                            handleSubmit();  
                                                            handleContinue(); 
                                                        }} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {/* Final: Show Result */}
                {currentStep === 8 && (
                    <View style = {styles.formContainer}>
                        <View className="flex-row space-x-2 items-center justify-center">
                            {show && <Text id="result" style={styles.result}>Result = {detectDisease(info)}</Text>}
                            <MyButton title="Reset" color="#00f2f2" onPress={handleReset} />
                        </View>
                    </View>
                )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the view takes full screen height
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
    },
    formContainer: {
        width: '90%', 
        padding: 20, 
        borderColor: '#786452',
        borderWidth: 2, 
        borderRadius: 10, 
        backgroundColor: '#f9f9f9',
        alignItems: 'justify', 
        margin: 20,
        marginVertical: '60%',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '80%', 
        height: 50, 
    },
    headerText: {
        alignSelf:'center',
        fontSize: 25,
        fontWeight: '800',
        fontStyle: 'italic'
    },
    inputField: {
        width: '100%', 
        height: 40,
        borderColor: '#786452',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    sInputField: {
        width: '100%', 
        flex: 2,   
        height: 40,
        borderColor: '#786452',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    numInput: {
        height: 40,                
        width: 55,             
        borderColor: '#786452',    
        borderWidth: 1,            
        paddingHorizontal: 8,      
        borderRadius: 5,           
        marginVertical: 10,
        //textAlign: 'center',
    },
    peakIn: {
        height: 40,                
        width: '50%',             
        alignSelf: 'center',
        borderColor: '#786452',    
        borderWidth: 1,
        borderRadius: 5,           
        marginVertical: 25,
        textAlign: 'center', 
        letterSpacing: 4,
    },
    result: {
        fontSize: 19,             
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#000',            
        textAlign: 'center',      
        marginVertical: 30,       
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    // dropdown
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

export default Index;
