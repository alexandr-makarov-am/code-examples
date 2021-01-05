import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { SkeletonBlock } from "../../Skeleton";

export default function EditButton({ disabled, showEditBtn, slug }) {
	let btn = "";
	if (showEditBtn) {
		btn = <div className={`right ${disabled && "disabled"}`}>
			<SkeletonBlock>
				<Link href={"/product/[slug]/edit"} as={`/product/${slug}/edit`}>
					<a className="btnIcon">
						<span className="icon-write"></span>
					</a>
				</Link>
			</SkeletonBlock>
		</div>;
	}

	return btn;
}
EditButton.propTypes = {
	props: PropTypes.object,
};
EditButton.defaultProps = {
	props: {},
};
