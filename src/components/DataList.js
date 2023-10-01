import React from "react";
import "../styles/DataList.css";

const DataList = ({ mockData }) => {
	return (
		<ol>
			{mockData.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ol>
	);
};

export default DataList;
