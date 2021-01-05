import React, { useState } from "react";
import useTranslation from "../../../../../../hooks/useTranslation";

export default function AddWindow({
	imgFile, setImgFile, previewImage, onAdd, errors,
}) {
	const active = { border: "4px dashed #B4B9C6", backgroundColor: "#F8F9FB" };
	const disabled = { border: "1px dashed #B4B9C6", backgroundColor: "#F8F9FB" };
	const [style, setStyle] = useState(disabled);
	const { t } = useTranslation();
	const onDragEnter = () => {
		setStyle(() => active);
	};
	const onDragLeave = () => {
		setStyle(() => disabled);
	};

	const onDrop = (e) => {
		setStyle(() => disabled);
		const file = e.dataTransfer.files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			onAdd([...previewImage, event.target.result]);
		};
		reader.readAsDataURL(file);
		setImgFile([...imgFile, { file: e.dataTransfer.files, position: 0 }]);
	};

	const onChange = (e) => {
		onAdd(e.currentTarget.files);
	};

	const inputClean = (e) => {
		e.target.value = null;
	};
	return <div className="item addImage">
		<div className="productCard">
			<div className="content">
				<div className="img">
					<div className="moreInfo">
						<div className={`add-block ${errors && "error"}`}
							onDragEnter={(e) => onDragEnter(e)}
							onDrop={(e) => onDrop(e)}
							onDragLeave={(e) => onDragLeave(e)}
							style={style}>
							<input
								type="file"
								name="images"
								accept={"image/jpeg"}
								multiple={true}
								onChange={(e) => { onChange(e); }}
								onClick={(e) => inputClean(e)}
							/>
							<div className="content-block">
								<div className="addImg">
									<img src="/assets/img/Group 437.svg"></img>
								</div>
								<div className="text-block">
									<div className="add-photo">{t("add_goods_add_window_addphoto")}</div>
									<div className="subtext">{t("add_goods_add_window_maxsize")}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>;
}
