import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { IconButton } from '@material-ui/core';
import { DescriptionOutlined, LinkOutlined, OutlinedFlag, BookOutlined } from '@material-ui/icons';

const dash = {
	width: '100%',
	margin: 'auto',
	backgroundColor: '#222',
	fontFamily: 'Raleway',
}

const dashButtons = {
	color: 'white',
	margin: '0vh 1vw',
}

const dashButtonSelected = {
	color: '#CA4246',
	margin: '0vh 1vw',
}

const Dash = ({ expandNavbarHandler, selected, setSelected }) => {
	const handleIndex = (index) => {
		setSelected(index);
	}

	React.useEffect(() => {
		if (selected !== -1) expandNavbarHandler(false);
	}, [selected, expandNavbarHandler])

	return (
		<div>
		<Card style={dash} variant="outlined">
			<CardContent>
				<IconButton onClick={() => {handleIndex(0)}}><DescriptionOutlined style={selected === 0 ? dashButtonSelected : dashButtons}/><span style={{ fontWeight: '450', fontSize: '20px', color: '#eee' }}>{" Notes"}</span></IconButton>
				<IconButton onClick={() => {handleIndex(1)}}><LinkOutlined style={selected === 1 ? dashButtonSelected : dashButtons}/><span style={{ fontWeight: '450', fontSize: '20px', color: '#eee' }}>{" Links"}</span></IconButton>
				<IconButton onClick={() => {handleIndex(2)}}><OutlinedFlag style={selected === 2 ? dashButtonSelected : dashButtons}/><span style={{ fontWeight: '450', fontSize: '20px', color: '#eee' }}>{" Goals"}</span></IconButton>
				<IconButton onClick={() => {handleIndex(3)}}><BookOutlined style={selected === 3 ? dashButtonSelected : dashButtons}/><span style={{ fontWeight: '450', fontSize: '20px', color: '#eee' }}>{" Diary"}</span></IconButton>
			</CardContent>
		</Card>
		</div>
	);
}

export default Dash;