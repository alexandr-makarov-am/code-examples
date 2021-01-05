import React from "react";
import {StyleSheet, View, Text, TouchableHighlight} from "react-native";
import { Foundation } from '@expo/vector-icons';

interface ListItemProps {
	title: String,
	description: String,
	onDelete: any
}

export default function ListItem(props: ListItemProps) {
	return <View style={classes.root}>
		<View style={classes.content}>
			<Text style={classes.title}>
				{props.title}
			</Text>
			<Text>{props.description}</Text>
		</View>
		<View style={classes.actions}>
			<TouchableHighlight onPress={props.onDelete}>
				<Foundation name="x-circle" size={28} color="black" />
			</TouchableHighlight>
		</View>
	</View>
}

const classes = StyleSheet.create({
	root: {
		justifyContent: "center",
		flexDirection: "row",
		backgroundColor: "transparent",
		marginBottom: 4,
	},
	title: {
		fontWeight: "bold",
		color: "black",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	actions: {
		paddingHorizontal: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		backgroundColor: "white",
		borderRadius: 18,
		padding: 24,
		flex: .5,
	}
});
