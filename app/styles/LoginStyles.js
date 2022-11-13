import { StyleSheet } from 'react-native';
import { isRTL } from '../locales/I18n';

export const loginStyles = StyleSheet.create({

	loginScreen: {
		paddingTop: 70,
		paddingBottom: 70,
		paddingLeft: 30,
		paddingRight: 30,
		width: '100%',
		height: '100%',
		display: 'flex',
		flex: 1
	},

	loginIcon: {
		marginBottom: 5,
		display: 'flex'
	},

	loginContentH1: {
		color: '#333',
		fontSize: 20,
		fontFamily: 'PoppinsBold',
		textAlign: 'left',
	},

	loginContentH2: {
		color: '#858585',
		fontSize: 16,
		fontFamily: 'Poppins',
		marginBottom: 30,
		textAlign: 'left',
	},

	formLoginContent: {
		position: 'relative',
		marginBottom: 15
	},

	loginContent: {
		color: '#df591e',
		fontSize: 12,
		textDecorationLine: 'underline',
	},

	loginInputText: {
		fontSize: 16,
		width: '100%',
		display: 'flex',
		height: 35,
		backgroundColor: 'transparent',
		borderBottomWidth: 1,
		borderBottomColor: '#858585',
		color: '#333',
		fontFamily: 'PoppinsMedium',
		paddingLeft: 22,
		borderRadius: 5,
	},

	iconSignin: {
		height: 50,
		width: 50,
	},

	loginBtn: {
		padding: 10,
		display: 'flex',
		borderRadius: 5,
		backgroundColor: '#df591e',
		marginTop: 15,
		marginBottom: 15,
		width: '100%',
		alignItems: 'center'
	},

	okBtn: {
		padding: 10,
		display: 'flex',
		borderRadius: 5,
		backgroundColor: '#00afca',
		marginTop: 15,
		marginBottom: 15,
		width: '100%',
		alignItems: 'center'
	},

	loginBtnText: {
		fontSize: 16,
		color: '#fff',
		fontFamily: 'PoppinsSemiBold',
	},

	signUpText: {
		color: '#333',
		fontSize: 12,
		marginBottom: 17,
		fontFamily: 'Poppins',
	},

	newAgencieContent: {
		flexDirection: 'row',
		justifyContent: 'center'
	},

	loginInputError: {
		borderWidth: 1,
		borderBottomColor: '#ff0000',
		borderTopColor: '#ff0000',
		borderLeftColor: '#ff0000',
		borderRightColor: '#ff0000',
		borderRadius: 5,
		backgroundColor: '#fceff0'
	},

	inputErrorText: {
		color: '#ff0000',
		fontSize: 12,
		fontWeight: '300',
		textAlign: 'left'
	},

	forgetPasswordInput: {
		fontSize: 16,
		width: '100%',
		display: 'flex',
		height: 35,
		backgroundColor: 'transparent',
		borderBottomWidth: 1,
		borderBottomColor: '#858585',
		color: '#333',
		fontFamily: 'PoppinsMedium',
		paddingLeft: 22,
		borderRadius: 5
	},

	forgetPassBtn: {
		marginTop: 35
	},

	passwordRequirement: {
		color: '#858585',
		textAlign: isRTL() ? 'right' : 'left',
		paddingLeft: isRTL() ? 0 : 15,
		paddingRight: isRTL() ? 15 : 0,
	}
});

export default loginStyles;