import React, { useState } from "react";
import Button from "./Button";
import { PropTypes } from "prop-types";

const AddNumber = ({ showForm, onClose, onSave }) => {
	const [selectedNumber, setSelectedNumber] = useState("");
	const handleSave = () => {
		//call the onSave func with the selectedNumber

		onSave(selectedNumber);
		//close the form
		onClose();
	};
	//Making sure the showForm is only shown when it equals true
	if (!showForm) {
		return null;
	}
	return (
		<div>
			<h2>Choose a number to create an entry:</h2>
			<input
				type="number"
				placeholder="Enter a number"
				value={selectedNumber}
				onChange={(e) => setSelectedNumber(e.target.value)}
			></input>
			<Button onClick={handleSave} buttonText="Save"></Button>
			<Button onClick={onClose} buttonText="Cancel"></Button>
		</div>
	);
};
AddNumber.protoTypes = {
	selectedNumber: PropTypes.number,
};
export default AddNumber;
