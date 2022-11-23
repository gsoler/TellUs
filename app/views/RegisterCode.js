import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomScrollView from 'muba-custom-scroll-view';
import PopupAdvice from 'muba-popup-advice';
import LoadingCursor from '../components/LoadingCursor';
import { isRTL, strings } from '../locales/I18n';
import { commonStyles, loginStyles } from '../styles/commonStyles';
import { validateFields } from '../utils/Validator.js';
import { REGISTER_CODE, request } from '../utils/APIUtils';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/config.json';
import { goBack, navigate, popToTop, replace } from '../utils/Common';
import { Views } from '../utils/Views';
const FontAwesomeIcon = createIconSetFromFontello(fontelloConfig);

export default function RegisterCode({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState(strings('register.title'))
  const [code, setCode] = useState();
  const [codeError, setCodeError] = useState();

  const popupAdvice = useRef();

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      if (route.params.title) {
        setTitle(route.params.title);
      }
      mounted.current = true;
    }
  });

  async function validateForm() {
    setLoading(true);
    const data = {
      code: {
        value: code,
        required: true,
        length: 6,
        setError: setCodeError
      }
    };

    const result = validateFields(data);
    let anyError = !(await checkCode(code));
    for (let key of Object.keys(result)) {
      anyError = anyError || result[key];
    }

    if (anyError) {
      setLoading(false);
      popupAdvice.current.show();
    } else {
      if (route.params.login) {
        replace(navigation, Views.MAIN_STACK);
      } else {
        navigate(navigation, Views.LOGIN, { identityNumber: route.params.identityNumber });
      }
    }
  }

  async function checkCode() {
    const responseJson = await request(this, REGISTER_CODE, {
      identityNumber: route.params.identityNumber,
      code: code
    });

    return responseJson.httpStatus === 200;
  }

  return (
    <View style={commonStyles.container}>
      <LoadingCursor loading={isLoading} />
      <CustomScrollView style={commonStyles.container}>
        <View style={[loginStyles.loginScreen]}>
          <Text style={loginStyles.loginContentH1}>{title}</Text>

          <Text style={[commonStyles.margTop, { textAlign: isRTL() ? 'right' : 'left' }]}>{route.params.message}</Text>

          <Text style={[loginStyles.codeInput, { textAlign: isRTL() ? 'right' : 'left' }]}>{strings('registerCode.code')} <Text style={commonStyles.redText}>*</Text></Text>
          <View style={loginStyles.formLoginContent}>
            <TextInput
              autoFocus={true}
              style={[loginStyles.loginInputText, codeError ? loginStyles.loginInputError : '', { textAlign: isRTL() ? 'right' : 'left', }]}
              onChangeText={text => setCode(text)}
              maxLength={6}
              keyboardType='numeric'
              onSubmitEditing={(event) => validateForm()}
              underlineColorAndroid='transparent' />
          </View>

          <TouchableOpacity style={loginStyles.loginBtn} onPress={() => validateForm()} underlayColor="#ff5d00">
            <Text style={loginStyles.loginBtnText}>{strings('registerCode.send').toUpperCase()}</Text>
          </TouchableOpacity>
          <Text style={[loginStyles.loginContent, commonStyles.textCenter, commonStyles.fSize13]} onPress={() => goBack(navigation)}>{strings('register.back')}</Text>
        </View>

        <View style={commonStyles.footer}>
          <Image source={require('../assets/images/login-bg.png')} style={commonStyles.imageFooter} resizeMode="stretch" />
        </View>
      </CustomScrollView>
      <PopupAdvice icon={<FontAwesomeIcon name='attention' />} title={strings('error')} headerColor={commonStyles.redText}
        ref={popupAdvice} textButton={strings('close').toUpperCase()}>
        <Text style={commonStyles.textCenter}>{strings('registerCode.invalidCode')}</Text>
      </PopupAdvice>
    </View>
  );
}