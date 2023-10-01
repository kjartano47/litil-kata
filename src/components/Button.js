import React from "react";
import "../styles/Button.css";
const Button = ({ onClick, buttonText }) => {
	return (
		<button className="button" onClick={onClick}>
			{buttonText}
		</button>
	);
};
export default Button;
