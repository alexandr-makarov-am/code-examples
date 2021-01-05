import React, {useEffect, useReducer} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import AppContext, {appReducer, initialData, setLoginSuccess, setSnapshot} from './src/AppContext';
import Account from "./src/screens/Account";
import TrackMeLocation from "./src/modules/TrackMeLocation";
import database from '@react-native-firebase/database';
import Database from "./src/Database";
import i18n from 'i18n-js';
import translations from "./src/translations";
import AskPermissionsScreen from "./src/screens/AskPermissionsScreen";
import { Linking } from 'react-native';

i18n.translations = translations;
// Set the locale once at the beginning of your app.
i18n.locale = TrackMeLocation.locale;

const Stack = createStackNavigator();

export default function App() {
	const [context, dispatch] = useReducer(appReducer, initialData);
	const getInititalRouteName = () => {
		console.log(context);
		if (context.userId) {
			return "Account";
		}
		return "Main";
	};
	useEffect(() => {
		TrackMeLocation.getAuthorization().then((userId:any) => {
			if (userId) {
				dispatch(setLoginSuccess(Database.setUserAuthInfo(userId)));
			}
		})
	}, []);
	useEffect(() => {
		if (context.userId) {
			const ref = database().ref(`/users/${context.userId}`);
			ref.on("value", (snapshot:any) => {
				dispatch(setSnapshot(snapshot.val()));
			})
			return () => {
				ref.off("value");
			}
		}
	}, [context.userId]);
	return (
		<AppContext.Provider value={{ context, dispatch }}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName={getInititalRouteName()}>
					<Stack.Screen
						name="Main"
						component={MainScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Account"
						component={Account}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="GetPermissions"
						options={{
							headerShown: false,
						}}
						component={AskPermissionsScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</AppContext.Provider>
	);
}
