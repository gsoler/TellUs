import { StyleSheet, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Device, Fonts } from '../utils/Common.js';

/*export * from './CalendarStyles.js';
export * from './ClientStyles.js';
export * from './ContactPopupStyles.js';
export * from './ContactsStyles.js';
export * from './HomeStyles.js';
export * from './InputPhoneStyles.js';
export * from './InputSelectStyles.js';
export * from './InstantSearchStyles.js';
export * from './LoginStyles.js';
export * from './MapStyles.js';
export * from './MyCalendarStyles.js';
export * from './NotesStyles.js';
export * from './OpportunitiesStyles.js';
export * from './PopupStyles.js';
export * from './PotentialsListStyles.js';
export * from './RadioButtonGroupStyles.js';
export * from './SalesTasksStyles.js';
export * from './SettingsStyles.js';*/

const window = Dimensions.get('window');

export const commonStyles = StyleSheet.create({

  flex1: {
    flex: 1
  },

  marginTopBar: {
    marginTop: Constants.statusBarHeight
  },

  whiteBg: {
    backgroundColor: '#fff'
  },

  container: {
    flex: 1,
    backgroundColor: '#eff0f1',
    flexDirection: 'column'
  },

  containerTable: {
    flex: 1,
    backgroundColor: '#00afca',
    flexDirection: 'column'
  },

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  placeholderTextColor: {
    color: '#bbbbbb'
  },

  redText: {
    color: '#cf1b1b'
  },

  orangeText: {
    color: '#ff6600'
  },

  greenText: {
    color: '#36ad4a'
  },

  darkGreenText: {
    color: '#267934'
  },

  greyText: {
    color: '#858585'
  },

  midgreyText: {
    color: '#666'
  },

  darkBlueText: {
    color: '#104a7a'
  },

  blueText: {
    color: '#0e8fcf'
  },

  whiteText: {
    color: '#fff'
  },

  medblueText: {
    color: '#1f8cb2'
  },

  popupBlueText: {
    color: '#00afca'
  },

  subNote: {
    fontSize: 11,
    color: '#858585',
    fontFamily: Fonts.Note,
    textAlign: 'left'
  },

  progressbarField: {
    fontFamily: Fonts.Note,
    fontSize: 12,
    marginBottom: 10,
    color: '#333',
  },

  disabled: {
    opacity: 0.4
  },

  okBtnBox: {
    bottom: 0,
    zIndex: 80,
    left: 0,
    borderRadius: 360,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  okBtn: {
    padding: 4,
    display: 'flex',
    borderRadius: 360,
    backgroundColor: '#0e8fcf',
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },

  okBtnText: {
    fontFamily: Fonts.Button,
    fontSize: 16,
    marginTop: 3,
    color: '#fff'
  },

  languageBtnText: {
    fontSize: 14,
    marginTop: 3,
    color: '#fff',
    fontFamily: Fonts.Button
  },

  okBtnBoxPermissions: {
    marginLeft: 7,
    marginRight: 7,
    backgroundColor: '#0e8fcf'
  },

  textRight: {
    textAlign: 'right'
  },

  padR0: {
    paddingRight: 0
  },

  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: -9999,
    height: 99,
    width: '100%',
    marginTop: 20
  },

  imageFooter: {
    maxHeight: 99,
    width: window.width
  },

  bigImageFooter: {
    maxHeight: 180,
    width: window.width,
    position: 'absolute',
    bottom: 0,
    zIndex: -9999
  },

  backgroundColorGreen: {
    backgroundColor: '#00cc66'
  },

  backgroundColorBlue: {
    backgroundColor: '#0e8fcf'
  },

  backgroundColorRed: {
    backgroundColor: '#cf1b1b'
  },

  justifyCenter: {
    justifyContent: 'center'
  },

  justifyLeft: {
    justifyContent: 'flex-start'
  },

  justifyRight: {
    justifyContent: 'flex-end'
  },

  textCenter: {
    textAlign: 'center'
  },

  alignCenter: {
    alignItems: 'center'
  },

  alignRight: {
    alignItems: 'flex-end'
  },

  row: {
    flexDirection: 'row'
  },

  widthAuto: {
    alignSelf: 'flex-start'
  },

  col: {
    position: 'relative',
    width: '100%'
  },

  col1: {
    width: '8.33%'
  },

  col2: {
    width: '16.66%'
  },

  col3: {
    width: '25%'
  },

  col4: {
    width: '33.33%'
  },

  col5: {
    width: '41.66%'
  },

  col6: {
    width: '50%'
  },

  col6Sep: {
    width: '49%'
  },

  col6Separator: {
    marginRight: '2%'
  },

  col8: {
    width: '66.66%'
  },

  col9: {
    width: '75%'
  },

  col10: {
    width: '83.33%'
  },

  col11: {
    width: '91.66%'
  },

  col12: {
    width: '100%'
  },

  col13: {
    width: '125%'
  },

  divider: {
    height: 50
  },

  /*----------Fonts----------*/

  h2: {
    fontFamily: Fonts.Subtitle,
    fontSize: 19
  },

  h3: {
    fontFamily: Fonts.Subtitle,
    fontSize: 13.5
  },

  detailsText: {
    fontSize: 12,
    fontFamily: Fonts.Text,
    color: '#858585'
  },

  fSize12: {
    fontSize: 12
  },

  fSize15: {
    fontSize: 15
  },

  fSize22: {
    fontSize: 22
  },

  fSize30: {
    fontSize: 30
  },

  light: {
    fontWeight: '300'
  },

  /*----------Top Bar----------*/
  topBarColor: {
    backgroundColor: '#9c0000'
  },

  topBar: {
    flexDirection: 'row',
    backgroundColor: '#9c0000',
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative',
    marginTop: Constants.statusBarHeight,
    height: 58
  },

  topBarScreenName: {
    justifyContent: 'center',
    height: 58,
    alignItems: 'center'
  },

  logoTopBar: {
    height: 26,
    width: 120
  },

  screenTitleText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.Title,
    marginLeft: 8,
    paddingTop: 6
  },

  screenTitleIcon: {
    fontSize: 20,
    color: '#fff'
  },

  menuHomeLeft: {
    flex: 1,
    alignItems: 'flex-start'
  },

  menuHomeCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  menuHomeRight: {
    flex: 1,
    alignItems: 'flex-end'
  },

  menuHomeIcon: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 4
  },

  menuBurgerIcon: {
    backgroundColor: '#800009',
    height: 58,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  /*----------Side Bar----------*/

  pushNav: {
    flex: 1,
    backgroundColor: '#eff0f1'
  },

  pushNavTop: {
    backgroundColor: '#480300',
    paddingTop: Platform.OS === Device.IOS ? Constants.statusBarHeight : 0
  },

  pushNavTopBarItem: {
    backgroundColor: '#9c0000',
    flexDirection: 'row',
    alignItems: 'center'
  },

  menuLogoItem: {
    backgroundColor: '#800009',
    minHeight: 58,
    minWidth: 55,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  menuLogoIcon: {
    height: 30,
    width: 30,
    borderRadius: 360,
    overflow: 'hidden'
  },

  menuTitleText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.Subtitle,
    marginLeft: 12
  },

  pushNavItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  pushNavItemHighlight: {
    backgroundColor: '#fff'
  },

  pushNavItemMediumlight: {
    backgroundColor: '#f8f8f8'
  },

  pushNavItemText: {
    fontFamily: Fonts.Highlighted,
    color: '#333',
    paddingTop: 5
  },

  pushNavIcon: {
    height: 22,
    width: 22,
    marginRight: 8
  },

  pushNavIconFontAwesome: {
    fontSize: 18,
    color: '#0e8fcf',
    paddingTop: 3,
    paddingLeft: 2
  },

  /*----------Loading Cursor----------*/

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000099'
  },

  loadingCursor: {
    width: 100,
    height: 100
  },

  loadingCursorText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.Note
  },

  posRel: {
    position: 'relative'
  },

  /*----------Loading Cursor----------*/

  paginatorButton: {
    marginTop: 30,
    marginBottom: 30,
    paddingTop: 8,
    paddingBottom: 8,
    height: 37,
    width: 38,
    marginLeft: -1,
    borderWidth: 1,
    backgroundColor: '#f7f7f7',
    borderColor: '#dee2e6'
  },

  paginatorButtonText: {
    color: '#858585'
  },

  paginatorButtonIcon: {
    fontSize: 14,
    color: '#0e8fcf',
    textAlignVertical: 'center',
    paddingTop: 2
  },

  inactivePaginationButton: {
    opacity: 0.4
  },

  paginatorButtonPrevious: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },

  paginatorButtonNext: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },

  currentPageButton: {
    backgroundColor: '#0e8fcf',
    borderColor: '#0e8fcf'
  },

  currentPageText: {
    color: '#fff'
  },

  noResults: {
    fontSize: 14,
    fontFamily: Fonts.Note,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },

  /* Input Text */
  textField: {
    fontSize: 14,
    fontFamily: Fonts.Input,
    width: '100%',
    display: 'flex',
    height: 35,
    backgroundColor: '#eff0f1',
    color: '#333',
    paddingLeft: 15,
    paddingTop: 8,
    borderRadius: 5,
    marginTop: 10
  },

  textInputField: {
    paddingRight: 25
  },

  deleteText: {
    position: 'absolute',
    paddingTop: 9,
    paddingRight: 10,
    paddingLeft: 10,
    right: 0
  },

  deleteTextInput: {
    position: 'absolute',
    paddingTop: 18,
    paddingRight: 10,
    paddingLeft: 10,
    right: 0
  },

  deleteTextIcon: {
    fontSize: 16,
    color: '#858585'
  },

  /* Switch */
  switchContainer: {
    marginTop: 8
  },

  switchText: {
    paddingTop: 6,
    paddingLeft: 8
  },

  /* Instant search */
  selectedTextContainer: {
    fontSize: 14,
    width: '100%',
    display: 'flex',
    height: 35,
    backgroundColor: '#eff0f1',
    borderRadius: 5,
    marginTop: 10
  },

  defaultText: {
    paddingLeft: 14.5,
    paddingRight: 37,
    lineHeight: 34,
    fontFamily: Fonts.Input,
    color: '#bbbbbb'
  },

  selectedText: {
    color: '#000'
  },

  deleteButton: {
    position: 'absolute',
    right: 0
  },

  /* Other */

  lineSubtitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    paddingTop: 15
  },

  spinnerText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: Fonts.Note,
    textAlign: 'center'
  },

  fieldError: {
    borderWidth: 1,
    borderColor: '#ff0000'
  },

  locationIcon: {
    position: 'absolute',
    opacity: 0.6,
    top: '50%',
    marginTop: -49.5,
    left: '50%',
    marginLeft: -49.5,
    zIndex: 3,
    width: 100,
    height: 100
  },

  phoneIconContainer: {
    height: 29,
    width: 29,
    backgroundColor: '#eee',
    borderRadius: 360
  },

  phoneIcon: {
    fontSize: 22,
    paddingLeft: 5,
    paddingTop: 3
  },

  commentIcon: {
    fontSize: 16
  },

  titleIcon: {
    fontSize: 24
  },

  editIcon: {
    fontSize: 20
  },

  headerIconBox: {
    justifyContent: 'flex-end',
    right: 5
  },

  filterIconBox: {
    marginRight: 10
  },

  trashIconBox: {
    marginTop: -2,
    marginRight: 10
  },

  arrow: {
    marginRight: 5,
    marginLeft: 5
  },

  /* Header lists */
  headerListBox: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },

  headerListBoxNoRadius: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  },

  headerListBoxLastRadius: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default commonStyles