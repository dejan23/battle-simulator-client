import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { getRequest, deleteRequest } from '../../utils/axios.util';
import BattleAddArmy from './BattleAddArmy';

function BattleSingle() {
	const [battle, setBattle] = useState(null);
	const { id } = useParams();

	const fetchBattle = () => {
		getRequest(`/battles/${id}`).then((res) => {
			if (res.success) {
				setBattle(res.data.battle);
			}
		});
	};

	const deleteArmy = (armyId, battleId) => {
		deleteRequest(`/armies/${armyId}/battles/${battleId}`).then(() =>
			fetchBattle()
		);
	};

	const checkIfInclude = (string) => {
		const list = ['ready', 'waiting for armies'];
		let flag = true;

		for (let i = 0; i < list.length; i += 1) {
			if (!list.includes(string)) {
				flag = false;
			}
		}

		return flag;
	};

	useEffect(() => {
		fetchBattle();
	}, []);

	const renderBattle = (data) => {
		const armies = () => {
			if (!data.armies.length) return 'No armies added';

			return data.armies.map((el) => (
				<div
					style={{
						backgroundColor: el.winner ? '#c7ffc7' : '',
					}}
					className="flex p-1 items-center justify-between hover:bg-slate-200 border-b mb-2"
					key={el.id}
				>
					<div>
						<div>Army Name: {el.name}</div>
						<div>Units: {Math.ceil(el.units)}</div>
						<div>Initial Units: {el.initUnits}</div>
						<div>Strategy: {el.strategy}</div>
						<div>
							Created at:{' '}
							{dayjs(el.createdAt).format(
								'DD-MM-YYYY'
							)}
						</div>
						<div>
							{el.winner ? (
								<div>
									Winner winner chicken
									dinner!
								</div>
							) : (
								''
							)}
						</div>
					</div>
					{checkIfInclude(data.status) && (
						<button
							type="button"
							className="hover:cursor-pointer"
							onClick={() =>
								deleteArmy(el.id, el.battleId)
							}
						>
							Remove
						</button>
					)}
				</div>
			));
		};

		return (
			<div>
				<div className="mb-5">
					<div>Battle id: {data.id}</div>
					<div>Status: {data.status}</div>
					<div>
						Created at:{' '}
						{dayjs(data.createdAt).format('DD-MM-YYYY')}
					</div>
					<div>
						{data.winner ? (
							<div className="text-blue-400">
								Battle winner: {data.winner}
							</div>
						) : (
							''
						)}
					</div>
					<div>
						{data.winner ? (
							<Link
								className="text-blue-600"
								to={`/battle/${data.id}/log`}
							>
								View battle log
							</Link>
						) : (
							''
						)}
					</div>
				</div>
				{checkIfInclude(data.status) && (
					<BattleAddArmy fetchBattle={fetchBattle} />
				)}
				{armies()}
			</div>
		);
	};

	return (
		<div>
			<div className="text-center text-2xl mb-5">
				<Link to="/">Go back to homepage</Link>
			</div>
			<div>{battle && renderBattle(battle)}</div>
		</div>
	);
}

export default BattleSingle;
