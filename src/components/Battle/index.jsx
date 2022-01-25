import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../utils/axios.util';
import BattleList from './BattleList';
import BattleController from './BattleController';
import socket from '../../utils/socket.util';

function Battle() {
	const [list, setList] = useState([]);
	const [selectedBattles, setSelectedBattles] = useState([]);
	const [reloadPercentage, setReloadPercentage] = useState(0);

	const handleBattleList = () => {
		getRequest('/battles').then((res) => {
			if (res.success) {
				setList(res.data);
			}
		});
	};

	const handleSubmit = (e) => {
		postRequest('/battles').then(() => handleBattleList());
		e.preventDefault();
	};

	const handleSelectBattles = (value) => {
		if (selectedBattles.length >= 5) return;

		const duplicate = selectedBattles.find((el) => el === value);
		if (duplicate) return;

		setSelectedBattles([...selectedBattles, value]);
	};

	const removeSelectedBattle = (arr, value) => {
		if (selectedBattles.length === 1) return setSelectedBattles([]);

		const arrFiltered = arr.filter((item) => item !== value);
		return setSelectedBattles(arrFiltered);
	};

	const reload = () => {
		getRequest('/battles/seed').then((res) => {
			if (res.success) {
				handleBattleList();
				setSelectedBattles([]);
			}
		});
	};

	const emptySelectedBattles = () => {
		setSelectedBattles([]);
	};

	useEffect(() => {
		handleBattleList();
		socket.on('reload', (data) => {
			setReloadPercentage(data);
		});
	}, []);

	const renderRemoveSelectedBattles = () => {
		if (!selectedBattles.length) return <div>none</div>;

		return selectedBattles.map((el, i) => (
			<button
				type="button"
				key={el}
				onClick={() =>
					removeSelectedBattle(selectedBattles, el)
				}
			>{`${i !== 0 ? ', ' : ''}${el}`}</button>
		));
	};

	const renderSelectedBattles = () => (
		<div className="cursor-default">
			<div>Selected Battles: {renderRemoveSelectedBattles()}</div>
			<div className="opacity-50">
				{selectedBattles.length > 0 &&
					'click on ids above to remove them'}
			</div>
		</div>
	);

	return (
		<div className="flex flex-col text-center">
			<div>
				<div className="text-3xl">Battle Simulator</div>
				<button
					type="button"
					className="cursor-pointer opacity-50"
					onClick={() => reload()}
				>
					<div>RELOAD</div>
					<div>
						{reloadPercentage === 0
							? ''
							: `${reloadPercentage}%`}
					</div>
				</button>
				<div className="opacity-50">
					(it drops battlesimulator db and seed new battles)
				</div>
				<div>
					<BattleController
						selectedBattles={selectedBattles}
						handleBattleList={handleBattleList}
						emptySelectedBattles={emptySelectedBattles}
					/>
				</div>
				{renderSelectedBattles()}
				<form className="flex flex-col" onSubmit={handleSubmit}>
					<button
						className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Create a new battle
					</button>
				</form>
				<div className="opacity-50">
					(click on battle id bellow to select a battle)
				</div>
				<div>
					<BattleList
						list={list}
						getBattleList={handleBattleList}
						selectBattles={handleSelectBattles}
						selectedBattles={selectedBattles}
					/>
				</div>
			</div>
		</div>
	);
}

export default Battle;
