import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { IconButton } from '@material-ui/core';
import { DescriptionOutlined, LinkOutlined, OutlinedFlag, BookOutlined } from '@material-ui/icons';

const dashButtons = {
	color: 'white',
	margin: '0vh 1vw',
}

const Dash = ({ expandNavbarHandler, selected, setSelected }) => {
	const handleIndex = (index) => {
		setSelected(index);
	}

	const [dash, setDash] = React.useState({
		width: '100%',
		margin: 'auto',
		backgroundColor: '#222',
		fontFamily: 'Raleway',
		transition: 'display 1s ease'
	});

	React.useEffect(() => {
		if (selected !== -1) {
			expandNavbarHandler(false);
			setDash({
				...dash, display: 'none'
			})
		} else {
			setDash({
				...dash, display: 'block'
			})
		}
	}, [selected, expandNavbarHandler, dash])

	const buttonTextStyle = { fontWeight: '450', fontSize: '20px', color: '#eee' }

	return (
		<div>
		<Card style={dash} variant="outlined">
			<CardContent>
				<IconButton onClick={() => {handleIndex(0)}}><DescriptionOutlined style={dashButtons}/><span style={buttonTextStyle}>{" Notes"}</span></IconButton>
				<IconButton onClick={() => {handleIndex(1)}}><LinkOutlined style={dashButtons}/><span style={buttonTextStyle}>{" Links"}</span></IconButton>
				<IconButton onClick={() => {handleIndex(2)}}><OutlinedFlag style={dashButtons}/><span style={buttonTextStyle}>{" Goals"}</span></IconButton>
				<IconButton onClick={() => {handleIndex(3)}}><BookOutlined style={dashButtons}/><span style={buttonTextStyle}>{" Diary"}</span></IconButton>
				{/* <IconButton onClick={() => {handleIndex(4)}}><SettingsApplicationsOutlined style={dashButtons}/><span style={buttonTextStyle}>{" Prefs"}</span></IconButton> */}
			</CardContent>
		</Card>
		</div>
	);
}

export default Dash;