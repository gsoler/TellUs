import { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { loadingStyles } from '../styles/commonStyles';
import { strings } from '../locales/I18n';

const Pictures = {
  loading: require('../assets/images/loading.gif')
}

export default function LoadingCursor(props) {
  const [isLoading, setLoading] = useState(props.loading);

  useEffect(() => {
    setLoading(props.loading);
  })

  return (
    isLoading ?
      <View style={loadingStyles.modalParent}>
        <View style={loadingStyles.modalOverlay} />
        <Image
          style={loadingStyles.loadingCursor}
          source={Pictures.loading}
        />
        <Text style={loadingStyles.loadingCursorText} >{strings('loading')}...</Text>
      </View>
      :
      <View />
  );
}