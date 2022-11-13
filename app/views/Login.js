import React, { useState, useRef } from 'react';
import { Image, Keyboard, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomScrollView from 'muba-custom-scroll-view';
// import PopupAdvice from 'muba-popup-advice';
import LoadingCursor from '../components/LoadingCursor';
import { isRTL, strings } from '../locales/I18n';
import { commonStyles, loginStyles } from '../styles/commonStyles';
import { validateFields } from '../utils/Validator.js';
import { request } from '../utils/APIUtils';
import { Views } from '../utils/Views';
import { navigate } from '../utils/Common';

export default function Login() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [username, setUsername] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState('');
  const [popupAdviceTitle, setPopupAdviceTitle] = useState();
  const [popupAdviceMessage, setPopupAdviceMessage] = useState();

  const passwordInput = useRef();

  function validateForm() {
    Keyboard.dismiss();
    setLoading(true);
    setUsernameError(false);
    setUsernameErrorText('');
    setPasswordError(false);
    setPasswordErrorText('');
    const data = { username: { value: username, required: true, type: 'email' }, password: { value: password, required: true } };

    const result = validateFields(data)
    if (result.username.error) {
      if (!result.username.required) {
        setUsernameErrorText(strings('login.emailRequired'));
        setUsernameError(true);
      } else if (!result.username.type) {
        setUsernameErrorText(strings('login.emailBadFormat'));
        setUsernameError(true);
      }
      setLoading(false);
      return false;
    }

    if (result.password.error) {
      if (!result.password.required) {
        setPasswordErrorText(strings('login.passwordRequired'));
        setPasswordError(true);
      }
      setLoading(false);
      return false;
    }

    login();
  }

  async function login() {
    console.log(await request(this, 'employees/login', { username: username, password: password }));
    setLoading(false);
  }

  return (
    <View style={commonStyles.container}>
      <LoadingCursor loading={isLoading} />
      <CustomScrollView style={commonStyles.container}>
        <View style={[loginStyles.loginScreen]}>
          <View style={loginStyles.loginIcon}>
            <Image source={require('../assets/images/login-icon.png')} style={loginStyles.iconSignin} />
          </View>
          <Text style={loginStyles.loginContentH1}>{strings('login.welcome')}</Text>
          <Text style={loginStyles.loginContentH2}>{strings('login.signInContinue')}</Text>

          <View style={loginStyles.formLoginContent}>
            <Text style={loginStyles.inputErrorText}>{usernameErrorText}</Text>
            <TextInput
              style={[loginStyles.loginInputText, usernameError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              placeholder={strings('login.identityNumber')}
              placeholderTextColor="#858585"
              onChangeText={text => setUsername(text)}
              returnKeyType={"next"}
              onSubmitEditing={(event) => passwordInput.current.focus()}
              autoCapitalize='none'
              underlineColorAndroid='transparent'
              keyboardType='email-address' />
          </View>

          <View style={loginStyles.formLoginContent}>
            <Text style={loginStyles.inputErrorText}>{passwordErrorText}</Text>
            <TextInput
              ref={passwordInput}
              style={[[loginStyles.loginInputText, passwordError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]]}
              placeholder={strings('login.password')}
              placeholderTextColor="#858585"
              onChangeText={text => setPassword(text)}
              autoCapitalize='none'
              secureTextEntry={true}
              onSubmitEditing={(event) => validateForm()}
              underlineColorAndroid='transparent' />
          </View>

          <View style={commonStyles.row}>
            <Text style={[commonStyles.col6, loginStyles.loginContent, commonStyles.textLeft]} onPress={() => navigate(navigation, Views.REGISTER)}>{strings('login.register')}</Text>
            <Text style={[commonStyles.col6, loginStyles.loginContent, commonStyles.textRight]} onPress={() => navigate(navigation, 'ForgetPassword')}>{strings('login.forgetPassword')}</Text>
          </View>

          <TouchableHighlight style={loginStyles.loginBtn} onPress={() => validateForm()} underlayColor="#ff5d00">
            <Text style={loginStyles.loginBtnText}>{strings('login.signIn').toUpperCase()}</Text>
          </TouchableHighlight>
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