import React from "react";
import {StyleSheet, TouchableHighlight} from "react-native";

interface RoundButtonProps {
	type: "default" | "primary",
	onPress: any,
	children: any
}

export default function RoundButton(props: RoundButtonProps) {
	return <TouchableHighlight
		activeOpacity={0.6}
		underlayColor="#DDDDDD"
		style={[classes.button, classes[props.type]]}
		onPress={props.onPress}>
		{props.children}
	</TouchableHighlight>
}

const classes = StyleSheet.create({
	button: {
		height: 56,
		width: 56,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 64,
		fontWeight: "bold",
		borderWidth: 2,
		fontSize: 18,
	},
	default: {
		borderColor: "#F85A51",
		color: "#F85A51",
		backgroundColor: "white",
	},
	primary: {
		borderColor: "#F85A51",
		color: "white",
		backgroundColor: "#F85A51",
	}
});
