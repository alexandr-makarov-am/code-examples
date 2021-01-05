import React from "react";
import {StyleSheet, TouchableHighlight, View, Text, TextInput as TextInputBase} from "react-native";

interface ButtonProps {
	type: "primary" | "default",
	title: string,
	onPress: any,
}

export default function Button(props: ButtonProps) {
	return <TouchableHighlight onPress={props.onPress}>
		<View style={[classes.root, classes[props.type]]}>
			<Text style={[classes.text, classes[props.type]]}>{props.title}</Text>
		</View>
	</TouchableHighlight>
};

const classes = StyleSheet.create({
	root: {
		backgroundColor: "white",
		borderColor: "#F85A51",
		borderWidth: 1,
		paddingHorizontal: 32,
		justifyContent: "center",
		borderRadius: 36,
		height: 58,
	},
	text: {
		textAlign: "center",
		textTransform: "uppercase",
	},
	primary: {
		color: "white",
		backgroundColor: "#F85A51",
	},
	default: {
		backgroundColor: "white",
		color: "#F85A51",
	}
});
