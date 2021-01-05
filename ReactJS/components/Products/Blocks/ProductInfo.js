import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { SkeletonBlock } from "../../Skeleton";
import Price from "./Price";

export default function ProductInfo(props) {
	const { brand } = props;
	return <Fragment>
		{ brand
				&& <Link href="/brand/[slug]" as={`/brand/${brand.slug}`}>
					<a className="brand">
						<SkeletonBlock className="block-text">
							{brand.title}
						</SkeletonBlock>
					</a>
				</Link>
		}
		<Price {...props} />
	</Fragment>;
}

ProductInfo.defaultProps = {
	brand: { slug: "adidas", title: "title clothes" },
};

ProductInfo.propTypes = {
	brand: PropTypes.object,
};
