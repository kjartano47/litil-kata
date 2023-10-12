import React, { useState } from "react";
import Button from "./Button";
import { PropTypes } from "prop-types";

const UpdateForm = ({ showUpdateForm, onUpdate, onCancel }) => {
	const [updatedValue, setUpdatedValue] = useState("");
	const [entryIndex, setEntryIndex] = useState("");

	const handleUpdate = () => {
		onUpdate(entryIndex, updatedValue);
		//close the form
		onCancel();
	};
	if (!showUpdateForm) {
		return null;
	}
	return (
		<div>
			<h2>Choose an index and a number to create an entry:</h2>
			<input
				type="number"
				placeholder="Enter the index"
				value={entryIndex}
				onChange={(e) => setEntryIndex(e.target.value)}
			></input>
			<input
				type="number"
				placeholder="Enter the new value"
				value={updatedValue}
				onChange={(e) => setUpdatedValue(e.target.value)}
			></input>
			<Button onClick={handleUpdate} buttonText="Save"></Button>
			<Button onClick={onCancel} buttonText="Cancel"></Button>
		</div>
	);
};

UpdateForm.propTypes = {
	entryIndex: PropTypes.number,
	updatedValue: PropTypes.number,
};
export default UpdateForm;
