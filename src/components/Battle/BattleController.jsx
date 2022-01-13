import React, { useEffect } from 'react';
import { getRequest } from '../../utils/axios.util';
import socket from '../../utils/socket.util';

function BattleController({
	selectedBattles,
	handleBattleList,
	emptySelectedBattles,
}) {
	const start = (ids) => {
		getRequest(`/battle/start?ids=${ids}`).then((res) => {
			if (res.success) {
				emptySelectedBattles();
				handleBattleList();
			}
		});
	};

	useEffect(() => {
		socket.on('progress', () => {
			handleBattleList();
		});
	}, []);

	return (
		<div>
			<div>Select 2 - 5 battles to start</div>
			<div>
				<button
					type="submit"
					onClick={() => start(selectedBattles)}
					disabled={selectedBattles.length < 2}
					className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-10"
				>
					START
				</button>
			</div>
		</div>
	);
}

export default BattleController;
