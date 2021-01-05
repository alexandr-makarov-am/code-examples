import React, { Fragment } from "react";
import App from "next/app";
import Head from "next/head";
import Header from "../src/components/Header";
import "rc-slider/assets/index.css";
import "../src/themes/index.scss";
import AppContext from "../src/contexts/AppContext";
import Footer from "../src/components/Footer";
import "nprogress/nprogress.css";
import ModalContext from "../src/contexts/ModalContext";

import Api from "../src/api";
import { checkTokenValidation, getToken, removeToken } from "../src/utils/SecuredArea";
import Notification from "../src/components/Notification";
import useApp from "../src/hooks/useApp";
import Modals from "../src/components/Modals";

function MyApp({
	Component, pageProps, navigation,
}) {
	const [store, dispatch, modal, modalDispatch] = useApp(navigation);
	return <Fragment>
		<Head>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<AppContext.Provider value={{ store, dispatch }}>
			<ModalContext.Provider value={{ modal, modalDispatch }}>
				<div className="globalWrapper">
					<Header navigation={navigation} />
					<Component {...pageProps } />
					<Footer />
					<Modals store={store} />
				</div>
			</ModalContext.Provider>
			<Notification />
		</AppContext.Provider>
	</Fragment>;
}

MyApp.getInitialProps = async (appContext) => {
	const appProps = await App.getInitialProps(appContext);
	const navigation = await Api.navigation();
	const { token } = getToken(appContext.ctx);
	if (token && !checkTokenValidation(token)) {
		removeToken(appContext.ctx);
	}
	return { ...appProps, navigation };
};

export default MyApp;
