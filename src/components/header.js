import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {
    Typography,
    Avatar,
    Grid,
    Box
} from '@material-ui/core';
import Typed  from 'react-typed';
import avatar from '../img_avatar2.png';

// CSS styles
const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1)
    },
    title: {
        color: 'tomato'
    },
    subtitle: {
        color: 'tan',
        marginBottom: '3rem'
    },
    typedContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        textAlign: 'center',
        zIndex: 1
    }
}))
const Header = () => {
    const classes = useStyles();
    return (
        <Box component='header' className={classes.typedContainer}>
            <Grid container justify="center">
                <Avatar className={classes.avatar} src={avatar} alt="Freshdesk Clone" />
            </Grid>
            <Typography className={classes.title} variant='h4'>
                <Typed strings={['Welcome']} typeSpeed={40} />
            </Typography>
            <br />
            <Typography className={classes.subtitle} variant='h5'>
                <Typed strings={['View Tickets', 'Edit Tickets', 'View Contacts', 'Add Contacts', 'Modify Contacts']}
                backSpeed={60}
                loop
                typeSpeed={40} />
            </Typography>
        </Box>
    )
}

export default Header
