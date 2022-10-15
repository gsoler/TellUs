import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from "i18n-js";
import { reloadAsync } from 'expo-updates';

const LANGUAGE = 'language';
const i18n = new I18n({});

export function strings(name, params = {}) {
  return i18n.t(name, params);
}

export function loadLocaleData(locales) {
  Object.keys(locales).map((key) => {
    if (i18n.translations[key] === undefined) {
      i18n.translations[key] = locales[key];
    } else {
      const current = i18n.translations[key];
      const merged = Object.assign(locales[key], current);
      i18n.translations[key] = merged;
    }
  });
}

export function currentLocale() {
  return i18n.locale;
}

export function isRTL() {
  return i18n.locale === 'ar';
}

export function switchLanguage(lang, restart = true) {
  i18n.locale = lang;
  I18nManager.allowRTL(lang === 'ar');
  I18nManager.forceRTL(lang === 'ar');
  readLastLanguage().then((lastLanguage) => {
    if (lastLanguage !== lang) {
      AsyncStorage.setItem(LANGUAGE, lang).then(() => {
        if (restart) {
          reloadAsync();
        }
      });
    }
  })
}

export function readLastLanguage() {
  return AsyncStorage.getItem(LANGUAGE);
}