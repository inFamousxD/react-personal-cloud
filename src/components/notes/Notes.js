import { Card, CardContent, GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import {
    Col,
    Container, Row
} from 'react-bootstrap';

const notesData = [
    {
        title: 'Example note title #1',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #2',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #2',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: true
    },
    {
        title: 'Example note title #1',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #2',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #1',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #2',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #1',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #2',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #1',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #2',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: false
    },
    {
        title: 'Example note title #2',
        date: Date.now(),
        note: 'The note data lorem ipsum bullshit idk.',
        important: true
    },
]

const Notes = () => {
    const containerStyle = {
        dark: {
            width: '100%',
            color: '#eee',
            backgroundColor: '#333',
            padding: '3vh 2vw',
            marginBottom: '15vh'
        }
    }

    const gridListStyle= {
        width: '100%',
        // height: '100%',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        fontFamily: 'Raleway',
        marginTop: '4vh'
    }

    const gridListTileStyle = {
    }

    return (
        <Row style={{width: '80%', margin: 'auto'}}>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <Container fluid style={{...containerStyle.dark, width: '100%'}}>
                    <h4>Folders</h4>
                </Container>
            </Col>
            <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}>
                    <Container fluid style={containerStyle.dark}>
                        <h4>Saved Notes</h4>
                        <GridList cellHeight={400} spacing={4} style={gridListStyle}>
                            {
                                notesData.map((note) => (
                                    <GridListTile key={note.title} cols={note.important ? 2 : 1} rows={1} style={gridListTileStyle}>
                                        <Card style={{ backgroundColor: '#292929', height: '45vh' }}>
                                            <CardContent>
                                                <span style={{color: '#eee', fontWeight: '500', fontSize: '1.2em'}}>{note.title}</span><br />
                                                <span style={{color: '#aaa', fontWeight: '400', fontSize: '1em'}}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(note.date)}</span>
                                                <br /><br /><br />
                                                <div style={{color: '#bbb', fontWeight: '500', fontSize: '1.1em', textAlign: 'justify'}}>{note.note}</div>
                                            </CardContent>
                                        </Card>
                                    </GridListTile>
                                ))
                            }
                        </GridList>
                    </Container>
                </div>
            </Col>
        </Row>
        
    )
}

export default Notes
