import React from "react";
import { useRouter } from "next/router";

export default function Search(props) {
	const { type, label, onSearch } = props;
	const inputRef = React.useRef();
	const router = useRouter();
	const searchHandler = (evt) => {
		const targetVal = evt.target.value ? evt.target.value : "";
		const refVal = inputRef.current ? inputRef.current.value : "";
		router.push({
			pathname: "/search",
			query: { q: encodeURIComponent(refVal || targetVal) },
		});
		evt.target.blur();
		onSearch();
	};
	const onKeyDownHandler = (evt) => {
		if (evt.keyCode === 13) searchHandler(evt);
	};
	const onFocusHandler = () => {
		window.addEventListener("keyup", (e) => onKeyDownHandler(e));
	};
	const onBlurHandler = () => {
		window.removeEventListener("keyup", onKeyDownHandler);
	};

	return <div className={`searchField ${type}`}>
		<div className="inWrap">
			<input
				type="text"
				name="search"
				ref={inputRef}
				placeholder={label}
				onFocus={onFocusHandler}
				onBlur={onBlurHandler}
			/>
			<span onClick={(e) => searchHandler(e)} className="searchBtn"><span className="icon-search" /></span>
		</div>
	</div>;
}
