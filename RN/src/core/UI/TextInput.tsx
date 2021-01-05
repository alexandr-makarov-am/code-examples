import React from "react";
import {StyleSheet, TextInput as TextInputBase} from "react-native";

export default function TextInput(props:any) {
	return <TextInputBase {...props} style={[classes.root, props.style]} />
}

const classes = StyleSheet.create({
	root: {
		borderColor: "#F85A51",
		borderWidth: 1,
		backgroundColor: "#F89A94",
		paddingVertical: 15,
		paddingHorizontal: 24,
		borderRadius: 36,
		height: 58,
		color: "#fff",
	},
});
