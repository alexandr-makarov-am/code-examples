import { useContext, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
import AppContext from "../contexts/AppContext";
import { setMessages } from "../reducers/appReducer";

let socketInstance = null;
let audio = null;

const initSocketConnection = (token, events = []) => {
	if (socketInstance === null) {
		socketInstance = io(`${process.env.socketUrl}/chat/private`, {
			query: { token },
			reconnection: true,
			reconnectionAttempts: 5,
		});
		events.forEach((event) => {
			socketInstance.on(event.name, event.callback);
		});
		socketInstance.on("connect", () => {
			setTimeout(() => {
				events.forEach((event) => {
					if (event.emit) {
						socketInstance.emit(event.emit);
					}
				});
			}, 1000);
		});
	}
	return socketInstance;
};

export function destroySocketConnection() {
	if (socketInstance) {
		socketInstance.disconnect();
		socketInstance.close();
		socketInstance = null;
	}
}

export function useMessageObserver(token, msgCallback, historyCallback, errorCallback) {
	return initSocketConnection(token, [
		{
			name: "receiveMessage",
			callback: msgCallback,
		},
		{
			name: "receiveHistory",
			emit: "sendHistory",
			callback: historyCallback,
		},
		{
			name: "error",
			callback: errorCallback,
		},
	]);
}

export function useMessageSound() {
	if (audio === null) {
		audio = new Audio("https://vk.com/mp3/bb1.mp3");
	}
	return audio;
}

export function useSendMessage(token, recipientId) {
	const socket = initSocketConnection(token);
	return (message) => {
		socket.emit("sendMessage", { to: recipientId, msg: message, createdAt: moment().format() });
		socket.emit("sendHistory");
	};
}

export default function useChat(token, recipientId) {
	const socket = initSocketConnection(token);
	const { store: { messages }, dispatch } = useContext(AppContext);
	useEffect(() => {
		const messageHandler = (e) => {
			dispatch(setMessages(
				messages.map((el) => {
					const participant = el.participants.filter(
						(item) => parseInt(item.userId, 10) === parseInt(recipientId, 10),
					);
					if (participant.length > 0) {
						el.messages.unshift(e);
					}
					return el;
				}),
			));
		};
		socket.on("messageSaved", messageHandler);
		return () => {
			socket.off("messageSaved", messageHandler);
		};
	});
	const sendMessage = (message) => {
		socket.emit("sendMessage", { to: recipientId, msg: message, createdAt: moment().format() });
	};
	return { sendMessage };
}
