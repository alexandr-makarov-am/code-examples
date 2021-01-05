import React, { useState } from "react";
import BaseCard from "./BaseCard";
import ProductInformation from "../Blocks/ProductInformation";
import ProductInfo from "../Blocks/ProductInfo";
import EditButton from "../Buttons/EditButton";
import ButtonsDeleteArchive from "../Buttons/ButtonsDeleteArchive";
import ProductionDelete from "../Blocks/ProductDelete";
import ProductDelPopUp from "../Blocks/ProductDelPopUp";

export default function CardEdit(props) {
	const [showRemove, setShowRemove] = useState(false);
	return <div className="editItem">
		<BaseCard
			route="/product/"
			productProps={props}
			left={(<ProductInfo {...props} />)}
			right={(<EditButton {...props} />)}>
			{ !showRemove && <ProductInformation {...props}>
				<ButtonsDeleteArchive {...props} onClick={() => setShowRemove(true) }/>
			</ProductInformation>}
			{ showRemove && <ProductionDelete {...props}>
				<ProductDelPopUp
					{...props}
					onDelete={() => {
						setShowRemove(false);
						props.onDelete(props);
					}}
					onCancel={() => setShowRemove(false)}
				/>
			</ProductionDelete> }
		</BaseCard>
	</div>;
}
