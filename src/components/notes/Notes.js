import { Card, CardContent, createMuiTheme, GridList, GridListTile, ThemeProvider, Checkbox, FormControlLabel, Select, MenuItem } from '@material-ui/core';
import { AddCircleOutlineRounded, ArrowDownwardRounded, ArrowRightAlt, ArrowUpwardRounded, DoneAllRounded, StarRounded } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import React from 'react';
import './Notes.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#232323',
        color: '#ccc',
        borderRadius: '20px',
        fontWeight: '400', 
        fontSize: '1.2em'
    },
    paper: {
        backgroundColor: '#222'
    },
    title: {
        fontWeight: '500',
        fontSize: '1.3em',
        color: '#eee'
    },
    text: {
        color: '#ddd'
    },
    dropDownstyle: {
      border: "1px solid black",
      borderRadius: "5%",
      backgroundColor: '#333',
      color: '#ddd'
    },
}));

const theme = createMuiTheme({
    overrides: {
        MuiInputLabel: { 
            root: {
                color: "#aaa"
            }
        }
    }
  });

const Notes = ({ projectFirestore }) => {
    const [folders, setFolders] = React.useState([]);
    const [openFolder, setOpenFolder] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [openForm, setOpenForm] = React.useState(false);
    const [notesData, setNotesData] = React.useState([]);
    const [currentNote, setCurrentNote] = React.useState({})
    const [folderCollapseState, setFolderCollapseState] = React.useState(true);

    const isPhone = useMediaQuery({ query: '(max-width: 1224px)' });

    const classes = useStyles();

    const collapseFolders = () => {
        setFolderCollapseState(!folderCollapseState);
    }

    const handleOpenNote = (note) => {
        setCurrentNote(note);
        setOpen(true);
    }
    
    const handleCloseNote = () => {
        setCurrentNote({});
        setOpen(false);
    };

    const handleOpenForm = () => {
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setOpenForm(false);
    };

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
            margin: '1vh 0 0 0',
            fontSize: '1.7vh'
        }
    }

    const progressStyle = [{ color: 'red' },{ color: 'orange' },{ color: 'green' }];

    const gridListStyle = {
        width: '100%',
        transform: 'translateZ(0)',
        fontFamily: 'Quicksand',
        margin: '1vh 0vw',
        fontWeight: '600'
    }

    const handleFolderChange = (index) => { setOpenFolder(index); }

    const folderStyle = {
        color: 'white',
        userSelect: 'none',
        cursor: 'pointer',
        fontSize: '1em',
        padding: '0.7em 0vw',
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

    const gridListCardStyle = { backgroundColor: '#292929', height: '7em', cursor: 'pointer', userSelect: 'none' }

    const [newNote, setNewNote] = React.useState({
        title: '',
        note: '',
        date: undefined,
        important: false,
        progress: 0,
        folder: undefined
    });

    const handleTitleChange = (event) => {
        setNewNote(newNote => ({
            ...newNote,
            title: event.target.value
        }));
    }

    const handleNoteChange = (event) => {
        setNewNote(newNote => ({
            ...newNote,
            note: event.target.value
        }));
    }

    const handleImportantChange = (e) => {
        setNewNote(newNote => ({
            ...newNote,
            important: e
        }));
    }

    const handleProgressChange = (event) => {
        setNewNote(newNote => ({
            ...newNote,
            progress: event.target.value
        }));
    }

    const handleCreateNewNote = () => {
        let temp = newNote;
        temp = {
            ...temp, 
            folder: folders[openFolder],
            date: Date.now()
        }
        let xtemp = notesData;
        xtemp.push(temp);

        projectFirestore.collection('notes').add(temp);
        handleCloseForm();

        setNewNote({
            title: '',
            note: '',
            date: undefined,
            important: false,
            progress: 0,
            folder: undefined
        });
    }

    const handleNoteDelete = (note) => {
        projectFirestore.collection("notes").doc(note.id).delete().then(() => {
            let newNoteData = notesData.filter(xnote => {
                return note.id !== xnote.id
            });
            setNotesData(newNoteData);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        handleCloseNote();
    }

    const [createFolderDialog, setCreateFolderDialog] = React.useState(false);
    const [newFolder, setNewFolder] = React.useState('');

    const handleNewFolder = (event) => {
        setNewFolder(event.target.value);
    }

    const handleCloseNewFolder = () => {
        setCreateFolderDialog(false);
    }

    const handleOpenNewFolder = () => {
        setCreateFolderDialog(true);
    }

    const handleCreateNewFolder = () => {
        let temp = folders;
        temp.push(newFolder);
        
        handleCloseNewFolder();
        projectFirestore.collection('notes').doc('metadata').update({
            folders: temp
        })
        setNewFolder('');
    }

    const handleNoteImportantToggle = (note) => {
        projectFirestore.collection('notes').doc(note.id).update({
            important: !note.important
        }).then(() => {
            let notes = [];
            notesData.forEach(xnote => {
                if (xnote.id === note.id) xnote.important = !note.important;
                notes.push(xnote);
            })
            setNotesData(notes);
        })
    } 

    React.useEffect(() => {
        let fetchAll = [];
        loading && projectFirestore.collection('notes').get().then((snapshot) => {
            snapshot.docs.forEach((note) => {
                if (note.id !== 'metadata') {
                    let temp = note.data();
                    temp['id'] = note.id;
                    fetchAll.push(temp);
                } else {
                    setFolders(note.data().folders);
                }
            });
        }).then(() => {
            setNotesData(fetchAll);
        }).then(() => {
            !isPhone && setFolderCollapseState(false)
            setLoading(false);
            // console.count('fetched');
        })
    }, [isPhone, projectFirestore, loading])

    return (
        !loading && <div><Row style={isPhone ? parentRowStyle.mobile : parentRowStyle.desktop}>
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
                            {!folderCollapseState && <AddCircleOutlineRounded onClick={handleOpenNewFolder} />}
                            {isPhone && !folderCollapseState && <ArrowUpwardRounded onClick={() => {collapseFolders()}} />}
                            {isPhone && folderCollapseState && <ArrowDownwardRounded onClick={() => {collapseFolders()}} />}
                        </Col>
                    </Row>
                    {
                        folders.map((folder, index) => {
                            return (
                                <Row key={index} onClick={() => {handleFolderChange(index)}} style={folderCollapseState ? {display: 'none'} : {}}>
                                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <div style={
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
                        <Row>
                            <Col><h4>Saved Notes in <span style={{color: '#CA4246'}}>{folders[openFolder]}</span></h4></Col>
                            <Col><Button style={{
                                color: 'white', backgroundColor: '#333', float: 'right'
                            }} onClick={handleOpenForm}>Add Note</Button></Col>
                        </Row>
                        <Scrollbars autoHide autoHideTimeout={1000} style={{height: '73vh'}}renderThumbVertical={({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: '#CA4246', width: '4px', opacity: '0.5'}}/>
                        }>
                        <GridList cellHeight={120} spacing={4} style={gridListStyle}>
                            {
                                notesData.map((note, index) => (
                                    note.folder === folders[openFolder] && <GridListTile key={index} cols={2} rows={1} >
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
                                                <span style={{color: '#aaa', fontWeight: '100', fontSize: '1em'}}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(note.date)}</span>
                                                {/* <br /><br /><br />
                                                <div style={{color: '#bbb', fontWeight: '500', fontSize: '1.1em', textAlign: 'justify'}}>{note.note}</div> */}
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
                        <Row>
                            <Col sm={8} xs={8} md={8} lg={8} xl={8}><h4>Saved Notes in <span style={{color: '#CA4246'}}>{folders[openFolder]}</span></h4></Col>
                            <Col sm={4} xs={4} md={4} lg={4} xl={4}><Button style={{
                                color: 'white', backgroundColor: '#333', float: 'right'
                            }} onClick={handleOpenForm}>Add Note</Button></Col>
                        </Row>
                        <Scrollbars autoHide autoHideTimeout={1000} style={{height: '82vh'}}renderThumbVertical={({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: '#CA4246', width: '4px', opacity: '0.5'}}/>
                        }>
                        <GridList cellHeight={110} spacing={4} style={gridListStyle}>
                            {
                                notesData.map((note, index) => (
                                    note.folder === folders[openFolder] && <GridListTile key={index} cols={2} rows={1} >
                                        <Card onClick={() => {handleOpenNote(note)}} style={note.important ? {...gridListCardStyle, borderTop: '1px solid gold', height: '12vh'} : gridListCardStyle}>
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
                                                <span style={{color: '#aaa', fontWeight: '400', fontSize: '1em'}}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(note.date)}</span>
                                                {/* <br /><br /><br />
                                                <div style={{color: '#bbb', fontWeight: '500', fontSize: '1.1em', textAlign: 'justify'}}>{note.note}</div> */}
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
        {/* show note */}
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth={'md'}
            scroll={'paper'}
            onClose={handleCloseNote}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"

            classes={{
                paper: classes.paper
            }}
        >
            <DialogContent className={classes.title} id="alert-dialog-slide-title">{currentNote.title}</DialogContent>
            <DialogContent className={classes.root}><span style={{color: '#aaa', fontWeight: '400', fontSize: '1em'}}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(currentNote.date)}</span></DialogContent>
            <DialogContent className={classes.root}>{currentNote.note}</DialogContent>
            <DialogActions className={classes.root}>
            <Button color="secondary" style={ currentNote.important ? { color: 'gold' } : {  } } onClick={() => { handleNoteImportantToggle(currentNote) }} >
                Important
            </Button>
            <Button onClick={() => {handleNoteDelete(currentNote)}} color="secondary">
                Delete
            </Button>
            <Button onClick={handleCloseNote} color="secondary">
                Close
            </Button>
            </DialogActions>
        </Dialog>
        {/* open new note form */}
        <Dialog
            open={openForm}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth={'md'}
            scroll={'paper'}
            onClose={handleCloseForm}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            disableBackdropClick={true}

            classes={{
                paper: classes.paper
            }}
        >
            <DialogContent className={classes.title} id="alert-dialog-slide-title">{'New Note'}</DialogContent>
            {/* <DialogContent className={classes.root}><TextF</DialogContent> */}
            
            <ThemeProvider theme={theme}>
            <DialogContent className={classes.root}>
                <TextField color='secondary' autoComplete='off' fullWidth autoFocus margin='dense' id='title' type='text' label='Title' value={newNote.title} onChange={handleTitleChange} InputProps={{ style: { color: 'white', fontSize: '0.85em', fontFamily: 'inherit' }, form: {autocomplete: 'off'} }}></TextField>
                <TextField color='secondary' fullWidth multiline={true} margin='dense' id='title' type='text' label='Note' value={newNote.note} onChange={handleNoteChange} InputProps={{ style: { color: 'white', fontSize: '0.85em', fontFamily: 'inherit' } }}></TextField>
                
                <Row>
                    <Col>
                    <Select style={{ marginTop: '1.7vh', color: '#ccc' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newNote.progress}
                        onChange={handleProgressChange}
                        color='secondary'
                        MenuProps={{
                            classes: {
                                paper: classes.dropDownstyle
                            }
                        }}
                        >
                        <MenuItem value={0}>Incomplete</MenuItem>
                        <MenuItem value={1}>Ongoing</MenuItem>
                        <MenuItem value={2}>Complete</MenuItem>
                    </Select>
                    </Col>
                    <Col>
                        <FormControlLabel style={{ marginTop: '1.7vh', userSelect: 'none' }}
                            control={<Checkbox checked={newNote.important} onChange={() => {handleImportantChange(!newNote.important)}} name="importantMark" />}
                            label="Important"
                        /> 
                    </Col>
                </Row>
 
            </DialogContent>
            </ThemeProvider>
            
            <DialogActions className={classes.root}>
            <Button onClick={handleCloseForm} color="secondary">
                Cancel
            </Button>
            <Button onClick={handleCreateNewNote} color="secondary">
                Add
            </Button>
            </DialogActions>
        </Dialog>
        {/* Create a new folder */}
        <Dialog
            open={createFolderDialog}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth={'sm'}
            scroll={'paper'}
            onClose={handleCloseForm}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            disableBackdropClick={true}

            classes={{
                paper: classes.paper
            }}
        >
            <DialogContent className={classes.title} id="alert-dialog-slide-title">{'New Note'}</DialogContent>
            {/* <DialogContent className={classes.root}><TextF</DialogContent> */}
            
            <ThemeProvider theme={theme}>
            <DialogContent className={classes.root}>
                <TextField color='secondary' fullWidth autoFocus margin='dense' id='newfolder' type='text' label='Folder Name' value={newFolder} onChange={handleNewFolder} InputProps={{ style: { color: 'white', fontSize: '0.85em', fontFamily: 'inherit' } }}></TextField>
            </DialogContent>
            </ThemeProvider>
            
            <DialogActions className={classes.root}>
            <Button onClick={handleCloseNewFolder} color="secondary">
                Cancel
            </Button>
            <Button onClick={handleCreateNewFolder} color="secondary">
                Add
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default Notes
