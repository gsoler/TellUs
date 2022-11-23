import React, { useState, useRef, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomScrollView from 'muba-custom-scroll-view';
import PopupAdvice from 'muba-popup-advice';
import PhoneGroup from 'muba-phone-group';
import InputSelect from 'muba-input-select';
import LoadingCursor from '../components/LoadingCursor';
import { isRTL, strings } from '../locales/I18n';
import { commonStyles, loginStyles } from '../styles/commonStyles';
import { validateFields } from '../utils/Validator.js';
import { GET_COUNTRIES, REGISTER, request } from '../utils/APIUtils';
import { goBack, replace } from '../utils/Common';
import { Views } from '../utils/Views';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/config.json';
const FontAwesomeIcon = createIconSetFromFontello(fontelloConfig);

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 50;

export default function Register({ navigation }) {
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
  const [address, setAddress] = useState();
  const [addressError, setAddressError] = useState();
  const [city, setCity] = useState();
  const [cityError, setCityError] = useState();
  const [zipCode, setZipCode] = useState();
  const [zipCodeError, setZipCodeError] = useState();
  const [countryError, setCountryError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  const [passwordLengthOK, setPasswordLengthOK] = useState(false);
  const [passwordUppercaseOK, setPasswordUppercaseOK] = useState(false);
  const [passwordLowercaseOK, setPasswordLowercaseOK] = useState(false);
  const [passwordNumericOK, setPasswordNumericOK] = useState(false);
  const [passwordSpecialCharOK, setPasswordSpecialCharOK] = useState(false);
  const [countryList, setCountryList] = useState({
    elements: [{ section: true, value: null, label: strings('register.country') }],
    selectedItem: null
  });

  const lastNameInput = useRef();
  const identityNumberInput = useRef();
  const phoneNumberInput = useRef();
  const emailInput = useRef();
  const addressInput = useRef();
  const cityInput = useRef();
  const zipCodeInput = useRef();
  const countryInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const popupAdvice = useRef();

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      loadCountries(setLoading);
      mounted.current = true;
    }
  });

  loadCountries = async () => {
    const responseJson = await request(this, GET_COUNTRIES);
    if (responseJson.httpStatus === 200) {
      setCountryList({ elements: [countryList.elements[0], ...responseJson.list], selectedItem: countryList.selectedItem });
    }
  }

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
      address: {
        value: address,
        required: true,
        setError: setAddressError
      },
      city: {
        value: city,
        required: true,
        setError: setCityError
      },
      zipCode: {
        value: zipCode,
        required: true,
        length: 5,
        setError: setZipCodeError
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

    const countryOK = countryInput.current.onSubmitValidate();
    setCountryError(!countryOK);
    const result = validateFields(data) && countryOK;
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
      hasError = hasError || newPassword !== confirmPassword;
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
      address: address,
      city: city,
      zipCode: zipCode,
      country: countryList.selectedItem,
      password: password
    });

    if (response.httpStatus === 200) {
      replace(navigation, Views.REGISTER_CODE, { identityNumber: identityNumber, message: response.value });
    } else {
      popupAdvice.current.show()
    }
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
              style={[loginStyles.loginInputText, lastNameError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              onChangeText={text => setLastName(text)}
              returnKeyType={'next'}
              onSubmitEditing={(event) => identityNumberInput.current.focus()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('login.identityNumber')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={identityNumberInput}
              style={[loginStyles.loginInputText, identityNumberError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
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
            inputStyle={[loginStyles.loginInputText, phoneNumberError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
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
              style={[loginStyles.loginInputText, emailError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              onChangeText={text => setEmail(text)}
              returnKeyType={'next'}
              autoCapitalize='none'
              keyboardType='email-address'
              onSubmitEditing={(event) => addressInput.current.focus()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('register.address')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={addressInput}
              style={[loginStyles.loginInputText, addressError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              onChangeText={text => setAddress(text)}
              returnKeyType={'next'}
              onSubmitEditing={(event) => cityInput.current.focus()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('register.city')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={cityInput}
              style={[loginStyles.loginInputText, cityError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              onChangeText={text => setCity(text)}
              returnKeyType={'next'}
              onSubmitEditing={(event) => zipCodeInput.current.focus()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('register.zipCode')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={zipCodeInput}
              style={[loginStyles.loginInputText, zipCodeError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              onChangeText={text => setZipCode(text)}
              returnKeyType={'next'}
              autoCapitalize='none'
              maxLength={5}
              keyboardType='numeric'
              onSubmitEditing={(event) => countryInput.current.open()}
              underlineColorAndroid='transparent' />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('register.country')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <InputSelect
              ref={countryInput}
              required={true}
              options={countryList}
              containerStyle={[loginStyles.registerInputSelect, countryError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              selectStyle={countryError ? { backgroundColor: loginStyles.loginInputError.backgroundColor } : null}
              placeholder={strings('register.country')}
              onChange={(value) => {
                setCountryList({ ...countryList, selectedItem: value });
                passwordInput.current.focus();
              }} />
          </View>

          <Text style={{ textAlign: isRTL() ? 'right' : 'left' }}>{strings('login.password')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              ref={passwordInput}
              style={[loginStyles.loginInputText, passwordError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
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
              style={[loginStyles.loginInputText, confirmPasswordError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              onChangeText={text => setConfirmPassword(text)}
              autoCapitalize='none'
              secureTextEntry={true}
              onSubmitEditing={(event) => validateForm()}
              underlineColorAndroid='transparent' />
          </View>

          <TouchableOpacity style={loginStyles.loginBtn} onPress={() => validateForm()} underlayColor="#ff5d00">
            <Text style={loginStyles.loginBtnText}>{strings('register.register').toUpperCase()}</Text>
          </TouchableOpacity>
          <Text style={[loginStyles.loginContent, commonStyles.textCenter, commonStyles.fSize13]} onPress={() => goBack(navigation)}>{strings('register.back')}</Text>
        </View>

        <View style={commonStyles.footer}>
          <Image source={require('../assets/images/login-bg.png')} style={commonStyles.imageFooter} resizeMode="stretch" />
        </View>
      </CustomScrollView>
      <PopupAdvice icon={<FontAwesomeIcon name='attention' />} title={strings('error')} headerColor={commonStyles.redText}
        ref={popupAdvice} textButton={strings('close').toUpperCase()}>
        <Text style={commonStyles.textCenter}>{strings('register.userExists')}</Text>
      </PopupAdvice>
    </View>
  );
}