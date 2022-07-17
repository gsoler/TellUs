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

const USER_AGENT = 'tellus-app-' + Constants.manifest.version + ';' + Platform.OS + ';' + Platform.Version;
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
    if (context.setState) {
        context.setState({ isLoading: false });
    }

    if (context.props.navigation) {
        context.props.navigation.dispatch(CommonActions.navigate(
            { name: Views.PROGRESS_BAR, params: { totalFiles: totalFiles } }));
    }
}

async function hideProgressBar(context) {
    if (context.setState) {
        context.setState({ isLoading: false });
    }

    if (context.props.navigation) {
        context.props.navigation.dispatch(CommonActions.goBack());
    }
}

async function showConnectionError(context) {
    context.setState({ isLoading: false });

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
        headers.append('Content-Language', currentLocale());
        headers.append('country', Constants.manifest.extra.COUNTRY);
        headers.append('user-id', await getUserId() != null ? await getUserId()
            : 0);
        headers.append('device-info', await getDeviceIdentificator());
        const token = await getToken();
        if (token != null) {
            headers.append('Authorization', token);
        } else {
            async function dqaus() {
                const encryptedRequest = pqud(JSON.stringify({}));
                return fetch(getBaseUrl() + 'tt',
                    {
                        method: 'POST',
                        headers: headers,
                        body: hasToCompress() ? ewqs.ctu16(encryptedRequest) : encryptedRequest
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            return hasToCompress() ? response.arrayBuffer() : response.text();
                        } else {
                            return { status: response.status };
                        }
                    })
                    .then(async (buffer) => {
                        let responseText;
                        if (hasToCompress()) {
                            const encryptedText = new encoding.TextDecoder('UTF-16').decode(buffer);
                            responseText = qqud(ewqs.dfu16(encryptedText));
                        } else {
                            responseText = qqud(buffer);
                        }
                        return responseText;
                    })
                    .catch(function (err) {
                        return null
                    });
            }
            headers.append('WWW-Authenticate', await dqaus());
        }
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



const iv = "4B6150645367566B5970337336763979";
const key = "5A7234753778214125442A472D4B6150";
function pqud(message) {
    const encrypted = CryptoJS.AES.encrypt(message,
        CryptoJS.enc.Hex.parse(key), {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

function qqud(message) {
    const decrypted = CryptoJS.AES.decrypt(message,
        CryptoJS.enc.Hex.parse(key), {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

FileReader.prototype.readAsArrayBuffer = function (blob) {
    if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
    this._setReadyState(this.LOADING);
    this._result = null;
    this._error = null;
    const fr = new FileReader();
    fr.onloadend = () => {
        const content = atob(fr.result.substr("data:application/octet-stream;base64,".length));
        const buffer = new ArrayBuffer(content.length);
        const view = new Uint8Array(buffer);
        view.set(Array.from(content).map(c => c.charCodeAt(0)));
        this._result = buffer;
        this._setReadyState(this.DONE);
    };
    fr.readAsDataURL(blob);
}
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
atob = (input = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
        buffer = str.charAt(i++);

        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        buffer = chars.indexOf(buffer);
    }

    return output;
}