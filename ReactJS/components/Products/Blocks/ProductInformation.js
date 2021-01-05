import React from "react";

export default function ProductionInformation({
	size, color, title, children,
}) {
	const setClassName = (code) => {
		if (/^#[Ff]{3,6}$/.test(code)) return "color isWhite";
		if (code === "multicolor") return "color multi";
		return "color";
	};
	return <>
		<div className="moreInfo">
			<span className="title">{title}</span>
			<ul className="params">
				{ size
					&& <li>
						<div className="size">{size.title}</div>
					</li>
				}
				{color
					&& <li>
						<div className={setClassName(color.code)}>
							<div style={{ backgroundColor: color.code }}></div>
							<span>{color.title}</span>
						</div>
					</li>}
				{children}
			</ul>
		</div>
	</>;
}
