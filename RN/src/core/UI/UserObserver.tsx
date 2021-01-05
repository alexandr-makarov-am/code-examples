import React, {Fragment, useEffect, useState} from "react";
import {Marker} from "react-native-maps";
import Utils from "../../modules/Utils";
import Database from "../../Database";
import {Image} from "react-native";

const iconPeople = require("../../images/people.png");

export default function UserObserver(props: any) {
	const { userId, title } = props;
	const [state, setState] = useState({});
	const { connected, lat, lng }:{[key:string]:any} = state;
	useEffect(() => {
		const ref = Database.subscribeToGetUserInfo(userId, (snapshot: any) => {
			const val = snapshot.val();
			if (val) {
				setState(val);
			}
		});
		return () => {
			ref.off("value");
		}
	}, []);
	return <Fragment>
		{ connected && lat && lng
			&& <Marker
				title={title}
				description={`${lat},${lng}`}
				coordinate={Utils.getPosition(state)}>
			<Image source={iconPeople} style={{width: 48, height: 48}} />
		</Marker>
		}
	</Fragment>
}
