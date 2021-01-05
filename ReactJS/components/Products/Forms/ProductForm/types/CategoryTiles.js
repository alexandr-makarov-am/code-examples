import React, { Fragment } from "react";

export default function CategoryTiles({
	options, onChange, value,
}) {
	const onClickHandler = (id) => {
		onChange(id);
	};
	return <Fragment>
		<div className="cat-block-wrapper">
			{options.map((item, id) => (
				<button key={id} type="button" className={`cat-block ${item.id === value && "active"}`}>
					<div className={"cat"} onClick={() => onClickHandler(item.id)}>
						<div className={`img-${item.slug} ${item.id === value && "active"}`}></div>
						<div className={`catText ${item.id === value && "active"}`}>{item.title}</div>
					</div>
				</button>
			))}
		</div>
	</Fragment>;
}
