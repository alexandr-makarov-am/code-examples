import React from "react";
import Link from "next/link";
import useTranslation from "../../hooks/useTranslation";

export default function BrandNotFound({ photo, title }) {
	const { t } = useTranslation();
	return <div className="brandsNotFound">
		{photo && <img src={photo} alt={title} />}
		<h1 className="messageText">{t("brand_not_found_title")}</h1>
		<p>{t("brand_not_found_advise")}</p>
		<Link href="/product/add" as={"/product/add"} >
			<a className="btnBorder openDropdownBlock">{t("not_found_add_btn")}</a>
		</Link>
	</div>;
}
