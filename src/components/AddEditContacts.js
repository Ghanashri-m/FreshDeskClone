import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {Grid, Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {validateEmail, validatePhone, validateRequiredFields} from './utils'; 

// CSS styles
const useStyles = makeStyles(theme => ({
    formContainer : {
        flexDirection: 'column !important',
        marginTop: '2rem',
        background: 'white',
        width: '94%',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '10px',
        padding: '2rem',
        marginBottom: '2rem',
        [theme.breakpoints.down("md")]: {
            padding: 0,
        }
    },
    buttonStyle: {
        width: '8rem',
        backgroundColor: '#dc004e',
        color: 'white',
        fontWeight: 'bold',
        display: 'flex',
        marginLeft: '2rem',
        '&:hover': {
            backgroundColor: '#e57373',
        }
    },
}))

const AddEditContacts = (props) => {
    const classes = useStyles();
    const [contact, setContact] = useState(props.name || '');
    const [title, setTitle] = useState(props.title || '');
    const [email, setEmail] = useState(props.email || '');
    const [workPhone, setWorkPhone] = useState(props.workPhone || '');
    const [mobilePhone, setMobilePhone] = useState(props.mobilePhone || '');
    const [twitterId, setTwitterId] = useState(props.twitterId || '');
    const [company, setCompany] = useState(props.company || '');

    function getData() {
        let str = {};
        if (contact) {
            str = {...str, "name": `${contact}`}
        }
        if (title) {
            str = {...str, "job_title": `${title}`}
        }
        if (email) {
            str = {...str, "email": `${email}`}
        }
        if (workPhone) {
            str = {...str, "phone": `${workPhone}`}
        }
        if (mobilePhone) {
            str = {...str, "mobile": `${mobilePhone}`}
        }
        if (twitterId) {
            str = {...str, "twitter_id": `${twitterId}`}
        }
        if (company) {
            str = {...str, "company_id": company}
        }
        return str;
    }

    async function addContact() {
        let emailValidation = email ? validateEmail(email): true;
        let phoneValidation = workPhone ? validatePhone(workPhone): true;
        let mobileValidation = mobilePhone ? validatePhone(mobilePhone): true;
        let fieldValidation = validateRequiredFields(contact, email, workPhone, mobilePhone, twitterId);

        if (emailValidation && phoneValidation && mobileValidation && fieldValidation) {
            var url;
            var xhr = new XMLHttpRequest();
            if (props.isEdit) {
                url = `https://newaccount1616839488541.freshdesk.com/api/v2/contacts/${props.contactId}`;
                xhr.open("PUT", url);
            } else {
                url = "https://newaccount1616839488541.freshdesk.com/api/v2/contacts";
                xhr.open("POST", url);
            }
    
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", "Basic N25YaU81MDRsUTJRbzdtTFhFVjpY");
    
            xhr.onreadystatechange = await function () {
            if (xhr.readyState === 4) {
                if (JSON.parse(xhr.responseText).errors) {
                    alert (`${JSON.parse(xhr.responseText).errors[0].field}: ${JSON.parse(xhr.responseText).errors[0].message}`);
                } else if(xhr.status === 200 || xhr.status === 201 ) {
                    alert(`${props.isEdit ? 'Updated' : 'Created'} Successfully`);
                }
            }};
    
            // var data = `{ "name":"${contact}", "email":"${email}" }`;
            var data = `${JSON.stringify(getData())}`;
    
            await xhr.send(data);
            props.toggleSlider('right', false);
        } else {
            alert('Enter all required fields and ensure valid Email and Phone numbers are given (Ex: anyString@anystring.anystring, +xxxxxxxxxxxx)')
        }
    }

    return (
        <>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
                alignItems: 'center',
                paddingLeft: '2rem',
                paddingRight: '2rem'
            }} onClick={props.toggleSlider(props.slider, false)}>
                <h2 style={{color: 'white'}}>{props.isEdit ? 'Edit ' : 'New '}Contact</h2>
                <CloseIcon style={{color: 'white'}} />
            </div>
            <p style={{
                width: '100%',
                alignItems: 'center',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                color: 'white'
            }}>
                When Someone reaches out o you, they become a contact in your account. You can Create companies and associate contacts with them
            </p>
            <Grid container className={classes.formContainer}>
                <TextField
                    id="outlined-full-width"
                    label="Full Name"
                    value={contact}
                    onChange={(e) => {setContact(e.target.value)}}
                    style={{ margin: 12 }}
                        placeholder="Enter the name of this person"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                    }}
                    variant="outlined"
                    required
                />
                <TextField
                    id="outlined-full-width"
                    label="Job Title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    style={{ margin: 12 }}
                        placeholder="Enter a title"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                    }}
                    variant="outlined"
                    required
                />
                <p style={{ margin: 12 }}>
                    Atleast one of these fields is mandatory <span style={{color: 'red'}}>*</span>
                </p>
                <div style={{border: '1px solid black', margin: 8}}>
                    <TextField
                        id="outlined-full-width"
                        label="Email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        style={{ margin: 12, width: '100%',
                        paddingRight: '1rem' }}
                            placeholder="Enter Email"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Work Phone"
                        value={workPhone}
                        onChange={(e) => {setWorkPhone(e.target.value)}}
                        style={{ margin: 12, width: '100%',
                        paddingRight: '1rem' }}
                            placeholder="Enter a Phone Number"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Mobile Phone"
                        value={mobilePhone}
                        onChange={(e) => {setMobilePhone(e.target.value)}}
                        style={{ margin: 12, width: '100%',
                        paddingRight: '1rem' }}
                            placeholder="Enter a Phone Number"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Twitter"
                        value={twitterId}
                        onChange={(e) => {setTwitterId(e.target.value)}}
                        style={{ margin: 12, width: '100%',
                        paddingRight: '1rem' }}
                            placeholder="Enter a Twitter Id"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    padding: '2rem',
                }} >
                    <Button onClick={props.toggleSlider(props.slider, false)} style={{background: 'grey'}} className={classes.buttonStyle}>
                        Cancel
                    </Button>
                    <Button onClick={async () => {
                        await addContact();
                        props.getContacts();
                        props.setState({...props.state, 'right': false});
                    }} className={classes.buttonStyle}>
                        {props.isEdit ? 'Update' : 'Create'}
                    </Button>
                </div>
            </Grid>
        </>
    )
}

export default AddEditContacts;
