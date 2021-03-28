import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import {
    AppBar,
    Toolbar,
    ListItemIcon,
    ListItem,
    IconButton,
    ListItemText,
    Avatar,
    Divider,
    List,
    Typography,
    Box
} from '@material-ui/core';
import {
    ArrowBack,
    Home,
    ContactMail
} from '@material-ui/icons';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import avatar from '../img_avatar2.png';

// CSS styles
const useStyles = makeStyles(theme=>({
    menuSliderContainer: {
        width: '100%',
        minWidth: '250px',
        background: '#511',
        height: '100%'
    },
    avatar: {
        display: 'block',
        margin: '0.5rem auto',
        width: theme.spacing(13),
        height: theme.spacing(13)
    },
    listItem: {
        color: 'tan'
    }
}));

const menuItems = [
    {
        listIcon: <Home />,
        listText: 'Home',
        listPath: '/'
    },
    {
        listIcon: <ConfirmationNumberIcon />,
        listText: 'Tickets',
        listPath: '/tickets'
    },
    {
        listIcon: <ContactMail />,
        listText: 'Contacts',
        listPath: '/contacts'
    },
]

const Navbar = () => {
    const classes = useStyles();

    const [state, setState] = useState({
        right: false
    })

    const toggleSlider = (slider, open) => () => {
        setState({...state, [slider]: open});
    };

    const sideList = slider => (
        <Box component='div'
            className={classes.menuSliderContainer}
            onClick={toggleSlider(slider, false)}
        >
            <Avatar className={classes.avatar} src={avatar} alt='Ghanashri M' />
            <Divider />
            <List>
                {menuItems.map((listItem, key) => (
                    <ListItem button key={key} component={Link} to={listItem.listPath}>
                        <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
                        <ListItemText className={classes.listItem} primary={listItem.listText} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <>
            <Box component='nav'>
                <AppBar position='fixed' style={{background: '#222'}}>
                    <Toolbar>
                        <IconButton onClick={toggleSlider('right', true)}>
                            <ArrowBack style={{color: 'tomato'}} />
                        </IconButton>
                        <Typography variant='h5' style={{color: 'tan'}}>
                            Freshdesk Clone
                        </Typography>
                        <MobileeRightMenuSlider open={state.right}
                            onClose={toggleSlider('right', false)}
                            anchor='right'>
                            {sideList('right')}
                        </MobileeRightMenuSlider>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar;
