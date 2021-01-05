import React from "react";
import TrackMeLocation from "./modules/TrackMeLocation";

export default React.createContext({});

export const initialData = {
	userId: TrackMeLocation.userId || null,
	connected: false,
	subscriptions: {},
	lat: null,
	lng: null,
}

export const types = {
	ADD_SUBSCRIPTIONS: "ADD_SUBSCRIPTION",
	REMOVE_SUBSCRIPTIONS: "REMOVE_SUBSCRIPTIONS",
	SET_STATUS: "SET_STATUS",
	SET_SNAPSHOT: "SET_SNAPSHOT",
	SET_GPS_COORDS: "SET_GPS_COORDS",
	SET_SECURITY_CODE: "SET_SECURITY_CODE",
}

interface appActionProps {
	type: string,
	payload: any,
}

export function appReducer(state: any, action: appActionProps) {
	switch (action.type) {
		case types.ADD_SUBSCRIPTIONS:
			return {
				...state,
				subscriptions: {
					...state.subscriptions,
					...action.payload
				},
			};
		case types.REMOVE_SUBSCRIPTIONS:
			const subscriptions = { ...state.subscriptions };
			delete subscriptions[action.payload];
			return {
				...state,
				subscriptions,
			};
		case types.SET_STATUS:
			return {
				...state,
				...action.payload,
			};
		case types.SET_SECURITY_CODE:
			return {
				...state,
				code: action.payload
			};
		case types.SET_SNAPSHOT:
		case types.SET_GPS_COORDS:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}

export function setSnapshot(snapshot: object) {
	return {
		type: types.SET_SNAPSHOT,
		payload: snapshot,
	}
}

export function setLoginSuccess(user:{connected: string, userId: string}) {
	TrackMeLocation.saveAuthorization(user.userId);
	return {
		type: types.SET_STATUS,
		payload: user,
	}
}

export function setLogoutSuccess() {
	return {
		type: types.SET_STATUS,
		payload: initialData,
	}
}

export function addSubscription(subscription: object) {
	return {
		type: types.ADD_SUBSCRIPTIONS,
		payload: subscription,
	}
}

export function removeSubscription(id: string) {
	return {
		type: types.REMOVE_SUBSCRIPTIONS,
		payload: id,
	}
}

export function setGPSCoords(lat: number, lng: number) {
	return {
		type: types.SET_GPS_COORDS,
		payload: { lat, lng }
	}
}

export function setSecurityCode(props: {code:number}) {
	return {
		type: types.SET_SECURITY_CODE,
		payload: props.code
	}
}
