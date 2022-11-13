import React, { useState, useEffect, useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomScrollView from 'muba-custom-scroll-view';
// import PopupAdvice from 'muba-popup-advice';
import PhoneGroup from 'muba-phone-group';
import LoadingCursor from '../components/LoadingCursor';
import { isRTL, strings } from '../locales/I18n';
import { commonStyles, loginStyles } from '../styles/commonStyles';
import { validateFields } from '../utils/Validator.js';
import { REGISTER, request } from '../utils/APIUtils';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/config.json';
const FontAwesomeIcon = createIconSetFromFontello(fontelloConfig);

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 50;

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState();
  const [firstNameError, setFirstNameError] = useState();
  const [lastName, setLastName] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [identityNumber, setIdentityNumber] = useState();
  const [identityNumberError, setIdentityNumberError] = useState();
  const [phoneNumber, setPhoneNumer] = useState();
  const [phoneNumberError, setPhoneNumerError] = useState();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  const [passwordLengthOK, setPasswordLengthOK] = useState(false);
  const [passwordUppercaseOK, setPasswordUppercaseOK] = useState(false);
  const [passwordLowercaseOK, setPasswordLowercaseOK] = useState(false);
  const [passwordNumericOK, setPasswordNumericOK] = useState(false);
  const [passwordSpecialCharOK, setPasswordSpecialCharOK] = useState(false);

  const lastNameInput = useRef();
  const identityNumberInput = useRef();
  const phoneNumberInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  function validateForm() {
    // setLoading(true);
    const data = {
      firstName: {
        value: firstName,
        required: true,
        setError: setFirstNameError
      },
      lastName: {
        value: lastName,
        required: true,
        setError: setLastNameError
      },
      identityNumber: {
        value: identityNumber,
        required: true,
        setError: setIdentityNumberError
      },
      phoneNumber: {
        value: phoneNumber,
        required: true,
        type: 'phone',
        setError: setPhoneNumerError
      },
      email: {
        value: email,
        required: false,
        type: 'email',
        setError: setEmailError
      },
      password: {
        value: password,
        required: true,
        setError: setPasswordError
      },
      confirmPassword: {
        value: confirmPassword,
        required: true,
        setError: setConfirmPasswordError
      }
    };

    const result = validateFields(data)
    let anyError = checkPassword(password, true);
    for (let key of Object.keys(result)) {
      anyError = anyError || result[key];
    }

    if (anyError) {
      setLoading(false);
    } else {
      registerEmployee();
    }
  }

  function checkPassword(newPassword, showError) {
    let hasError = false;
    // length
    if (newPassword?.length >= MIN_PASSWORD_LENGTH && newPassword?.length <= MAX_PASSWORD_LENGTH) {
      setPasswordLengthOK(true);
    } else {
      setPasswordLengthOK(false);
      hasError = true;
    }

    // uppercase
    if (newPassword?.match(/[A-Z]/g)?.length > 0) {
      setPasswordUppercaseOK(true);
    } else {
      setPasswordUppercaseOK(false);
      hasError = true;
    }

    // lowercase
    if (newPassword?.match(/[a-z]/g)?.length > 0) {
      setPasswordLowercaseOK(true);
    } else {
      setPasswordLowercaseOK(false);
      hasError = true;
    }

    // numeric
    if (newPassword?.match(/[0-9]/g)?.length > 0) {
      setPasswordNumericOK(true);
    } else {
      setPasswordNumericOK(false);
      hasError = true;
    }

    // special chars
    if (/[!?@.,_<>*+\-]/.test(newPassword)) {
      setPasswordSpecialCharOK(true);
    } else {
      setPasswordSpecialCharOK(false);
      hasError = true;
    }

    if (showError) {
      setPasswordError(hasError);
      setConfirmPasswordError(newPassword !== confirmPassword);
    } else if (!hasError) {
      setPasswordError(false);
    }

    return hasError;
  }

  async function registerEmployee() {
    const response = await request(this, REGISTER, {
      firstName: firstName,
      lastName: lastName,
      identityNumber: identityNumber,
      phone: phoneNumber[0],
      email: email,
      password: password
    });

    console.log(response)
  }

  return (
    <View style={commonStyles.container}>
      <LoadingCursor loading={isLoading} />
      <CustomScrollView style={commonStyles.container}>
        <View style={[loginStyles.loginScreen]}>
          <Text style={loginStyles.loginContentH1}>{strings('register.title')}</Text>

          <Text style={[commonStyles.margTop, { textAlign: isRTL() ? 'right' : 'left' }]}>{strings('register.firstName')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              style={[loginStyles.loginInputText, firstNameError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              onChangeText={text => setFirstName(text)}
              returnKeyType={'next'}
              onSubmitEditing={(event) => lastNameInput.current.focus()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('register.lastName')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={lastNameInput}
              style={[[loginStyles.loginInputText, lastNameError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]]}
              onChangeText={text => setLastName(text)}
              returnKeyType={'next'}
              onSubmitEditing={(event) => identityNumberInput.current.focus()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('login.identityNumber')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={identityNumberInput}
              style={[[loginStyles.loginInputText, identityNumberError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]]}
              onChangeText={text => setIdentityNumber(text)}
              returnKeyType={'next'}
              onSubmitEditing={(event) => phoneNumberInput.current.focus()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('register.phone')} <Text style={commonStyles.redText}>*</Text></Text>
          <PhoneGroup
            ref={phoneNumberInput}
            placeholder=' '
            hideCancel={true}
            phoneBoxStyle={{ backgroundColor: 'transparent' }}
            inputStyle={[[loginStyles.loginInputText, phoneNumberError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]]}
            country={'ES'}
            maxPhones={1}
            disabled={false}
            returnKeyType={'next'}
            onSubmitEditing={(event) => emailInput.current.focus()}
            onChange={(phones) => setPhoneNumer(phones)} />

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('register.email')}</Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={emailInput}
              style={[[loginStyles.loginInputText, emailError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]]}
              onChangeText={text => setEmail(text)}
              returnKeyType={'next'}
              autoCapitalize='none'
              keyboardType='email-address'
              onSubmitEditing={(event) => passwordInput.current.focus()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('login.password')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={passwordInput}
              style={[[loginStyles.loginInputText, passwordError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]]}
              onChangeText={text => { setPassword(text); checkPassword(text); }}
              returnKeyType={'next'}
              autoCapitalize='none'
              secureTextEntry={true}
              onSubmitEditing={(event) => confirmPasswordInput.current.focus()}
              underlineColorAndroid='transparent' />
            <Text style={loginStyles.passwordRequirement}><FontAwesomeIcon name={passwordLengthOK ? 'ok' : 'cancel'} style={passwordLengthOK ? commonStyles.greenText : commonStyles.redText} /> {strings('register.passwordLength')}</Text>
            <Text style={loginStyles.passwordRequirement}><FontAwesomeIcon name={passwordUppercaseOK ? 'ok' : 'cancel'} style={passwordUppercaseOK ? commonStyles.greenText : commonStyles.redText} /> {strings('register.passwordUppercase')}</Text>
            <Text style={loginStyles.passwordRequirement}><FontAwesomeIcon name={passwordLowercaseOK ? 'ok' : 'cancel'} style={passwordLowercaseOK ? commonStyles.greenText : commonStyles.redText} /> {strings('register.passwordLowercase')}</Text>
            <Text style={loginStyles.passwordRequirement}><FontAwesomeIcon name={passwordNumericOK ? 'ok' : 'cancel'} style={passwordNumericOK ? commonStyles.greenText : commonStyles.redText} /> {strings('register.passwordNumeric')}</Text>
            <Text style={loginStyles.passwordRequirement}><FontAwesomeIcon name={passwordSpecialCharOK ? 'ok' : 'cancel'} style={passwordSpecialCharOK ? commonStyles.greenText : commonStyles.redText} /> {strings('register.passwordSpecialChar')}</Text>
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('register.confirmPassword')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={confirmPasswordInput}
              style={[[loginStyles.loginInputText, confirmPasswordError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]]}
              onChangeText={text => setConfirmPassword(text)}
              autoCapitalize='none'
              secureTextEntry={true}
              onSubmitEditing={(event) => validateForm()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={[loginStyles.loginContent, commonStyles.textRight]} onPress={() => navigate(this, 'ForgetPassword')}>{strings('login.forgetPassword')}</Text>

          <TouchableOpacity style={loginStyles.loginBtn} onPress={() => validateForm()} underlayColor="#ff5d00">
            <Text style={loginStyles.loginBtnText}>{strings('register.register').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        <View style={commonStyles.footer}>
          <Image source={require('../assets/images/login-bg.png')} style={commonStyles.imageFooter} resizeMode="stretch" />
        </View>
      </CustomScrollView>
      {/* <PopupAdvice icon={<FontAwesomeIcon name='exclamation-triangle' />} title={popupAdviceTitle} headerColor={commonStyles.red} buttonColor={commonStyles.backgroundColorBlack} textButton={strings('login.tryAgain').toUpperCase()} ref={(popupAdvice) => { this.popupAdvice = popupAdvice; }}>
        <Text style={[commonStyles.popupText, commonStyles.popupTextError]}>{popupAdviceMessage}</Text>
      </PopupAdvice> */}
    </View>
  );
}