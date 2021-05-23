import * as React from 'react';

import Drawer from "@material-ui/core/Drawer";
import SettingsIcon from '@material-ui/icons/Settings';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {createUseStyles} from "react-jss";
import {useEffect, useState} from "react";
import {ChromePicker} from 'react-color'

const useStyles = createUseStyles({
    root: {
        width: '500px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '20px',
    },
    swatch: {
        width: '100%',
        height: '100%',
        padding: '7px',
        background: '#fff',
        borderRadius: '5px',
        boxShadow: 'inset 0px 0px 7px -2px rgba(0,0,0,.5)',
        display: 'inline-block',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    color: {
        width: '100%',
        height: '100%',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
    header: {
        paddingBottom: '30px'
    },
    resetButton: {
        float: "right"
    },
    exampleBackground: {
        padding: '100px 20px',
        borderRadius: '5px',
        position: 'absolute',
        width: 'calc(100% - 40px)',
        boxSizing: 'border-box',
        margin: '20px',
        left: 0,
        bottom: 0
    }
});

const C = (props) => {
    return (
        <span
            style={{
                color: props.color
            }}
        >
            {props.children}
        </span>
    )
}


const ColorPicker = (props) => {
    const classes = useStyles();

    const [showPicker, setShowPicker] = useState(false);

    const colorChangeHandler = (color) => {
        props.onChange(color);
    }

    return (
        <>
            <div className={classes.swatch} onClick={() => setShowPicker(!showPicker)}>
                <div
                    style={{
                        backgroundColor: props.color
                    }}
                    className={classes.color}
                />
            </div>
            {showPicker ? <div className={classes.popover}>
                <div className={classes.cover} onClick={() => setShowPicker(!showPicker)}/>
                <ChromePicker color={props.color} onChange={colorChangeHandler}/>
            </div> : null}
        </>
    )
};

export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState();

    const settingsClick = () => {
        setOpen(!open);
    }

    const drawerClickAwayHandler = () => {
        if (open) {
            setOpen(false);
        }
    }

    const bgColorHandler = (color) => {
        localStorage.setItem('backgroundColor', color.hex);
        props.onChange({
            ...props.settings,
            backgroundColor: color.hex
        });
    }

    const promptColorHandler = (color) => {
        localStorage.setItem('promptColor', color.hex);
        props.onChange({
            ...props.settings,
            promptColor: color.hex
        });
    }

    const contentColorHandler = (color) => {
        localStorage.setItem('contentColor', color.hex);
        props.onChange({
            ...props.settings,
            contentColor: color.hex
        });
    }

    const specialColorHandler = (color) => {
        localStorage.setItem('specialColor', color.hex);
        props.onChange({
            ...props.settings,
            specialColor: color.hex
        });
    }

    const errorColorHandler = (color) => {
        localStorage.setItem('errorColor', color.hex);
        props.onChange({
            ...props.settings,
            errorColor: color.hex
        });
    }

    const resetColors = () => {
        localStorage.setItem('backgroundColor', '#0b091f');
        localStorage.setItem('promptColor', '#dcd05d');
        localStorage.setItem('contentColor', '#ffffff');
        localStorage.setItem('errorColor', '#de8080');
        localStorage.setItem('specialColor', '#8492e2');
        props.onChange({
            ...props.settings,
            backgroundColor: '#0b091f',
            promptColor: '#dcd05d',
            contentColor: '#ffffff',
            errorColor: '#de8080',
            specialColor: '#8492e2'
        });
    }

    useEffect(() => {

    }, [settings]);

    return (
        <div className={classes.root}>
            <Box className={classes.header}>
                <Button variant="contained" color="primary" onClick={props.onClose}>Close</Button>
                <Button className={classes.resetButton} variant="contained" color="secondary" onClick={resetColors}>Reset Colors</Button>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={bgColorHandler}
                        color={props.settings.backgroundColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Background Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={promptColorHandler}
                        color={props.settings.promptColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Prompt Text Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={contentColorHandler}
                        color={props.settings.contentColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Content Text Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={specialColorHandler}
                        color={props.settings.specialColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Special Text Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={errorColorHandler}
                        color={props.settings.errorColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Error Text Color</Typography>
                </Grid>
            </Grid>
            <div
                style={{
                    backgroundColor: props.settings.backgroundColor,
                }}
                className={classes.exampleBackground}
            >
                <Typography variant="h5">
                    <C color={props.settings.promptColor}>
                        {">"}&nbsp;
                    </C>
                    <C color={props.settings.contentColor}>
                        ls
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={props.settings.contentColor}>
                        someFile
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={props.settings.contentColor}>
                        .bashrc
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={props.settings.contentColor}>
                        settings.json
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={props.settings.specialColor}>
                        someFolder
                    </C>
                    <C color={props.settings.contentColor}>
                        {'/'}
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={props.settings.specialColor}>
                        node_modules
                    </C>
                    <C color={props.settings.contentColor}>
                        {'/'}
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={props.settings.promptColor}>
                        {">"}&nbsp;
                    </C>
                    <C color={props.settings.contentColor}>
                        asdf
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={props.settings.errorColor}>
                        Command not found: asdf
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={props.settings.promptColor}>
                        {">"}&nbsp;
                    </C>
                </Typography>
            </div>
        </div>
    );
};
