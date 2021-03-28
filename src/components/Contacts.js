import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import {
    Button,
    Grid,
    Avatar,
    Hidden,
    Card,
    CardContent,
    CardActionArea,
    Typography,
    Box
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import Navbar from './navbar';
import AddEditContacts from './AddEditContacts';

const colors = ['#C24E0C', '#C4A163', '#8AAF30', '#1C9576', '#4073A0', '#9863AC', '#2E74CE', '#7C79AF', '#238091', '#AFA730', '#B7685C', '#22313F',
                    '#ffbf00', '#ff6666', '#aec2ff', '#1fb8c2', '#ff4573', '#ccccff', '##ccb2cc', '#ff99cc', '#08a18a', '#ff4c99',];

// CSS styles
const useStyles = makeStyles(theme=>({
    menuSliderContainer: {
        width: '100%',
        height: '100%',
        minWidth: '50vw',
        background: '#233',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    menuSliderContainerMobile: {
        width: '100vw',
        minWidth: '100vw',
        background: '#233',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    avatar: {
        display: 'block',
        margin: '0.5rem auto',
        width: theme.spacing(13),
        height: theme.spacing(13)
    },
    listItem: {
        color: 'tan'
    },
    mainContainer: {
        background: '#233',
        height: '100%'
    },
    container : {
        flexDirection: 'column !important',
        marginTop: '4rem',
        // height: '100vh'
    },
    buttonStyle: {
        width: '8rem',
        backgroundColor: '#dc004e',
        color: 'white',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'right',
        '&:hover': {
            backgroundColor: '#e57373',
        }
    },
    cardContainer: {
        width: '95vw',
        margin: '1rem auto'
    },
    actionArea: {
        // height: '100vh',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    table: {
        minWidth: 650,
    },
    avatarColor: {
        background: colors[Math.floor(Math.random() * colors.length)]
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));


const Contacts = () => {
    const classes = useStyles();
    const [contacts, setContacts] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [contact, setContact] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [workPhone, setWorkPhone] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [twitterId, setTwitterId] = useState('');
    const [company, setCompany] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [contactId, setContactId] = useState('');
    const rows = [];

    const [state, setState] = useState({
        right: false
    })

    const toggleSlider = (slider, open) => () => {
        setState({...state, [slider]: open});
    };

    useEffect(() => {
        getContacts();
    }, [])

    useEffect(() => {
        getTableData();
    }, [contacts])
    
    function createData(contact, title, company, email, phone, facebook, twitter, id) {
        return { contact, title, company, email, phone, facebook, twitter, id };
    }

    function getTableData() {
        contacts.forEach((item) => {
            rows.push(createData(item.name || '---', item.job_title || '---', item.company_id || '---', item.email || '---', item.phone || '---', item.facebook_id || '---', item.twitter_id || '---', item.id))
        });
        setTableRows(rows);
    }

    function getContacts() {
        var url = "https://newaccount1616839488541.freshdesk.com/api/v2/contacts";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.setRequestHeader("Authorization", "Basic N25YaU81MDRsUTJRbzdtTFhFVjpY");

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            setContacts(JSON.parse(xhr.responseText));
        }};

        xhr.send();
    }

    function viewContact(id) {
        var url = `https://newaccount1616839488541.freshdesk.com/api/v2/contacts/${id}`;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Basic N25YaU81MDRsUTJRbzdtTFhFVjpY");

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText);
            setContact(response.name);
            setTitle(response.job_title);
            setEmail(response.email);
            setWorkPhone(response.phone);
            setMobilePhone(response.mobile);
            setTwitterId(response.twitter_id);
            setCompany(response.company_id);
            setIsEdit(true);
            setContactId(id);
            setState({...state, 'right': true});
        }};

        xhr.send();
    }

    function reset() {
        setContact('');
        setTitle('');
        setEmail('');
        setWorkPhone('');
        setMobilePhone('');
        setTwitterId('');
        setCompany('');
        setIsEdit(false);
        setContactId('');
        setState({...state, 'right': true});
    }

    const sideList = slider => (
        <>
            <Hidden mdDown>
                <Box component='div'
                    className={classes.menuSliderContainer}
                >
                    <AddEditContacts toggleSlider={toggleSlider} slider={slider}
                    getContacts={getContacts}
                    name={contact}
                    state={state}
                    setState={setState}
                    title={title}
                    email={email}
                    contactId={contactId}
                    isEdit={isEdit}
                    workPhone={workPhone}
                    mobilePhone={mobilePhone}
                    company={company}
                    twitterId={twitterId}
                    />
                </Box>
            </Hidden>
            <Hidden mdUp>
                <Box component='div'
                    className={classes.menuSliderContainerMobile}
                >
                    <AddEditContacts toggleSlider={toggleSlider} slider={slider} 
                    state={state}
                    setState={setState}
                    getContacts={getContacts}
                    name={contact}
                    title={title}
                    contactId={contactId}
                    isEdit={isEdit}
                    email={email}
                    workPhone={workPhone}
                    mobilePhone={mobilePhone}
                    company={company}
                    twitterId={twitterId}/>
                </Box>
            </Hidden>
        </>
    );

    return (
        <>
            <Box component='div' className={classes.mainContainer}>
                <Navbar />
                <Grid container className={classes.container}>
                    <Card className={classes.cardContainer}>
                        <CardActionArea disableRipple className={classes.actionArea}>
                            <CardContent style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                    <Typography variant='h5'>
                                        All Contacts
                                    </Typography>
                                    <Button onClick={reset} className={classes.buttonStyle}>
                                        Add Contact
                                    </Button>
                                </div>
                                <div style={{marginTop: '3rem'}}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Contact</TableCell>
                                            <TableCell align="right">Title</TableCell>
                                            <TableCell align="right">Company</TableCell>
                                            <TableCell align="right">Email Address</TableCell>
                                            <TableCell align="right">Work Phone</TableCell>
                                            <TableCell align="right">Facebook</TableCell>
                                            <TableCell align="right">Twitter</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {tableRows?.map((row) => (
                                            <TableRow key={Math.random()}>
                                                <TableCell component="th" scope="row">
                                                    <span style={{display: 'flex', alignItems: 'center'}}>
                                                        <Avatar style={{marginRight: '2rem', background: colors[Math.floor(Math.random() * colors.length)]}} variant="rounded">
                                                            {row.contact.substring(0, 2)}
                                                        </Avatar>
                                                        {row.contact}
                                                    </span>
                                                </TableCell>
                                                <TableCell align="right">{row.title}</TableCell>
                                                <TableCell align="right">{row.company}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.phone}</TableCell>
                                                <TableCell align="right">{row.facebook}</TableCell>
                                                <TableCell align="right">{row.twitter}</TableCell>
                                                <TableCell align="right"><CreateIcon onClick={function() {
                                                    viewContact(row.id);
                                                }}/></TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                </div>
                                <MobileeRightMenuSlider open={state.right}
                                    onClose={toggleSlider('right', false)}
                                    anchor='right'>
                                    {sideList('right')}
                                </MobileeRightMenuSlider>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Box>
        </>
    )
}

export default Contacts;
