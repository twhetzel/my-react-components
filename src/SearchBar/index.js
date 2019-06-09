import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ReactSVG from 'react-svg'
import APIClient from '../apiClient';


// import Link from 'react-router/lib/Link';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import CreateSubmission from '../CreateSubmission';


const useStyles = makeStyles(theme => ({
    grow: { // use "root" to have search bar displayed on right
        flexGrow: 1,
    },
    logo: {
        margin: 10,
        marginBottom: 18,
        alt: 'GWAS Logo',
        height: '40',
        width: '40',
    },
    navLinkButton: {
        color: 'inherit',
        marginRight: theme.spacing(2),
    },
    downloadButton: {
        color: 'inherit',
        marginRight: theme.spacing(2),
    },
    loginButton: {
        color: 'inherit',
        marginRight: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        // flexGrow: 1, // Remove to have Search bar displayed on Right
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        // marginLeft: 0, // Use for Search bar displayed on Right
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            // marginLeft: theme.spacing(1),  // Use for Search bar displayed on Right
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


function SearchBar() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const apiClient = new APIClient();

    const isMenuOpen = Boolean(anchorEl);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    function downloadTemplate() {
        apiClient.downloadTemplate();
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button href="/" className={classes.navLinkButton}>
                        <ReactSVG src="/images/GWAS_Catalog_banner_logo_34x40.svg" className={classes.logo} />
                        <Typography className={classes.title} variant="h6" noWrap>
                            GWAS Deposition App
                        </Typography>
                    </Button>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button component={Link} to="/create-submissions" className={classes.navLinkButton}>Create Submissions</Button>
                        <Button onClick={downloadTemplate} className={classes.downloadButton} style={{ float: 'right' }}>Download Template</Button>
                        <Button disabled className={classes.loginButton} style={{ float: 'right', background: 'inherit' }}>Login</Button>
                        <IconButton disabled
                            edge="end"
                            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            background="inherit"
                        >
                            {/* <AccountCircle /> */}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

export default SearchBar;
