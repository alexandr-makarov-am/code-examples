import React, {Fragment, useEffect} from "react";
import * as GoogleSignIn from 'expo-google-sign-in';
import {Alert, View} from "react-native";
import Button from "../UI/Button";

export default function GoogleAuthButton({ onChange, title }: { onChange: Function, title: string }) {
	const onPressHandler = async () => {
		try {
			try {
				await GoogleSignIn.askForPlayServicesAsync();
				// @ts-ignore
				const { type, user: { uid } } = await GoogleSignIn.signInAsync();
				if (type === 'success') {
					onChange(uid);
				}
			} catch (err) {
				Alert.alert("Error", err.message);
			}
		}catch (err) {
			Alert.alert("Error", err.message);
		}
	};
	useEffect(() => {
		(async function () {
			try {
				await GoogleSignIn.initAsync({});
			}catch (err) {
				Alert.alert("Error", err.message);
			}
		})();
	}, []);
	return <Fragment>
		<View>
			<Button title={title} type="default" onPress={() => onPressHandler()} />
		</View>
	</Fragment>
}
