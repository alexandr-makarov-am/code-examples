import React, { useContext } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import AppContext from "../../contexts/AppContext";
import { setHeaderState } from "../../reducers/appReducer";

export default function LinkItem(props) {
	const {
		slug, title, className, query, activeFilled, closeSidebar,
	} = props;
	const path = `/catalog/${slug}`;
	const { dispatch } = useContext(AppContext);
	const router = useRouter();
	const onClickHandler = () => {
		closeSidebar();
		dispatch(setHeaderState(true));
		setTimeout(() => {
			dispatch(setHeaderState(false));
		}, 100);
	};
	return <>
		<Link href={`/catalog/[${query}]`} as={path}>
			<a
				className={`${className} ${router.asPath === path || (router.asPath.indexOf(path) !== -1 && activeFilled) ? "active" : ""}`}
				onClick={onClickHandler}>
				{title}
			</a>
		</Link>
	</>;
}

LinkItem.propTypes = {
	href: PropTypes.string,
	title: PropTypes.string,
	slug: PropTypes.string,
	activeFilled: PropTypes.bool,
	optionalClassName: PropTypes.string,
};

LinkItem.defaultProps = {
	query: "slug",
	activeFilled: true,
	closeSidebar: () => {},
};
