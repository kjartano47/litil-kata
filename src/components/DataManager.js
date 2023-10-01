import React, { useEffect, useState } from "react";
import "../styles/DataManager.css";
import { fetchData } from "../services/MockService";
import Display from "./Display";
import Button from "./Button";
import CreateForm from "./AddNumber";
import DataList from "./DataList";
import UpdateForm from "./UpdateForm";

//helper function to calculate sum of mockData
const calculateSum = (data) => {
	return data.reduce((acc, elem) => acc + Number(elem), 0);
};

const HomeScreen = () => {
	const [lastClickedButton, setLastClickedButton] = useState("");
	const [mockData, setMockData] = useState([]);
	const [mockDataSum, setMockDataSum] = useState(0);
	const [showData, setShowData] = useState(false);
	const [showAddNumber, setShowAddNumber] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [EntryIndex, setEntryIndex] = useState(null);

	//Defining buttons here to reduce the size of the return
	const buttons = [
		<Button
			key="create"
			onClick={() => {
				setLastClickedButton("Create");
				setShowAddNumber(!showAddNumber);
			}}
			buttonText="Create"
		/>,
		<Button
			key="read"
			onClick={() => {
				setLastClickedButton("Read");
				handleRead();
			}}
			buttonText="Read"
		/>,

		<Button
			key="update"
			onClick={() => {
				setLastClickedButton("Update");
				handleOpenUpdateForm(EntryIndex);
			}}
			buttonText="Update"
		/>,

		<Button
			key="delete"
			onClick={() => {
				setLastClickedButton("Delete");
				handleDelete();
			}}
			buttonText="Delete"
		/>,
	];
	//fetching data from MockService and calculating sum
	useEffect(() => {
		const fetchDataAndCalculateSum = async () => {
			const fetchedMockData = await fetchData();
			const calculatedMockDataSum = calculateSum(fetchedMockData);
			setMockData(fetchedMockData);
			setMockDataSum(calculatedMockDataSum);
		};
		fetchDataAndCalculateSum();
	}, []);

	//Function to open update form
	const handleOpenUpdateForm = (index) => {
		setEntryIndex(index);
		setShowUpdateForm(true);
	};

	//function to close update from
	const handleCloseUpdateForm = () => {
		setEntryIndex(null);
		setShowUpdateForm(false);
	};

	//Update the entry and recalculate sum
	const handleUpdate = (entryIndex, updatedValue) => {
		//check validity of entryIndex and updatedValue
		const indexToUpdate = parseInt(entryIndex - 1);
		if (
			!isNaN(indexToUpdate) &&
			indexToUpdate >= 0 &&
			updatedValue >= 0 &&
			indexToUpdate < mockData.length
		) {
			const updatedMockData = [...mockData];
			updatedMockData[indexToUpdate] = updatedValue;
			setMockData(updatedMockData);
			const newSum = calculateSum([...mockData, updatedValue]);
			setMockDataSum(newSum);
			setEntryIndex(null);
			setShowUpdateForm(false);
		}
	};

	//Create a new entry of that is an integer and add it to the end of mockData
	const handleAddNumber = (selectedNumber) => {
		if (Number.isInteger(parseInt(selectedNumber))) {
			const newEntry = parseInt(selectedNumber);
			//update mockData with new entry
			setMockData((prevMockData) => [...prevMockData, newEntry]);
			//updates and sets the sum of mockData
			const newSum = calculateSum([...mockData, newEntry]);
			setMockDataSum(newSum);
			setShowAddNumber(false);
		}
	};

	//Delete last entry from the mockData
	const handleDelete = () => {
		if (mockData.length > 0) {
			//create a copy of mockdata and pop the last entry
			const updatedMockData = [...mockData];
			updatedMockData.pop();
			//update the new mockData
			setMockData(updatedMockData);
			// Calculate the new sum and update mockDataSum
			const newSum = calculateSum(updatedMockData);
			setMockDataSum(newSum);
		}
	};

	//The state showData is toggled between true and false
	const handleRead = () => {
		setShowData((prevShowData) => !prevShowData);
	};

	return (
		<div className="main">
			<Display
				{...{ lastClickedButton, mockData, mockDataSum }}
			></Display>
			{buttons}
			<CreateForm
				onClose={() => setShowAddNumber(false)}
				onSave={handleAddNumber}
				showForm={showAddNumber}
			/>
			<UpdateForm
				onUpdate={handleUpdate}
				onCancel={handleCloseUpdateForm}
				showUpdateForm={showUpdateForm}
				initialValue={mockData[EntryIndex]}
			></UpdateForm>
			{showData && <DataList mockData={mockData} />}
		</div>
	);
};

export default HomeScreen;
