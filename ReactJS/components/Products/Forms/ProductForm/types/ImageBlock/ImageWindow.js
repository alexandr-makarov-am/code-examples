import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductDelPopUp from "../../../../Blocks/ProductDelPopUp";
import useTranslation from "../../../../../../hooks/useTranslation";

const ImageLoader = (value) => new Promise((resolve) => {
	if (value instanceof File) {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(value);
	} else {
		resolve(value.productCarts);
	}
});

export default function ImageWindow({
	file, id, onDelete, index,
}) {
	const { t } = useTranslation();
	const [preview, setPreview] = useState("");
	const [delWindow, setDelWindow] = useState(false);
	const openCloseDelWindow = () => {
		setDelWindow(!delWindow);
	};
	useEffect(() => {
		ImageLoader(file).then((r) => setPreview(r));
	}, [file]);
	return <div className="item">
		<div className="productCard">
			<div className="content">
				<div className="img">
					<img src={preview} alt="product" />
					{delWindow && <ProductDelPopUp
						onCancel={openCloseDelWindow}
						onDelete={() => {
							openCloseDelWindow();
							onDelete(index, id);
						}}
						deltext={t("add_goods_del_window_delete")}/>}
					<div className="moreInfo">
						<ul className="params">
							<li className="favorite">
								<button type="button" className="btnIcon size12"
									onClick={openCloseDelWindow}>
									<img src="/assets/img/trash2.svg" />
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>;
}
ImageWindow.propTypes = {
	img: PropTypes.array.isRequired,
	id: PropTypes.number.isRequired,
	onDelete: PropTypes.func.isRequired,
};
ImageWindow.defaultProps = {
	img: ["/assets/img/item_3.jpg"],
	id: 0,
	onDelete: () => {},
};
