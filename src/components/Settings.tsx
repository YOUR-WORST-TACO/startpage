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
        marginTop: '20%'
    },
    swatch: {
        width: '100%',
        height: '100%',
        padding: '7px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    color: {
        width: '100%',
        height: '100%',
        borderRadius: '2px',
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
    }
});

const ColorPicker = (props) => {
    const classes = useStyles();

    const [showPicker, setShowPicker] = useState(false);
    const [color, setColor] = useState(props.color);

    const colorChangeHandler = (color) => {
        setColor(color.hex);
        props.onChange(color);
    }

    return (
        <>
            <div className={classes.swatch} onClick={() => setShowPicker(!showPicker)}>
                <div
                    style={{
                        backgroundColor: color
                    }}
                    className={classes.color}
                />
            </div>
            {showPicker ? <div className={classes.popover}>
                <div className={classes.cover} onClick={() => setShowPicker(!showPicker)}/>
                <ChromePicker color={color} onChange={colorChangeHandler}/>
            </div> : null}
        </>
    )
};

export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState(props.settings);
    const [showBGColor, setShowBGColor] = useState(false);

    const settingsClick = () => {
        setOpen(!open);
    }

    const drawerClickAwayHandler = () => {
        if (open) {
            setOpen(false);
        }
    }

    const bgColorHandler = (color) => {
        setSettings({
            ...settings,
            backgroundColor: color.hex
        })
        localStorage.setItem('backgroundColor', color.hex);
        props.onChange(settings);
    }

    const promptColorHandler = (color) => {
        setSettings({
            ...settings,
            promptColor: color.hex
        })
        localStorage.setItem('promptColor', color.hex);
        props.onChange(settings);
    }

    const contentColorHandler = (color) => {
        setSettings({
            ...settings,
            contentColor: color.hex
        })
        localStorage.setItem('contentColor', color.hex);
        props.onChange(settings);
    }

    const errorColorHandler = (color) => {
        setSettings({
            ...settings,
            errorColor: color.hex
        })
        localStorage.setItem('errorColor', color.hex);
        props.onChange(settings);
    }

    useEffect(() => {

    }, [settings]);

    return (
        <div className={classes.root}>
            <Box className={classes.header}>
                <Button variant="contained" color="primary" onClick={props.onClose}>Close</Button>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={bgColorHandler}
                        color={settings.backgroundColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Background Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={promptColorHandler}
                        color={settings.promptColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Prompt Text Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={contentColorHandler}
                        color={settings.contentColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Content Text Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={errorColorHandler}
                        color={settings.errorColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Error Text Color</Typography>
                </Grid>
            </Grid>

        </div>
    );
};
