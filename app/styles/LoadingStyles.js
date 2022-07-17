import { StyleSheet } from 'react-native';

const Fonts = {
	Note: null,
}

export const loadingStyles = StyleSheet.create({

	modalParent: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 9999
	},

	modalOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: '#00000099',
		opacity: 0.6
	},

	loadingCursor: {
		width: 100,
		height: 100
	},

	loadingCursorText: {
		color: '#fff',
		fontSize: 18,
		fontFamily: Fonts.Note
	}
});

export default loadingStyles;