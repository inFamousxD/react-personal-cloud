import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreIcon from '@material-ui/icons/MoreVert';
import { CloudCircle } from '@material-ui/icons';

const root = {
	flexGrow: 1,
	position: 'sticky',
	top: 0,
	zIndex: 2
}

const toolbarExpanded = {
	height: 512,
	alignItems: 'flex-start',
	background: 'linear-gradient(135deg,#CA4246 16.666%, #E16541 16.666%, #E16541 33.333%, #F18F43 33.333%, #F18F43 50%, #8B9862 50%, #8B9862 66.666%, #476098 66.666%, #476098 83.333%, #A7489B 83.333%)',
	color: '#fff',
	transition: 'height 1s'
}

const toolbar = {
	height: 64,
	alignItems: 'flex-start',
	background: 'linear-gradient(135deg,#CA4246 16.666%, #E16541 16.666%, #E16541 33.333%, #F18F43 33.333%, #F18F43 50%, #8B9862 50%, #8B9862 66.666%, #476098 66.666%, #476098 83.333%, #A7489B 83.333%)',
	color: '#fff',
	transition: 'height 1s'
}


const title = {
	flexGrow: 1,
	alignSelf: 'flex-end',
	fontFamily: 'Raleway',
	fontWeight: '500',
	fontSize: '1.35em',
	marginBottom: '0.8em',
	userSelect: 'none',
	cursor: 'pointer'
}

const Navigation = ({expandNavbar, expandNavbarHandler, setSelected}) => {
	const expansionHandler = () => {
		expandNavbarHandler(true);
		setSelected(-1);
	}

	return (
		<div style={root}>
			<AppBar position="static">
				<Toolbar style={expandNavbar ? toolbarExpanded : toolbar}>
					<Typography onClick={expansionHandler} style={title} variant="h5" noWrap>
						<CloudCircle /> Personal Cloud
					</Typography>
					<IconButton style={{marginTop: '0.3em'}} aria-label="display more actions" edge="end" color="inherit">
						<MoreIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navigation


