import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { SkeletonBlock } from "../../Skeleton";
import getUserName from "../../../utils/getUserName";

export default function Seller({
	avatar, id, className = "linkType1", firstName, lastName,
}) {
	const userAvatar = avatar || "/assets/img/user_default2.png";
	return <div className={`sellerBlock ${className}`}>
		<div className="icon">
			<SkeletonBlock>
				<Link href="/profile/[slug]" as={`/profile/${id}`}>
					<img src={userAvatar} alt="seller" />
				</Link>
			</SkeletonBlock>
		</div>
		<span className="name">
			<SkeletonBlock className="block-text">
				<Link href="/profile/[slug]" as={`/profile/${id}`}>
					<a>{ getUserName({ firstName, lastName, id }) }</a>
				</Link>
			</SkeletonBlock>
		</span>
	</div>;
}

Seller.propTypes = {
	avatar: PropTypes.string,
	username: PropTypes.string,
};

Seller.defaultProps = {
	avatar: "/assets/img/user_1.png",
	username: "martyniuk_yulia",
	id: 2321,
};
