import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Typography,
    Box,
    Grid,
    Hidden,
    Card,
    CardActions,
    MenuItem,
    CardActionArea,
    CardContent,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import {timeFromNow} from './utils';
import Navbar from './navbar';

// CSS styles
const useStyles = makeStyles(theme=>({
    mainContainer: {
        background: '#233',
        height: '100%'
    },
    cardContainer: {
        width: '95vw',
        margin: '1rem auto'
    },
    container : {
        flexDirection: 'column !important',
        marginTop: '4rem',
        paddingTop: '2rem'
    },
    menuItem: {
        background: 'transparent',
        '&:hover': {
            background: '#e5f2fd !important'
         },
         '&:active': {
            color: '#2c5cc5 !important',
            background: '#e5f2fd !important'
         }
     },
     bullet: {
        paddingRight: '1rem',
        fontSize: '24px'
     },
     ticketsHeader: {
        color: 'white',
        marginLeft: '3rem',
        [theme.breakpoints.down("md")]: {
            marginLeft: '1rem',
        }
     }
}));

const Tickets = () => {
    const classes = useStyles();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getTickets();
    }, [])

    function getTickets() {
        var url = "https://newaccount1616839488541.freshdesk.com/api/v2/tickets";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Basic N25YaU81MDRsUTJRbzdtTFhFVjpY");

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            setTickets(JSON.parse(xhr.responseText));
        }};

        xhr.send();
    }

    function updatePriority(id, priority) {
        var url = `https://newaccount1616839488541.freshdesk.com/api/v2/tickets/${id}`;

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Basic N25YaU81MDRsUTJRbzdtTFhFVjpY");

        var data = `{ "priority": ${priority}}`;

        xhr.send(data);

    }

    function updateStatus(id, status) {
        var url = `https://newaccount1616839488541.freshdesk.com/api/v2/tickets/${id}`;

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Basic N25YaU81MDRsUTJRbzdtTFhFVjpY");

        var data = `{ "status": ${status}}`;

        xhr.send(data);

    }

    function handleChange(e, id, ticketId) {
        document.getElementById(id).value = e.target.value;
        updatePriority(ticketId, e.target.value);
    }

    function handleStatus(e, id, ticketId) {
        document.getElementById(id).value = e.target.value;
        updateStatus(ticketId, e.target.value);
    }

    const getActions = (ticket, index) => {return (
        <>
            <Select
                MenuProps={{
                    anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                },
                getContentAnchorEl: null
                }}
                disableUnderline={true}
                defaultValue={ticket.priority}
                style={{minWidth: '8rem', marginLeft: '0.5rem'}}
                onChange={(e) => {handleChange(e, `priority${index}`, ticket.id)}}
                displayEmpty
                name="priority"
                id={`priority${index}`}
                >
                    <MenuItem className={classes.menuItem} value={1}><span style={{color: '#a0d76a'}} className={classes.bullet}> ■</span>Low</MenuItem>
                    <MenuItem className={classes.menuItem} value={2}><span style={{color: '#4da1ff'}} className={classes.bullet}> ■</span> Medium</MenuItem>
                    <MenuItem className={classes.menuItem} value={3}><span style={{color: '#ffd012'}} className={classes.bullet}> ■</span>High</MenuItem>
                    <MenuItem className={classes.menuItem} value={4}><span style={{color: '#ff5959'}} className={classes.bullet}> ■</span>Urgent</MenuItem>
            </Select>
                <Select
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }}
                    disableUnderline={true}
                    defaultValue={ticket.status}
                    style={{minWidth: '8rem', marginLeft: '0.5rem'}}
                    onChange={(e) => {handleStatus(e, `status${index}`, ticket.id)}}
                    displayEmpty
                    name="status"
                    id={`status${index}`}
                >
                    <MenuItem className={classes.menuItem} value={2}>Open</MenuItem>
                    <MenuItem className={classes.menuItem} value={3}>Pending</MenuItem>
                    <MenuItem className={classes.menuItem} value={4}>Resolved</MenuItem>
                    <MenuItem className={classes.menuItem} value={5}>Closed</MenuItem>
                    <MenuItem className={classes.menuItem} value={6}>Waiting on Customer</MenuItem>
                    <MenuItem className={classes.menuItem} value={7}>Waiting on third Party</MenuItem>
                </Select>
        </>)};

    return (
        <Box component='div' className={classes.mainContainer}>
            <Navbar />
            <Grid container className={classes.container} justify="center">
                <Typography gutterBottom variant='h5' className={classes.ticketsHeader}>
                    All Tickets
                </Typography>
                {
                    tickets?.map((ticket, index) => {
                        return (
                            <Grid item xs={12} sm={12} md={12} key={index}>
                                <Card className={classes.cardContainer}>
                                <Hidden mdDown>
                                    <CardActionArea disableRipple style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <CardContent>
                                            <Typography gutterBottom variant='h6' id={ticket.id}>
                                                {ticket.subject}<span style={{color: 'tomato'}}> #{ticket.id}</span>
                                            </Typography>
                                            <Typography variant='body2' style={{color: '#6f7c87'}} component='p'>
                                                Created {timeFromNow(ticket.created_at)} . First Response due {timeFromNow(ticket.fr_due_by)}
                                            </Typography>
                                        </CardContent>
                                        <div style={{marginRight: '2rem'}}>
                                            {getActions(ticket, index)}
                                        </div>
                                    </CardActionArea>
                                </Hidden>
                                <Hidden mdUp>
                                    <CardActionArea disableRipple>
                                        <CardContent>
                                            <Typography gutterBottom variant='h6' id={ticket.id}>
                                                {ticket.subject}<span style={{color: 'tomato'}}> #{ticket.id}</span>
                                            </Typography>
                                            <Typography variant='body2' style={{color: '#6f7c87'}} component='p'>
                                                Created {timeFromNow(ticket.created_at)} . First Response due {timeFromNow(ticket.fr_due_by)}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                                {getActions(ticket, index)}
                                        </CardActions>
                                    </CardActionArea>
                                </Hidden>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    )
}

export default Tickets;
