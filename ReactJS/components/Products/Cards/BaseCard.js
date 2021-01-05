import React, { useContext, useState } from "react";
import Link from "next/link";
import { SkeletonBlock } from "../../Skeleton";
import AppContext from "../../../contexts/AppContext";
import getImageList from "../../../utils/getImageList";
import { getFirstImage } from "../../../utils/imagePosition";

export default function BaseCard(props) {
	const {
		head, left, right, children, productProps, route = "/product/",
	} = props;
	const { title, slug, images } = productProps;
	const [defaultImage, setDefaultImage] = useState(false);
	const { store: { headerState: { isFocused } } } = useContext(AppContext);
	return <div className={`productCard ${isFocused ? "isFocused" : ""}`}>

		<div className="head">{head}</div>
		<div className="content">
			<Link href={`${route}[slug]`} as={`${route}${slug}`}>
				<a className="productLink"></a>
			</Link>
			<div className="img">
				<SkeletonBlock>
					<img
						src={`${defaultImage || getFirstImage(getImageList(images))}`}
						onError={() => setDefaultImage("/assets/img/default_product_img.svg")}
						alt={title}
						decoding="async"
					/>
				</SkeletonBlock>
				{children}
			</div>
		</div>
		<div className="info">
			<div className="left">{left}</div>
			<div className="right">{right}</div>
		</div>
	</div>;
}
