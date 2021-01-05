import { useEffect, useReducer } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import appReducer, {
	addNotification, getBasket, getFavorites, getUserData,
	initialStore, setBasket, setFavorites,
	setLoading,
	setMessages, setUser,
} from "../reducers/appReducer";
import modalReducer, { showModalWindow } from "../reducers/modalReducer";
import { useMessageObserver, useMessageSound } from "./useChat";
import Api from "../api";
import { useAuthorizationObserver } from "../utils/SecuredArea";

export default function useApp(navigation = {}) {
	const [store, dispatch] = useReducer(appReducer, { ...initialStore, navigation });
	const [modal, modalDispatch] = useReducer(modalReducer);
	const { user: { id, token } } = store;
	const initApp = () => {
		const userData = getUserData();
		dispatch(setUser(userData, false));
		if (userData.token) {
			Api.getCardProducts(userData.token).then(({ products }) => {
				if (products) {
					dispatch(setBasket(products));
				}
			});
		} else {
			dispatch(setBasket(getBasket()));
		}
		dispatch(setFavorites(getFavorites()));
	};
	const unAuthorizedHandler = () => {
		initApp();
		useAuthorizationObserver(token);
		modalDispatch(showModalWindow("authModal"));
	};
	let socket = null;
	if (token) {
		const audio = useMessageSound();
		socket = useMessageObserver(token, (e) => {
			if (e !== null) {
				if (parseInt(e.senderId, 10) !== parseInt(id, 10)) {
					try {
						audio.play().catch((err) => console.warn(err));
					} catch (err) {
						console.warn(err);
					}
					dispatch(addNotification("У вас новое сообщение", e.text, e.senderId));
				}
				socket.emit("sendHistory");
			}
		}, (data) => {
			dispatch(setMessages(data));
		}, (err) => {
			console.log(err);
		});
	}
	useEffect(() => {
		initApp();
		Router.events.on("routeChangeStart", () => {
			NProgress.start();
			dispatch(setLoading(true));
		});
		Router.events.on("routeChangeComplete", () => {
			NProgress.done();
			dispatch(setLoading(false));
		});
		Router.events.on("routeChangeError", () => {
			NProgress.done();
			dispatch(setLoading("error"));
		});
		window.addEventListener("unauthorized", unAuthorizedHandler);
		return () => {
			window.removeEventListener("unauthorized", unAuthorizedHandler);
		};
	}, []);
	return [store, dispatch, modal, modalDispatch];
}
