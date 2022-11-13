import * as Network from 'expo-network';
import { CommonActions } from '@react-navigation/native';
import { DeviceEventEmitter, Platform } from 'react-native';
import Constants from 'expo-constants';
import { currentLocale } from '../locales/I18n';
import * as encoding from 'text-encoding';
import CryptoJS from 'crypto-js';
import ewqs from './ewqs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Views } from './Views';
import { UPLOAD_FILES } from './APIEndPoints';

export * from './APIEndPoints';

const USER_AGENT = 'tellus-business-app-' + Constants.manifest.version + ';' + Platform.OS + ';' + Platform.Version;
const FETCH_TIMEOUT = 30000;
const TOKEN = 'token';
const DEVICE_IDENTIFICATOR = 'imei';
export const USER = 'user';

async function generateDeviceIdentificator() {
    const deviceIdentificator = uuidv4();
    AsyncStorage.setItem(DEVICE_IDENTIFICATOR, deviceIdentificator);
    return deviceIdentificator;
}

export async function getDeviceIdentificator() {
    if ((await AsyncStorage.getItem(DEVICE_IDENTIFICATOR)) == null) {
        return await generateDeviceIdentificator();
    } else {
        return await AsyncStorage.getItem(DEVICE_IDENTIFICATOR);
    }
}

export async function getUserId() {
    const user = await AsyncStorage.getItem(USER);
    return user !== null ? JSON.parse(user).id : null;
}

export async function getUserCountry() {
    const user = await AsyncStorage.getItem(USER);
    return user !== null ? JSON.parse(user).countryCode : '';
}

export async function getToken() {
    return await AsyncStorage.getItem(TOKEN);
}

async function showProgressBar(context, totalFiles) {
    if (context.props.navigation) {
        context.props.navigation.dispatch(CommonActions.navigate(
            { name: Views.PROGRESS_BAR, params: { totalFiles: totalFiles } }));
    }
}

async function hideProgressBar(context) {
    if (context.props.navigation) {
        context.props.navigation.dispatch(CommonActions.goBack());
    }
}

async function showConnectionError(context) {
    if ((await AsyncStorage.getItem('errorPopup')) !== 'true' && context.props.navigation) {
        context.props.navigation.navigate(Views.POPUP_ERROR);
    }
}

export async function logout(context, message) {
    await AsyncStorage.removeItem(TOKEN);
    await AsyncStorage.removeItem(DEVICE_IDENTIFICATOR);
    await AsyncStorage.removeItem(USER);

    if (message) {
        await AsyncStorage.setItem('logout', message);
    }

    const currentRouteIndex = context.props.navigation.getState().index;
    const currentScreen = context.props.navigation.getState().routes[currentRouteIndex].name;
    if (currentScreen !== Views.HOME) {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                { name: Views.HOME }
            ]
        });
        context.props.navigation.closeDrawer();
        context.props.navigation.dispatch(resetAction);
    }
    context.props.navigation.navigate(Views.LOGIN_STACK);
}

export async function request(context, endpoint, body, callbackFunction, retry = 0) {
    let networkState = null;
    try {
        networkState = await Network.getNetworkStateAsync();
    } catch (error) {
        showConnectionError(context);
        return { httpStatus: 500 };
    }

    if (networkState.type === Network.NetworkStateType.NONE) {
        showConnectionError(context);
        return { httpStatus: 500 };
    } else {
        let auxBody;
        if (body === undefined || body === null) {
            auxBody = {};
        } else {
            auxBody = { ...body }
        }

        const headers = new Headers({
            'User-Agent': USER_AGENT,
            'Content-Type': 'application/json'
        });
        function _0x1dad(_0x471485, _0x349467) { const _0x42d261 = _0x42d2(); return _0x1dad = function (_0x1dad5d, _0x321e85) { _0x1dad5d = _0x1dad5d - 0x1be; let _0x37df46 = _0x42d261[_0x1dad5d]; return _0x37df46; }, _0x1dad(_0x471485, _0x349467); } const _0x288276 = _0x1dad; (function (_0x575323, _0x210975) { const _0x4ae4a1 = _0x1dad, _0x149a98 = _0x575323(); while (!![]) { try { const _0x56aa21 = -parseInt(_0x4ae4a1(0x1bf)) / 0x1 + -parseInt(_0x4ae4a1(0x1c9)) / 0x2 * (-parseInt(_0x4ae4a1(0x1c2)) / 0x3) + parseInt(_0x4ae4a1(0x1c4)) / 0x4 + -parseInt(_0x4ae4a1(0x1ce)) / 0x5 * (-parseInt(_0x4ae4a1(0x1c5)) / 0x6) + -parseInt(_0x4ae4a1(0x1d2)) / 0x7 + -parseInt(_0x4ae4a1(0x1d0)) / 0x8 * (parseInt(_0x4ae4a1(0x1d8)) / 0x9) + parseInt(_0x4ae4a1(0x1cf)) / 0xa; if (_0x56aa21 === _0x210975) break; else _0x149a98['push'](_0x149a98['shift']()); } catch (_0x1ff077) { _0x149a98['push'](_0x149a98['shift']()); } } }(_0x42d2, 0x3216d), headers[_0x288276(0x1cc)]('Content-Language', currentLocale()), headers['append'](_0x288276(0x1c7), Constants[_0x288276(0x1be)][_0x288276(0x1d3)][_0x288276(0x1c8)]), headers['append']('user-id', await getUserId() != null ? await getUserId() : 0x0), headers[_0x288276(0x1cc)](_0x288276(0x1c3), await getDeviceIdentificator())); function _0x42d2() { const _0x7fe1cc = ['173024rYSCQe', 'then', '2808407AJTbwY', 'extra', 'TextDecoder', 'Authorization', 'text', 'WWW-Authenticate', '81xknuHk', 'dfu16', 'manifest', '270656TrNuiK', 'UTF-16', 'POST', '579tLOUTB', 'device-info', '670688zlPvPQ', '221250jgnJxp', 'catch', 'country', 'COUNTRY', '1394MDVwMM', 'status', 'arrayBuffer', 'append', 'decode', '40eGgYYP', '4744810BkVOEd']; _0x42d2 = function () { return _0x7fe1cc; }; return _0x42d2(); } const token = null; if (token != null) headers[_0x288276(0x1cc)](_0x288276(0x1d5), token); else { async function dqaus() { const _0x48d301 = _0x288276, _0x22f173 = pqud(JSON['stringify']({})); return fetch(getBaseUrl() + 'tt', { 'method': _0x48d301(0x1c1), 'headers': headers, 'body': hasToCompress() ? ewqs['ctu16'](_0x22f173) : _0x22f173 })[_0x48d301(0x1d1)](_0x2ef8b7 => { const _0x26f6fa = _0x48d301; return _0x2ef8b7[_0x26f6fa(0x1ca)] === 0xc8 ? hasToCompress() ? _0x2ef8b7[_0x26f6fa(0x1cb)]() : _0x2ef8b7[_0x26f6fa(0x1d6)]() : { 'status': _0x2ef8b7['status'] }; })[_0x48d301(0x1d1)](async _0x49d9fd => { const _0x4ad5da = _0x48d301; let _0x1cadb9; if (hasToCompress()) { const _0x37dab3 = new encoding[(_0x4ad5da(0x1d4))](_0x4ad5da(0x1c0))[_0x4ad5da(0x1cd)](_0x49d9fd); _0x1cadb9 = qqud(ewqs[_0x4ad5da(0x1d9)](_0x37dab3)); } else _0x1cadb9 = qqud(_0x49d9fd); return _0x1cadb9; })[_0x48d301(0x1c6)](function (_0x30fb58) { return null; }); } headers[_0x288276(0x1cc)](_0x288276(0x1d7), await dqaus()); }

        let didTimeOut = false;
        if (!containsFile(auxBody) && endpoint !== UPLOAD_FILES) {
            let serviceUrl = endpoint.url;
            if (endpoint.method === 'GET' || endpoint.method === 'DELETE') {
                serviceUrl = await getGETParameters(serviceUrl, auxBody);
            } else if (endpoint.method === 'PUT' || endpoint.method === 'PATCH') {
                serviceUrl = await getGETParameters(serviceUrl, auxBody.id);
                delete auxBody['id'];
            }

            return await new Promise(function (resolve, reject) {
                const timeout = setTimeout(function () {
                    didTimeOut = true;
                    reject(new Error('Request timed out'));
                }, FETCH_TIMEOUT);
                const options = {
                    method: endpoint.method,
                    headers: headers
                }

                if (endpoint.method === 'PUT' || endpoint.method === 'POST' || endpoint.method === 'PATCH') {
                    options['body'] = hasToCompress() ? ewqs.ctu16(pqud(JSON.stringify(auxBody))) : pqud(JSON.stringify(auxBody));
                }

                let status;
                fetch(getBaseUrl() + serviceUrl, options)
                    .then(response => {
                        clearTimeout(timeout);
                        if (response.headers.get('authorization') != null) {
                            AsyncStorage.setItem(TOKEN, response.headers.get('authorization'));
                        }

                        status = response.status;
                        if (status === 401) {
                            if (retry < 3) {
                                return AsyncStorage.removeItem(TOKEN).then(() => request(context, endpoint, body, callbackFunction, ++retry));
                            } else {
                                return { httpStatus: 401 };
                            }
                        } else {
                            return hasToCompress() ? response.arrayBuffer() : response.text();
                        }
                    })
                    .then(async (buffer) => {
                        let result = { httpStatus: status };
                        if (buffer != null) {
                            if (!(buffer instanceof ArrayBuffer) && typeof buffer === 'object') {
                                result = buffer;
                            } else {
                                let responseText;
                                if (hasToCompress()) {
                                    let encryptedText = new encoding.TextDecoder('UTF-16').decode(buffer);
                                    if (encryptedText != null) {
                                        if (encryptedText.startsWith('"')) {
                                            encryptedText = encryptedText.substring(1);
                                        }
                                        if (encryptedText.endsWith('"')) {
                                            encryptedText = encryptedText.substring(0, encryptedText.length - 1);
                                        }
                                        responseText = qqud(ewqs.dfu16(encryptedText));
                                    }
                                } else {
                                    responseText = qqud(buffer);
                                }
                                if (isJSON(responseText)) {
                                    const jsonObject = JSON.parse(responseText);
                                    if (Array.isArray(jsonObject)) {
                                        result = { ...result, list: jsonObject };
                                    } else {
                                        result = { ...result, ...jsonObject };
                                    }
                                } else if (responseText != null && responseText !== '') {
                                    result = { ...result, value: responseText };
                                }
                            }
                        }

                        if (!didTimeOut) {
                            if (callbackFunction) {
                                callbackFunction(result);
                            } else {
                                resolve(result);
                            }
                        }
                    }).catch((error) => {
                        console.log(endpoint.method, getBaseUrl() + serviceUrl, error);
                        showConnectionError(context);
                        return { httpStatus: 500 };
                    });
            }).then(function (response) {
                return response;
            }).catch(function (err) {
                console.log(err)
                showConnectionError(context);
                return { httpStatus: 500 };
            });
        } else {
            const headers = new Headers({
                'User-Agent': USER_AGENT,
                'Content-Type': 'multipart/form-data'
            });
            const _0x54a3bb = _0x2cb4; (function (_0x320845, _0x123438) { const _0x128c4b = _0x2cb4, _0x903fa5 = _0x320845(); while (!![]) { try { const _0x36a207 = parseInt(_0x128c4b(0x71)) / 0x1 + -parseInt(_0x128c4b(0x6e)) / 0x2 * (-parseInt(_0x128c4b(0x7f)) / 0x3) + -parseInt(_0x128c4b(0x7d)) / 0x4 + parseInt(_0x128c4b(0x81)) / 0x5 + -parseInt(_0x128c4b(0x6b)) / 0x6 * (parseInt(_0x128c4b(0x75)) / 0x7) + parseInt(_0x128c4b(0x72)) / 0x8 + parseInt(_0x128c4b(0x67)) / 0x9 * (-parseInt(_0x128c4b(0x70)) / 0xa); if (_0x36a207 === _0x123438) break; else _0x903fa5['push'](_0x903fa5['shift']()); } catch (_0xe79f86) { _0x903fa5['push'](_0x903fa5['shift']()); } } }(_0x2aaa, 0x28711), headers[_0x54a3bb(0x66)]('Content-Language', currentLocale()[_0x54a3bb(0x80)]()), headers[_0x54a3bb(0x66)](_0x54a3bb(0x6d), await getUserCountry()), headers['append'](_0x54a3bb(0x7b), await getUserId() != null ? await getUserId() : 0x0), headers[_0x54a3bb(0x66)](_0x54a3bb(0x78), await getDeviceIdentificator())); function _0x2cb4(_0x1fc043, _0x2276b3) { const _0x2aaadf = _0x2aaa(); return _0x2cb4 = function (_0x2cb422, _0xc37538) { _0x2cb422 = _0x2cb422 - 0x66; let _0x1e6a2d = _0x2aaadf[_0x2cb422]; return _0x1e6a2d; }, _0x2cb4(_0x1fc043, _0x2276b3); } function _0x2aaa() { const _0x211815 = ['append', '63gYCaov', 'dfu16', '/controller/GetProvToken', 'Authorization', '6lQEhFT', 'catch', 'muba-country', '2MEulBK', 'ctu16', '398470Cbdfcm', '270081jNZdNh', '743424psilyZ', 'parse', 'UTF-16', '790503pSqFea', 'decode', 'then', 'muba-device-info', 'arrayBuffer', 'log', 'muba-user-id', 'WWW-Authenticate', '351108SyeJMJ', 'status', '538113snWnhc', 'toUpperCase', '514520CdSGqF']; _0x2aaa = function () { return _0x211815; }; return _0x2aaa(); } const token = await getToken(); if (token != null) headers[_0x54a3bb(0x66)](_0x54a3bb(0x6a), token); else { async function dqaus() { const _0x53a09f = _0x54a3bb, _0xf6ecd8 = pqud(JSON['stringify']({})); return fetch(getBaseUrl() + _0x53a09f(0x69), { 'method': 'POST', 'headers': new Headers({ 'User-Agent': USER_AGENT, 'Content-Type': 'application/json' }), 'body': hasToCompress() ? ewqs[_0x53a09f(0x6f)](_0xf6ecd8) : _0xf6ecd8 })[_0x53a09f(0x77)](_0x36ba50 => { const _0x4282d2 = _0x53a09f; return _0x36ba50[_0x4282d2(0x7e)] === 0xc8 ? hasToCompress() ? _0x36ba50[_0x4282d2(0x79)]() : _0x36ba50['text']() : { 'status': _0x36ba50[_0x4282d2(0x7e)] }; })[_0x53a09f(0x77)](async _0x177e1d => { const _0x245d89 = _0x53a09f; let _0x6a3d37; if (hasToCompress()) { const _0x1fad3b = new encoding['TextDecoder'](_0x245d89(0x74))[_0x245d89(0x76)](_0x177e1d); _0x6a3d37 = JSON[_0x245d89(0x73)](qqud(ewqs[_0x245d89(0x68)](_0x1fad3b))); } else _0x6a3d37 = JSON[_0x245d89(0x73)](qqud(_0x177e1d)); return _0x6a3d37; })[_0x53a09f(0x6c)](function (_0x5cf0ed) { const _0x55d956 = _0x53a09f; return console[_0x55d956(0x7a)](_0x5cf0ed), null; }); } headers[_0x54a3bb(0x66)](_0x54a3bb(0x7c), await dqaus()); }

            const dataToSend = getFormDataWithFiles(auxBody);
            const totalFiles = dataToSend.totalFiles;
            try {
                return await new Promise(function (resolve, reject) {
                    const xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', (oEvent) => {
                        if (oEvent.lengthComputable) {
                            const progress = oEvent.loaded / oEvent.total;
                            const uploadedFiles = Math.round(totalFiles * progress);
                            const percent = (progress * 100).toFixed(0);
                            DeviceEventEmitter.emit('updateProgress', { percent: percent, uploadedFiles: uploadedFiles });
                        } else {
                            // Unable to compute progress information since the total size is unknown
                        }
                    });
                    xhr.onreadystatechange = async () => {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            const jsonObject = JSON.parse(qqud(hasToCompress() ? ewqs.dfu16(xhr.responseText) : xhr.responseText));
                            let result;
                            if (UPLOAD_FILES !== endpoint) {
                                result = await request(context, endpoint, replaceFiles(auxBody, jsonObject), callbackFunction);
                            } else {
                                result = jsonObject;
                            }
                            hideProgressBar(context);
                            return resolve(result);
                        }
                    }
                    xhr.open(UPLOAD_FILES.method, getBaseUrl() + UPLOAD_FILES.url);
                    for (let headerName of Object.keys(headers.map)) {
                        xhr.setRequestHeader(headerName, headers.map[headerName]);
                    }
                    xhr.send(dataToSend.formData);
                    showProgressBar(context, totalFiles);
                });
            } catch (error) {
                console.log(error);
                showConnectionError(context);
            }
        }
    }
}

function getFormDataWithFiles(body) {
    const formData = new FormData();
    const files = readFiles(body);
    for (let file of files) {
        addFile(formData, file);
    }
    if (body.deletedFiles?.length > 0) {
        formData.append('DeletedFiles', JSON.stringify(body.deletedFiles));
    }

    return { formData: formData, totalFiles: files.length };
}

function readFiles(body) {
    let files = [];
    for (let key of Object.keys(body)) {
        if (body[key] != null) {
            if (body[key].uri) {
                const file = { ...body[key] };
                files.push(file);
            } else if (Array.isArray(body[key]) && body[key].length > 0 && body[key][0]?.uri) {
                for (let index = 0; index < body[key].length; ++index) {
                    const file = body[key][index];
                    files.push(file);
                }
            } else if (!Array.isArray(body[key]) && typeof body[key] === 'object') {
                files = files.concat(readFiles(body[key]));
            }
        }
    }
    return files;
}

function addFile(formData, file) {
    if (file.id) {
        formData.append(file.name + 'Id', file.id);
    }
    formData.append(file.name + 'ReferenceType', file.referenceType);
    formData.append(file.name + 'ReferenceId', file.referenceId);
    if (file.extraInfo != null) {
        formData.append(file.name + 'ExtraInfo', file.extraInfo);
    }
    if (file.rotateAngle != null) {
        formData.append(file.name + 'RotateAngle', file.rotateAngle);
    }
    if (!file.uri.startsWith('http')) {
        formData.append('files', file);
    }
}

function replaceFiles(body, responseFiles) {
    const auxBody = { ...body }
    for (let key of Object.keys(body)) {
        if (body[key] != null) {
            if (body[key].uri) {
                const fileName = body[key].name.substring(0, body[key].name.indexOf('.'));
                auxBody[key] = responseFiles.find(responseFile => responseFile.name.startsWith(fileName));
                delete auxBody[key].uri;
            } else if (Array.isArray(body[key]) && body[key].length > 0 && body[key][0]?.uri) {
                for (let index = body[key].length - 1; index >= 0; --index) {
                    const fileName = body[key][index].name.substring(0, body[key][index].name.indexOf('.'));
                    auxBody[key][index] = responseFiles.find(responseFile => responseFile.name.startsWith(fileName));
                    if (auxBody[key][index] != null) {
                        delete auxBody[key][index].uri;
                    } else {
                        auxBody[key].splice(index, 1);
                    }
                }
            } else if (!Array.isArray(body[key]) && typeof body[key] === 'object') {
                auxBody[key] = replaceFiles(body[key], responseFiles);
            }
        }
    }
    delete auxBody.deletedFiles;
    return auxBody;
}

function containsFile(body) {
    let hasFile = false;
    if (body != null) {
        for (let key of Object.keys(body)) {
            if (body[key] != null) {
                if (key === 'uri' && body[key] != null && body[key] !== '') {
                    hasFile = true;
                } else if (Array.isArray(body[key]) && body[key].length > 0) {
                    for (let index = 0; index < body[key].length; ++index) {
                        hasFile = hasFile || containsFile(body[key][index]);
                    }
                } else if (typeof body[key] === 'object') {
                    hasFile = hasFile || containsFile(body[key]);
                }
            }
        }
    }
    return hasFile || body.deletedFiles?.length > 0;
}

function isJSON(text) {
    try {
        const json = JSON.parse(text);
        return (typeof json === 'object');
    } catch (e) {
        return false;
    }
}

async function getGETParameters(serviceUrl, body) {
    let parameters = '';
    for (let key of Object.keys(body)) {
        if (body[key] != null) {
            if (serviceUrl.indexOf('{' + key + '}') > -1) {
                serviceUrl = serviceUrl.replace('{' + key + '}', body[key]);
            } else {
                if (parameters === '') {
                    parameters = '?';
                } else {
                    parameters += '&';
                }
                parameters += key + '=' + encodeURIComponent(body[key]);
            }
        }
    }
    if (serviceUrl.indexOf('{countryCode}') >= 0) {
        serviceUrl = serviceUrl.replace('{countryCode}', await getUserCountry());
    }

    return serviceUrl + parameters;
}

function hasToCompress() {
    return Platform.OS !== 'ios';
}

function getBaseUrl() {
    return Constants.manifest.extra.BASE_URL;
}

function _0x364f() { const _0x17a6e7 = ['result', '_result', 'readAsArrayBuffer', 'AES', 'length', 'charAt', 'map', 'DONE', 'fromCharCode', 'Utf8', 'indexOf', '3699243UyfzHc', 'toString', '517867KrzVDw', '\x27atob\x27\x20failed:\x20The\x20string\x20to\x20be\x20decoded\x20is\x20not\x20correctly\x20encoded.', 'pad', 'charCodeAt', 'readyState', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', 'set', 'readAsDataURL', 'CBC', '68584AYVIim', '1230DMAPef', 'onloadend', '53TDVptB', 'parse', 'from', 'LOADING', 'prototype', 'ciphertext', '135qghgCX', 'Base64', 'encrypt', '12543048qjsfEs', '513560eJaMIC', 'enc', '4B6150645367566B5970337336763979', 'mode', 'substr', '_error', 'Hex', '413208bjCHqj', 'decrypt', '_setReadyState', 'Pkcs7']; _0x364f = function () { return _0x17a6e7; }; return _0x364f(); } const _0x55bb90 = _0x1b8e; (function (_0x206bc9, _0x6b7773) { const _0x15d361 = _0x1b8e, _0x358ed9 = _0x206bc9(); while (!![]) { try { const _0x532b76 = -parseInt(_0x15d361(0x149)) / 0x1 * (parseInt(_0x15d361(0x147)) / 0x2) + parseInt(_0x15d361(0x14f)) / 0x3 * (-parseInt(_0x15d361(0x146)) / 0x4) + -parseInt(_0x15d361(0x153)) / 0x5 + -parseInt(_0x15d361(0x12c)) / 0x6 + -parseInt(_0x15d361(0x13d)) / 0x7 + parseInt(_0x15d361(0x152)) / 0x8 + parseInt(_0x15d361(0x13b)) / 0x9; if (_0x532b76 === _0x6b7773) break; else _0x358ed9['push'](_0x358ed9['shift']()); } catch (_0x24b3a5) { _0x358ed9['push'](_0x358ed9['shift']()); } } }(_0x364f, 0xe2d9e)); const iv = _0x55bb90(0x155), key = '5A7234753778214125442A472D4B6150'; function pqud(_0x17f9cf) { const _0x2f87b8 = _0x55bb90, _0x595262 = CryptoJS[_0x2f87b8(0x133)][_0x2f87b8(0x151)](_0x17f9cf, CryptoJS[_0x2f87b8(0x154)][_0x2f87b8(0x12b)]['parse'](key), { 'iv': CryptoJS[_0x2f87b8(0x154)][_0x2f87b8(0x12b)][_0x2f87b8(0x14a)](iv), 'mode': CryptoJS['mode'][_0x2f87b8(0x145)], 'padding': CryptoJS[_0x2f87b8(0x13f)][_0x2f87b8(0x12f)] }); return _0x595262[_0x2f87b8(0x14e)][_0x2f87b8(0x13c)](CryptoJS['enc'][_0x2f87b8(0x150)]); } function qqud(_0x253e24) { const _0x90d67e = _0x55bb90, _0x115f4a = CryptoJS[_0x90d67e(0x133)][_0x90d67e(0x12d)](_0x253e24, CryptoJS['enc'][_0x90d67e(0x12b)]['parse'](key), { 'iv': CryptoJS[_0x90d67e(0x154)][_0x90d67e(0x12b)][_0x90d67e(0x14a)](iv), 'mode': CryptoJS[_0x90d67e(0x156)][_0x90d67e(0x145)], 'padding': CryptoJS[_0x90d67e(0x13f)][_0x90d67e(0x12f)] }); return _0x115f4a['toString'](CryptoJS['enc'][_0x90d67e(0x139)]); } function _0x1b8e(_0x460a03, _0x2dc3ab) { const _0x364f21 = _0x364f(); return _0x1b8e = function (_0x1b8e26, _0x3a594e) { _0x1b8e26 = _0x1b8e26 - 0x129; let _0x38ca01 = _0x364f21[_0x1b8e26]; return _0x38ca01; }, _0x1b8e(_0x460a03, _0x2dc3ab); } FileReader[_0x55bb90(0x14d)][_0x55bb90(0x132)] = function (_0x19f2b7) { const _0x530a06 = _0x55bb90; if (this[_0x530a06(0x141)] === this[_0x530a06(0x14c)]) throw new Error('InvalidStateError'); this[_0x530a06(0x12e)](this['LOADING']), this[_0x530a06(0x131)] = null, this[_0x530a06(0x12a)] = null; const _0x18858c = new FileReader(); _0x18858c[_0x530a06(0x148)] = () => { const _0x3b6dd6 = _0x530a06, _0x4d8d28 = atob(_0x18858c[_0x3b6dd6(0x130)][_0x3b6dd6(0x129)]('data:application/octet-stream;base64,'[_0x3b6dd6(0x134)])), _0x298130 = new ArrayBuffer(_0x4d8d28[_0x3b6dd6(0x134)]), _0xba9ce7 = new Uint8Array(_0x298130); _0xba9ce7[_0x3b6dd6(0x143)](Array[_0x3b6dd6(0x14b)](_0x4d8d28)[_0x3b6dd6(0x136)](_0x3c976f => _0x3c976f[_0x3b6dd6(0x140)](0x0))), this[_0x3b6dd6(0x131)] = _0x298130, this[_0x3b6dd6(0x12e)](this[_0x3b6dd6(0x137)]); }, _0x18858c[_0x530a06(0x144)](_0x19f2b7); }; const chars = _0x55bb90(0x142); atob = (_0x548ae8 = '') => { const _0x5982e4 = _0x55bb90; let _0x3626c3 = _0x548ae8['replace'](/=+$/, ''), _0x44876f = ''; if (_0x3626c3[_0x5982e4(0x134)] % 0x4 == 0x1) throw new Error(_0x5982e4(0x13e)); for (let _0x3b541e = 0x0, _0x17ea00 = 0x0, _0x1b5057, _0x27495b = 0x0; _0x1b5057 = _0x3626c3[_0x5982e4(0x135)](_0x27495b++); ~_0x1b5057 && (_0x17ea00 = _0x3b541e % 0x4 ? _0x17ea00 * 0x40 + _0x1b5057 : _0x1b5057, _0x3b541e++ % 0x4) ? _0x44876f += String[_0x5982e4(0x138)](0xff & _0x17ea00 >> (-0x2 * _0x3b541e & 0x6)) : 0x0) { _0x1b5057 = chars[_0x5982e4(0x13a)](_0x1b5057); } return _0x44876f; };