import React, { Fragment } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageWindow from "./ImageWindow";
import AddWindow from "./AddWindow";
import useField from "../../../../../Form/hooks/useField";
import useErrors from "../../../../../Form/hooks/useErrors";
import useTranslation from "../../../../../../hooks/useTranslation";

export default function ImageBlock({
	name, modalIsOpen = false, modalHandler, removeImage, sortImage,
}) {
	const { t } = useTranslation();
	const { fieldValue = [], setFieldValue } = useField(name);
	const { errors } = useErrors(name);
	const deleteImage = (index, id) => {
		const prev = [...fieldValue];
		if (id) {
			removeImage(id).catch(() => {
				setFieldValue(prev);
			});
		}
		setFieldValue(prev.filter((f, i) => i !== index));
	};
	const addImage = (files) => {
		setFieldValue([
			...fieldValue,
			...files,
		]);
	};
	const onDragEnd = (e) => {
		const reorder = (list, startIndex, endIndex) => {
			const result = Array.from(list);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);
			return result;
		};
		const fileArr = reorder(
			fieldValue,
			e.source.index,
			e.destination.index,
		);
		fileArr.forEach(({ id }, index) => sortImage(index, id));
		setFieldValue(fileArr);
	};

	return <Fragment>
		<div className="image-block">
			<div className="catalogList">
				{fieldValue.map((file, index) => (
					<ImageWindow file={file} onDelete={deleteImage} key={index} index={index} id={file.id} />
				))}
				<AddWindow onAdd={addImage} errors={errors}/>
			</div>
		</div>
		{ modalIsOpen
			&& <div className="modalWindow">
				<div className="modalWindowWrapper">
					<div className="ImageOrder">
						<div className="container">
							<div className="header">
								<div className="first">{t("add_goods_image_order_put_settings")}</div>
								<div className="second">{t("add_goods_image_order_put_warning")}</div>
								<button type="button" className="btnBorder" onClick={modalHandler}>{t("add_goods_image_order_button")}</button>
							</div>
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId="droppable" direction={"horizontal"}>
									{(root) => (
										<div
											className="catalogList"
											ref={root.innerRef}
											{...root.droppableProps}>
											{fieldValue.map((file, index) => (
												<Draggable
													key={file.id || file.name}
													draggableId={`${file.id || file.name}`}
													index={index}>
													{(provided) => (
														<div
															ref={provided.innerRef}
															{...provided.dragHandleProps}
															{...provided.draggableProps}>
															<ImageWindow
																file={file}
																onDelete={deleteImage}
																index={index}
																id={file.id}
															/>
														</div>
													)}
												</Draggable>
											))}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						</div>
					</div>
				</div>
			</div>
		}
	</Fragment>;
}
