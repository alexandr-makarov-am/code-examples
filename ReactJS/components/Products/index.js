import React, { cloneElement } from "react";
import Filters from "../Filters";
import ProductsNotFound from "./ProductsNotFound";
import Paginator from "../Paginator";

export default function Products({
	children, filters, page, pageCount,
}) {
	const hasFilter = filters && filters.length > 0;
	const data = Array.isArray(children) ? children : [children];
	const childrenRenderrer = (content) => content.map((product, index) => {
		if (Array.isArray(product)) {
			return childrenRenderrer(product);
		}
		return <div className={`item ${product.props.className ? product.props.className : ""}`} key={index}>
			{cloneElement(product)}
		</div>;
	});
	return <div className="catalogWrapper">
		{ data.length > 0
			&& <div className="catalogList">
				{childrenRenderrer(data)}
			</div>
		}
		{ data.length < 1
			&& <div className="catalog-message">
				<ProductsNotFound link="/product/add"/>
			</div>
		}
		<Paginator
			curPage={page ? Number(page) : 1}
			className="mobile"
			pageCount={Number(pageCount)}
			size={4}
			excludeQuery={["slug", "page"]}
		/>
		{hasFilter && <Filters filters={filters} />}
	</div>;
}
