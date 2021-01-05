import React, {useContext, useEffect} from "react";
import {View, StyleSheet, Text, Image, Alert} from "react-native";
import GoogleAuthButton from "../core/AuthButtons/GoogleAuthButton";
import AppContext, {setLoginSuccess} from "../AppContext";
import Database from "../Database";
import i18n from 'i18n-js';
import * as Permissions from 'expo-permissions';

const logo = require("../images/logo.png");

export default function MainScreen(props:any) {
	const { dispatch }:{[key:string]:any} = useContext(AppContext);
	const onLoginButton = (id: string) => {
		Permissions.askAsync(Permissions.LOCATION).then(({status}) => {
			if (status === 'granted') {
				dispatch(setLoginSuccess(Database.setUserAuthInfo(id)));
				props.navigation.navigate("Account");
			}
		});
	};
	return <View style={classes.root}>
		<View style={[classes.logo]}>
			<Image source={logo} style={{width: 296, height: 296}}/>
			<Text style={[classes.text, classes.textCenter]}>
				{i18n.t("mainScreenDescription")}
			</Text>
		</View>
		<View style={classes.actions}>
			<GoogleAuthButton onChange={onLoginButton} title={i18n.t("mainScreenLoginText")} />
		</View>
		<View style={classes.footer}>
			<Text style={[classes.text, classes.textCenter]}>
				{i18n.t("mainScreenPrivatePolicy")}
			</Text>
		</View>
	</View>
};

const classes = StyleSheet.create({
	root: {
		flex: 1,
		padding: 16,
		backgroundColor: "#F85A51",
	},
	logo: {
		justifyContent: "center",
		alignItems: "center",
		flex: 2
	},
	actions: {
		flex: 1
	},
	footer:{
		height: 60,
		alignItems: "center",
		justifyContent: "center",
	},
	textCenter: {
		textAlign: "center",
	},
	text: {
		color: "#fff",
		fontSize: 16,
	},
	title: {
		fontWeight: "bold",
		fontSize: 36,
		paddingVertical: 18,
	},
});
