import { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { strings } from '../locales/I18n';
import LoadingCursor from '../components/LoadingCursor';
import { commonStyles } from '../styles/commonStyles';
import { GET_RESTAURANTS, request } from '../utils/APIUtils';

export default function Home() {
  const [isLoading, setLoading] = useState(true);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      loadData(setLoading);
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });

  return (
    <View style={[commonStyles.container]}>
      <LoadingCursor loading={isLoading} />
      <View style={commonStyles.body}>
        <Text style={{ fontSize: 22 }}>{strings('home.welcome')}</Text>
      </View>
    </View>
  );
}

async function loadData(setLoading) {
  console.log('response', await request(this, GET_RESTAURANTS));
  setTimeout(function () {
    setLoading(false);
  }, 1000)
}