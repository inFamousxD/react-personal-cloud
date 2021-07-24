import { Card, CardContent, GridList, GridListTile } from '@material-ui/core';
import { AddCircleOutlineRounded, ArrowDownwardRounded, ArrowRightAlt, ArrowUpwardRounded, DoneAllRounded, StarRounded } from '@material-ui/icons';
import React from 'react';
import {
    Col, Container, Row
} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import notesDataSet from './notesData';

import { useMediaQuery } from 'react-responsive';

import './Notes.css';

const Notes = () => {
    const [folders, setFolders] = React.useState([]);
    const [openFolder, setOpenFolder] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [notesData, setNotesData] = React.useState([]);

    const isPhone = useMediaQuery({ query: '(max-width: 1224px)' });

    React.useEffect(() => {
        setNotesData(notesDataSet);

        if (notesData !== undefined && notesData !== []) {
            console.log(notesData)

            let temp = [];
            notesData.forEach(folder => {
                temp.push(folder.folderName);
            })
            setFolders(temp);

            setLoading(false)

            !isPhone && setFolderCollapseState(false)
        }
    }, [notesData, loading, isPhone])

    const containerStyle = {
        dark: {
            width: '100%',
            color: '#eee',
            backgroundColor: '#222',
            padding: '3vh 2vw',
        },
        mobileDark: {
            width: '100%',
            color: '#eee',
            backgroundColor: '#222',
            padding: '0',
            margin: '0',
            fontSize: '1.7vh'
        }
    }

    const progressStyle = [
        {
            color: 'red',
            // float: 'right'
        },
        {
            color: 'orange',
            // float: 'right'
        },
        {
            color: 'green',
            // float: 'right'
        }
    ]

    const gridListStyle = {
        width: '100%',
        // height: '100%',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        fontFamily: 'Quicksand',
        margin: '1vh 0vw',
        fontWeight: '600'
    }

    const handleFolderChange = (index) => {
        setOpenFolder(index);
        // console.log(index)
    }

    const folderStyle = {
        color: 'white',
        userSelect: 'none',
        cursor: 'pointer',
        fontSize: '1em',
        padding: '1vh 0vw',
        transition: 'color 0.25s'
    }

    const parentRowStyle = {
        mobile: {
            width: '100%',
            margin: 'auto'
        },
        desktop: {
            width: '80%',
            margin: 'auto'
        }
    }

    const [folderCollapseState, setFolderCollapseState] = React.useState(true);
    const collapseFolders = () => {
        setFolderCollapseState(!folderCollapseState);
    }

    const handleOpenNote = (note) => {
        console.log(note);
    }

    const gridListCardStyle = { backgroundColor: '#292929', height: '45vh', cursor: 'pointer' }

    return (
        !loading && <Row style={isPhone ? parentRowStyle.mobile : parentRowStyle.desktop}>
            <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                <Container fluid style={{...containerStyle.dark, width: '100%'}}>
                    <Row>
                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                            <h4 style={folderCollapseState ? {marginBottom: '1vh'} : {marginBottom: '4vh'}}> Folders </h4>
                        </Col>
                        <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{
                            marginTop: '0.25em',
                            userSelect: 'none',
                            cursor: 'pointer'
                        }}>
                            {!folderCollapseState && <AddCircleOutlineRounded />}
                            {isPhone && !folderCollapseState && <ArrowUpwardRounded onClick={() => {collapseFolders()}} />}
                            {isPhone && folderCollapseState && <ArrowDownwardRounded onClick={() => {collapseFolders()}} />}
                        </Col>
                    </Row>
                    {
                        folders.map((folder, index) => {
                            return (
                                <Row onClick={() => {handleFolderChange(index)}} style={folderCollapseState ? {display: 'none'} : {}}>
                                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <div key={index} style={
                                        index === openFolder ? {
                                            ...folderStyle, color: '#CA4246'
                                        } : folderStyle
                                    }>{folder}</div>
                                    </Col>
                                    <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <ArrowRightAlt style={
                                            index === openFolder ? {
                                                color: '#CA4246',
                                                marginTop: '0.4em',
                                                userSelect: 'none',
                                                cursor: 'pointer'
                                            } : {
                                                color: 'white',
                                                marginTop: '0.4em',
                                                userSelect: 'none',
                                                cursor: 'pointer'     
                                            }
                                        }/>
                                    </Col>
                                </Row>

                            )
                        })
                    }
                </Container>
            </Col>
            {/* notes screen for PC */}
            { !isPhone && <Col xs={12} sm={12} md={9} lg={9} xl={9} className='notes-mdplus'>
                <div style={{
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    fontFamily: 'Quicksand'
                }}>
                    <Container fluid style={containerStyle.dark}>
                        <h4>Saved Notes in <span style={{color: '#CA4246'}}>{folders[openFolder]}</span></h4>
                        <Scrollbars autoHide autoHideTimeout={1000} style={{height: '82vh'}}renderThumbVertical={({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: '#CA4246', width: '4px', opacity: '0.5'}}/>
                        }>
                        <GridList cellHeight={400} spacing={4} style={gridListStyle}>
                            {
                                notesData[openFolder].notes.map((note, index) => (
                                    <GridListTile key={index} cols={0.5} rows={1} >
                                        <Card onClick={() => {handleOpenNote(note)}} style={note.important ? {...gridListCardStyle, borderTop: '1px solid gold'} : gridListCardStyle}>
                                            <CardContent>
                                                <Row>
                                                    <Col sm={12} xs={12} md={12} lg={12} xl={12}>
                                                        <span style={{color: '#eee', fontWeight: '500', fontSize: '1.2em'}}>{note.title}</span><br />
                                                    </Col>
                                                    <Col sm={12} xs={12} md={12} lg={12} xl={12}>
                                                        { note.important && <StarRounded style={{color: 'gold'}}/> }
                                                        { <DoneAllRounded style={ progressStyle[note.progress] }/> }
                                                    </Col>
                                                </Row>
                                                <span style={{color: '#aaa', fontWeight: '400', fontSize: '1em'}}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())}</span>
                                                <br /><br /><br />
                                                <div style={{color: '#bbb', fontWeight: '500', fontSize: '1.1em', textAlign: 'justify'}}>{note.note}</div>
                                            </CardContent>
                                        </Card>
                                    </GridListTile>
                                ))
                            }
                        </GridList>
                        </Scrollbars>
                    </Container>
                </div>
            </Col>}

            {/* =================================================================================================== */}
            {/* notes screen for Mobile */}

            { isPhone && <Col xs={12} sm={12} md={9} lg={9} xl={9} className='notes-mdplus'>
                <div style={{
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}>
                    <Container fluid style={containerStyle.mobileDark}>
                        <h4>Saved Notes in <span style={{color: '#CA4246'}}>{folders[openFolder]}</span></h4>
                        <Scrollbars autoHide autoHideTimeout={1000} style={{height: '82vh'}}renderThumbVertical={({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: '#CA4246', width: '4px', opacity: '0.5'}}/>
                        }>
                        <GridList cellHeight={300} spacing={4} style={gridListStyle}>
                            {
                                notesData[openFolder].notes.map((note, index) => (
                                    <GridListTile key={index} cols={2} rows={1} >
                                        <Card style={note.important ? {...gridListCardStyle, borderTop: '1px solid gold'} : gridListCardStyle}>
                                            <CardContent>
                                                <Row>
                                                    <Col sm={10} xs={10} md={11} lg={11} xl={11}>
                                                        <span style={{color: '#eee', fontWeight: '500', fontSize: '1.2em'}}>{note.title}</span><br />
                                                    </Col>
                                                    <Col sm={1} xs={1} md={1} lg={1} xl={1}>
                                                        { note.important ? <StarRounded style={{color: 'yellow'}}/> : ``}
                                                        { <DoneAllRounded style={ {...progressStyle[note.progress], float: 'none'} }/> }
                                                    </Col>
                                                </Row>
                                                <span style={{color: '#aaa', fontWeight: '400', fontSize: '1em'}}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())}</span>
                                                <br /><br /><br />
                                                <div style={{color: '#bbb', fontWeight: '500', fontSize: '1.1em', textAlign: 'justify'}}>{note.note}</div>
                                            </CardContent>
                                        </Card>
                                    </GridListTile>
                                ))
                            }
                        </GridList>
                        </Scrollbars>
                    </Container>
                </div>
            </Col>}
        </Row>
    )
}

export default Notes
