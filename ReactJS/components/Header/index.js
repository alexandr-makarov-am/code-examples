import React, {
	Fragment, useContext, useEffect, useState, useRef,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Search from "./Search";
import useTranslation from "../../hooks/useTranslation";
import useHandleClickOutside from "../../hooks/useHandleClickOutside";
import DesktopNavigation from "./DesktopNavigation";
import Basket from "./Basket";
import AppContext from "../../contexts/AppContext";
import { getUserData, setUser } from "../../reducers/appReducer";
import ModalContext from "../../contexts/ModalContext";
import { showModalWindow } from "../../reducers/modalReducer";
import LinkItem from "./LinkItem";
import AllowAction from "../AccessGuard/AllowAction";

export default function Index(props) {
	const [scrollY, setScrollY] = useState(0);
	const [sidebar, setSidebar] = useState(false);
	const { store: { user: { token } }, store, dispatch } = useContext(AppContext);
	const { modalDispatch } = useContext(ModalContext);
	const { t } = useTranslation();
	const router = useRouter();
	const ref = useRef();
	useHandleClickOutside(ref, () => setSidebar(false));
	useEffect(() => {
		const scrollHandler = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, []);
	useEffect(() => {
		const user = getUserData();
		if (!user.token) {
			dispatch(setUser({}));
		}
	}, [router]);
	return <Fragment>
		<header className={`${scrollY > 10 ? "small" : "normal"}`}>
			<div className="wrapper">
				<div className="col left">
					<div className={`point-block ${store.basket.length === 0 && "hide"}`}>
						<div className="view-point"></div>
					</div>
					<div className={`burger ${sidebar ? "open" : ""}`} onClick={() => setSidebar(!sidebar)}>
						<span />
						<span />
						<span />
					</div>
					<div className="search">
						<Search type={"normal"} label={t("header_search_btn")} onSearch={() => setSidebar(false)}/>
					</div>
					<div className="logo">
						<Link href="/">
							<img src="/assets/img/logo.svg" alt="logo" />
						</Link>
					</div>
				</div>
				<div className="middle">
					{token
						&& <AllowAction>
							<div>
								<Link href="/product/add" as={"/product/add"}>
									<a className="btnLink">
										<span className="icon-plus" />
										<span className="title">{t("header_add_item_btn")}</span>
									</a>
								</Link>
							</div>
						</AllowAction>
					}
					{!token
						&& <a className="btnLink" onClick={() => modalDispatch(showModalWindow("authModal"))}>
							<span className="icon-plus" />
							<span className="title">{t("header_add_item_btn")}</span>
						</a>
					}
					{token
						&& <Link href="/account" as={"/account"} >
							<a className="isMobile">
								<span className="icon-person" />
							</a>
						</Link>
					}
					{!token
						&& <a
							className="isMobile"
							onClick={() => modalDispatch(showModalWindow("authModal"))}>
							<span className="icon-enter" />
						</a>
					}
				</div>
				<div className="col right">
					<DesktopNavigation {...props} />
					<div className="core-buttons">
						<Link href="/basket" as={"/basket"} >
							<a>
								<span className="icon-cart" />
							</a>
						</Link>
						{token
							&& <Link href="/account" as={"/account"} >
								<a>
									<span className="icon-person" />
								</a>
							</Link>
						}
						{!token
							&& <a onClick={() => modalDispatch(showModalWindow("authModal"))}>
								<span className="icon-enter" />
							</a>
						}
					</div>
				</div>
			</div>

		</header>
		{sidebar
			&& <div className="mobile-sidebar">
				<div className="content">
					<div className="wrap" ref={ref}>
						<Search type={"mobile"} label={t("header_search_btn")} onSearch={() => setSidebar(false)}/>
						<ul>
							{props.navigation.map((item, categoryIndex) => (
								<li key={categoryIndex}>
									<LinkItem {...item} query="slug" closeSidebar={() => setSidebar(false)}/>
								</li>
							))}
						</ul>
						<Basket cost={"12 440"} count={3} currency={"BYN"} closeSidebar={() => setSidebar(false)}/>
					</div>
				</div>
			</div>
		}
	</Fragment>;
}
