import React, {
	Fragment, useContext, useEffect, useRef,
} from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import LinkItem from "./LinkItem";
import Banner from "./Banner";
import AppContext from "../../contexts/AppContext";
import { setHeaderState } from "../../reducers/appReducer";

export default function DesktopNavigation({ navigation, banner }) {
	const { store: { headerState: { activeMenu } }, dispatch } = useContext(AppContext);
	const ref = useRef();
	useEffect(() => {
		const onClickHandler = (e) => {
			const isMenuBlock = ref.current.contains(e.target);
			if (!isMenuBlock) {
				dispatch(setHeaderState({}));
			}
		};
		if (typeof activeMenu === "number") {
			document.body.addEventListener("click", onClickHandler);
			return () => {
				document.body.removeEventListener("click", onClickHandler);
			};
		}
		return () => {};
	}, [activeMenu]);
	return <nav ref={ref}>
		<ul>
			{ navigation.map((props, categoryIndex) => (
				<li key={categoryIndex}>
					<a onClick={() => {
						dispatch(setHeaderState({
							activeMenu: activeMenu === categoryIndex ? null : categoryIndex,
						}));
					}}>{props.title}</a>
					{ activeMenu === categoryIndex
						&& <Fragment>
							<div className="categories">
								<div className="sidebar">
									<ul>
										<li>
											<Link href={"/catalog/[slug]"} as={`/catalog/${props.slug}`}>
												<a>Все товары</a>
											</Link>
										</li>
									</ul>
									<Banner {...banner} />
								</div>
								<div className="main">
									{ props.children.map((col, groupIndex) => (
										<div className="category-menu" key={groupIndex}>
											<label>
												<LinkItem {...col} />
											</label>
											<ul>
												{ col.children.map((element, elementIndex) => (
													<li key={elementIndex}>
														<LinkItem {...element} />
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							</div>
							<div className="backdrop" onClick={() => dispatch(setHeaderState({}))}/>
						</Fragment>
					}
				</li>
			))}
		</ul>
	</nav>;
}

DesktopNavigation.propTypes = {
	navigation: PropTypes.arrayOf(PropTypes.object),
	banner: PropTypes.object,
	secondMenu: PropTypes.arrayOf(PropTypes.array),
};

DesktopNavigation.defaultProps = {
	navigation: [
		{
			title: "Menu Item",
			href: "#",
			children: [
				{
					title: "Main Menu Item",
					href: "#",
					children: [
						{
							title: "Main Menu Link",
							href: "#",
						},
					],
				},
			],
		},
	],
	secondMenu: [
		[
			{
				title: "Second Menu Item",
				href: "#",
			},
		],
	],
	banner: {
		category: "Banner Category",
		title: "Banner title",
		subtitle: "Banner subtitle",
		imageUrl: "/assets/img/menu_banner.png",
		href: "#",
	},
};
