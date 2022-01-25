import React from 'react';
import { Link } from 'react-router-dom';
import { deleteRequest } from '../../utils/axios.util';

function BattleList({ list, getBattleList, selectBattles, selectedBattles }) {
	const deleteBattle = (id) => {
		deleteRequest(`/battles/${id}`).then(() => getBattleList());
	};

	const renderList = () => {
		if (!list.length) {
			return <div>No battles added</div>;
		}

		return list.map((el) => (
			<div
				style={{
					backgroundColor: selectedBattles.includes(el.id)
						? '#93b9ff'
						: '',
				}}
				className="hover:cursor-default hover:bg-slate-200 p-1 flex justify-between text-left"
				key={el.id}
			>
				<button
					type="button"
					onClick={function select() {
						if (el.status === 'ready') {
							return selectBattles(el.id);
						}
						return null;
					}}
				>
					<div>Battle ID: {el.id}</div>
					<div>Status: {el.status}</div>
					{el.winner ? (
						<div>Battle winner: {el.winner}</div>
					) : (
						''
					)}
				</button>
				<div>
					<div>
						<Link to={`/battle/${el.id}`}>View</Link>
					</div>
					<button
						type="button"
						className="opacity-30 hover:cursor-pointer"
						onClick={() => deleteBattle(el.id)}
					>
						Delete
					</button>
				</div>
			</div>
		));
	};

	return <div>{renderList()}</div>;
}

export default BattleList;
