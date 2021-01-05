import React from "react";
import Link from "next/link";
import useTranslation from "../../hooks/useTranslation";
import AllowAction from "../AccessGuard/AllowAction";

export default function ProductsNotFound({
	label, description, linkText, link,
}) {
	const { t } = useTranslation();
	return <div className="productsNotFound">
		<h1 className="messageText">{t(label)}</h1>
		<p>{t(description)}</p>
		{ link
			&& <AllowAction>
				<div>
					<Link href={link} as={link}>
						<a className="btnBorder openDropdownBlock">{t(linkText)}</a>
					</Link>
				</div>
			</AllowAction>
		}
	</div>;
}
ProductsNotFound.defaultProps = {
	label: "product_not_found_title",
	description: "product_not_found_advise",
	linkText: "not_found_add_btn",
};
