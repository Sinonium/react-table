import React, { useEffect, useState } from 'react';
import List from './components/List';

function App() {
	const [data, setData] = useState([])

	const fetchData = async() => {
		const response = await fetch('user_data_1000.json')
		const json = await response.json()
		setData(json)
	}

	useEffect(() => {
		fetchData() 
	}, [])

	const columns = React.useMemo(() => [
		{
			Header: 'Name',
			accessor: 'first_name',
		},
		{
			Header: 'Last name',
			accessor: 'last_name',
		},
		{
			Header: 'Email',
			accessor: 'email',
		},
		{
			Header: 'IP address',
			accessor: 'ip_address',
		},
		{
			Header: 'Gender',
			accessor: 'gender',
		},
	]);

	return (
		<div className='container'>
			<div className='app__wrapper'>
				<List columns={columns} data={data} />
			</div>
		</div>
	);
}

export default App;
