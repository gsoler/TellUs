import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { strings } from '../locales/I18n';
import { commonStyles } from '../styles/commonStyles';

export default function Settings() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadData(setLoading);
  })

  return (
    <View style={[commonStyles.container]}>
      <View style={commonStyles.body}>
        <Text style={{ fontSize: 22 }}>This is settings</Text>
      </View>
    </View>
  );
}

async function loadData(setLoading) {
  // console.log(await request(this, 'activity/getActivities', { pageOffset: 0, pageSize: 30 }));
  setLoading(false);
}