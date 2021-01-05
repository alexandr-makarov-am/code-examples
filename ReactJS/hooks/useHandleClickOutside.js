import { useEffect } from "react";

export default function useHandleClickOutside(ref, handler) {
	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (ref.current) {
			const handleClickOutside = (event) => {
				if (!ref.current || ref.current.contains(event.target)) {
					return;
				}
				handler(event);
			};
			document.addEventListener("click", handleClickOutside);
			return () => {
				document.removeEventListener("click", handleClickOutside);
			};
		}
	}, [ref, handler]);
}
