import { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function useTranslation() {
	const { store: { translations, lang, fallbackLng } } = useContext(AppContext);
	return {
		t: (key) => (translations[lang] !== undefined
			? translations[lang][key]
			: translations[fallbackLng][key] || key),
	};
}
