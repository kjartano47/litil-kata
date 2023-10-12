import React from "react";
import "../styles/Display.css";
import { PropTypes } from "prop-types";
const Display = ({ lastClickedButton, mockData, mockDataSum }) => {
	return (
		<div className="main">
			<h1>The last clicked button is {lastClickedButton}</h1>
			<p>The mock data list contains {mockData.length} entries.</p>
			<p>The mock data sum is: {mockDataSum}</p>
		</div>
	);
};
Display.propTypes = {
	lastClickedButton: PropTypes.string,
	mockData: PropTypes.array,
	mockDataSum: PropTypes.number,
};
export default Display;
