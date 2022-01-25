import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Formik, Field, Form } from 'formik';
import { postRequest } from '../../utils/axios.util';

// TO:DO
// real time field validation

function BattleAddArmy({ fetchBattle }) {
	const { id } = useParams();
	const [errorMessages, setErrorMessages] = useState(null);

	const addArmyToTheBattle = (values) => {
		setErrorMessages(null);
		postRequest(`/armies`, { ...values, battleId: id }).then((res) => {
			if (res?.response?.data.code === 400) {
				setErrorMessages(res.response.data.message);
			}
			fetchBattle();
		});
	};

	return (
		<div>
			<Formik
				initialValues={{
					name: '',
					units: '',
					strategy: '',
				}}
				onSubmit={async (values) => {
					addArmyToTheBattle(values);
				}}
			>
				<Form className="flex flex-col">
					<div className="flex flex-col mt-2 mb-2">
						<label htmlFor="name">Army Name</label>
						<Field
							id="name"
							name="name"
							placeholder="army1"
						/>
					</div>

					<div className="flex flex-col mt-2 mb-2">
						<label htmlFor="units">Units</label>
						<Field
							id="units"
							name="units"
							placeholder="80-100"
						/>
					</div>

					<div
						className="mt-2 mb-2"
						role="group"
						aria-labelledby="my-radio-group"
					>
						<div>Strategy</div>
						<div>
							<label
								htmlFor="strategy"
								className="m-1"
							>
								<Field
									type="radio"
									name="strategy"
									value="random"
								/>
								Random
							</label>
							<label
								htmlFor="strategy"
								className="m-1"
							>
								<Field
									type="radio"
									name="strategy"
									value="strongest"
								/>
								Strongest
							</label>
							<label
								htmlFor="strategy"
								className="m-1"
							>
								<Field
									type="radio"
									name="strategy"
									value="weakest"
								/>
								Weakest
							</label>
						</div>
					</div>

					<div className="text-red-500">
						{errorMessages}
					</div>

					<button
						className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Add new army
					</button>
				</Form>
			</Formik>
		</div>
	);
}

export default BattleAddArmy;
