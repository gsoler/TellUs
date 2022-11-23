import React, { useState, useRef, useEffect } from 'react';
import { Image, Keyboard, Text, TextInput, TouchableHighlight, View } from 'react-native';
import CustomScrollView from 'muba-custom-scroll-view';
import PopupAdvice from 'muba-popup-advice';
import LoadingCursor from '../components/LoadingCursor';
import { isRTL, strings } from '../locales/I18n';
import { commonStyles, loginStyles } from '../styles/commonStyles';
import { validateFields } from '../utils/Validator.js';
import { LOGIN, request } from '../utils/APIUtils';
import { Views } from '../utils/Views';
import { navigate, replace } from '../utils/Common';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/config.json';
const FontAwesomeIcon = createIconSetFromFontello(fontelloConfig);

export default function Login({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [username, setUsername] = useState(route.params?.identityNumber);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState('');

  const popupAdvice = useRef();
  const passwordInput = useRef();

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (route.params?.identityNumber) {
        setUsername(route.params?.identityNumber);
      }
    }
  });

  function validateForm() {
    Keyboard.dismiss();
    setLoading(true);
    const data = {
      username: {
        value: username,
        required: true,
        setError: setUsernameError
      },
      password: {
        value: password,
        required: true,
        setError: setPasswordError
      }
    };

    const result = validateFields(data);
    let anyError = false;
    for (let key of Object.keys(result)) {
      anyError = anyError || result[key];
    }

    if (anyError) {
      setLoading(false);
    } else {
      login();
    }
  }

  async function login() {
    const response = await request(this, LOGIN, { username: username, password: password });
    if (response.httpStatus === 200) {
      replace(navigation, Views.MAIN_STACK)
    } else {
      setLoading(false);
      popupAdvice.current.show();
    }
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
            <TextInput
              style={[loginStyles.loginInputText, usernameError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              placeholder={strings('login.identityNumber')}
              placeholderTextColor="#858585"
              onChangeText={text => setUsername(text)}
              value={username}
              returnKeyType={"next"}
              onSubmitEditing={(event) => passwordInput.current.focus()}
              autoCapitalize='none'
              underlineColorAndroid='transparent'
              keyboardType='email-address' />
          </View>

          <View style={loginStyles.formLoginContent}>
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
      <PopupAdvice icon={<FontAwesomeIcon name='attention' />} title={strings('error')} headerColor={commonStyles.redText}
        ref={popupAdvice} textButton={strings('close').toUpperCase()}>
        <Text style={commonStyles.textCenter}>{strings('login.invalidLogin')}</Text>
      </PopupAdvice>
    </View>
  );
}