import React from "react";
import Seller from "./Seller";

export default function ProductSeller({ page, seller }) {
	return page !== "seller" && <div className="head"><Seller {...seller}/></div>;
}
