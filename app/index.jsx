import { Text, View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import MyText from '../components/MyText';
import MyDropdown from '../components/MyDropdown';
import MyButton from '../components/MyButton';
import detectDisease from '../algorithms/algo';
import { AuthErrorCodes } from 'firebase/auth';

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
    const [currentStep, setCurrentStep] = React.useState(1);  // To track current form step
    const [show, setShow] = React.useState(false);
    const [info, setInfo] = React.useState({
        name: '',
        gender: '',
        height: '',
        isbreath: '',
        isbreathlong: '',
        breathlessAge: '',
        iscough: '',
        isExpectoration: '',
        agedisease: '',
        isasymptomatic: '',
        dosmoke: '',
        dosmokeyear: '',
        dosmokebiomass: '',
        dosmokeyearduration: '',
        peakflow: ''
    });

    const handleInputChange = (key) => (text) => {
        setInfo({ ...info, [key]: text });
    };

    const handleSubmit = () => {
        const result = detectDisease(info);
        console.log(result);
        !show ? setShow(true) : setShow(false);
    };

    const handleContinue = () => {
        setCurrentStep(currentStep + 1); 
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
            iscough: '',
            agedisease: '',
            isasymptomatic: '',
            dosmoke: '',
            dosmokeyear: '',
            dosmokebiomass: '',
            dosmokeyearduration: '',
            peakflow: ''
        });
        setCurrentStep(1);  // Reset to step 1
    };   

    return (
        <SafeAreaView>
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
                                onChangeText={handleInputChange('name')}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText>Gender:   </MyText>
                            <MyDropdown
                                data={gender}
                                change={handleInputChange('gender')}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText>Height:   </MyText>
                            <TextInput
                                style={styles.inputField}
                                inputMode="text"
                                cursorColor="#786452"
                                placeholder="Enter your height (in cm)"
                                onChangeText={handleInputChange('height')}
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
                            <MyDropdown
                                data={choice}
                                change={handleInputChange('isbreath')}
                            />
                        </View>
                        {/* {info.isbreath === true && ( */}
                            <View style={styles.inputRow}>
                                <MyText>If yes, for how long?     </MyText>
                                <MyDropdown
                                    data={breathLong}
                                    change={handleInputChange('isbreathlong')}
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <MyText>From what age?     </MyText>
                                <TextInput
                                    style={styles.sInputField}
                                    inputMode="text"
                                    cursorColor="#786452"
                                    placeholder="Age in years"
                                    onChangeText={handleInputChange('breathlessAge')}
                                />
                            </View>
                        {/* )} */}
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {/* Step 3: Cough */}
                {currentStep === 3 && (
                    <View style = {styles.formContainer}>
                        <View style={styles.inputRow}>
                            <MyText>Do you have a Cough?    </MyText>
                            <MyDropdown
                                data={choice}
                                change={handleInputChange('iscough')}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText>If yes, with expectoration?   </MyText>
                            <MyDropdown
                                data={choice}
                                change={handleInputChange('isExpectoration')}
                            />
                        </View>
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {/* Step 4: PeakFlow meter reading */}
                {currentStep === 4 && (
                   <View style = {styles.formContainer}>
                        <Text style={styles.headerText}>Peak Flow Meter Reading</Text>
                            {/* <MyDropdown
                                data={peakFlow}
                                change={handleInputChange('peakflow')}
                            /> */}
                            <TextInput
                                style={styles.peakIn}
                                inputMode='numeric'
                                cursorColor='#786452'
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
                            <MyDropdown
                                data={ageDisease}
                                change={handleInputChange('agedisease')}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText>Do you smoke?       </MyText>
                            <MyDropdown
                                data={choice}
                                change={handleInputChange('dosmoke')}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText className='h-8'>If yes, how many packs per year?     </MyText>
                            <TextInput
                                style={styles.numInput}
                                inputMode='numeric'
                                cursorColor='#786452'
                                onChangeText={(text) => {
                                    const numericValue = text.replace(/[^0-9.]/g, '');
                                    
                                    const validValue = numericValue.split('.').length > 2 
                                        ? numericValue.substring(0, numericValue.lastIndexOf('.')) 
                                        : numericValue;
                                    
                                    handleInputChange('dosmokeyear')(validValue);
                                }}
                            />
                        </View> 
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {currentStep === 6 && (
                    <View style = {styles.formContainer}>
                        <View style={styles.inputRow}>
                            <MyText>Were you exposed to biomass smoke while cooking?    </MyText>
                            <MyDropdown
                                data={choice}
                                change={handleInputChange('dosmokebiomass')}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <MyText>If yes, total duration of exposure:     </MyText>
                            <TextInput
                                style={styles.numInput}
                                inputMode='numeric'
                                cursorColor='#786452'
                                onChangeText={handleInputChange('dosmokeyearduration')}
                            />
                        </View> 
                        <MyButton title="Continue" color="#00f2f2" onPress={handleContinue} />
                        <MyButton title="Previous" color="#00f2f2" onPress={handlePrev} />
                    </View>
                )}

                {currentStep === 7 && (
                    <View style = {styles.formContainer}>
                        {/* {gender === 'Female' && ( */}
                            <View style = {styles.inputRow}>
                                <MyText>Do you get asymptomatic periods(i.e.&gt; 7 days)?               </MyText>
                                <MyDropdown
                                    data={choice}
                                    change={handleInputChange('isasymptomatic')}
                                />
                            </View>
                        {/* )} */}
                        <View style = {styles.inputRow}>
                            <MyText>Does anyone in your family have history of atopy?</MyText>
                            <MyDropdown
                                data={disease}
                                change={handleInputChange('dorelative')}
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
});

export default Index;
