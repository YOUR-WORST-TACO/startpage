import * as React from 'react';
import {createUseStyles} from "react-jss";
import {useEffect, useState} from "react";

// @material-ui
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';

// local modules
import ColorPicker from "./ColorPicker";
import MethodsDialog from "./MethodsDialog";
import C from './C';
import defaults from '../defaults';

const useStyles = createUseStyles({
    root: {
        width: '500px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '20px',
    },
    header: {
        paddingBottom: '30px'
    },
    resetButton: {
        float: "right"
    },
    exampleBackground: {
        padding: '20px 20px',
        borderRadius: '5px',
        position: 'absolute',
        width: 'calc(100% - 40px)',
        boxSizing: 'border-box',
        boxShadow: 'inset 0px 0px 7px -2px rgba(0,0,0,1)',
        margin: '20px',
        left: 0,
        bottom: 0
    }
});

export default ({ onChange, onClose, settings, methods }) => {
    const classes = useStyles();

    const [openMethods, setOpenMethods] = useState(false);

    const bgColorHandler = (color) => {
        localStorage.setItem('backgroundColor', color.hex);
        onChange({
            type: 'setting',
            changes: {
                backgroundColor: color.hex
            }
        });
    }

    const promptColorHandler = (color) => {
        localStorage.setItem('promptColor', color.hex);
        onChange({
            type: 'setting',
            changes: {
                promptColor: color.hex
            }
        });
    }

    const contentColorHandler = (color) => {
        localStorage.setItem('contentColor', color.hex);
        onChange({
            type: 'setting',
            changes: {
                contentColor: color.hex
            }
        });
    }

    const specialColorHandler = (color) => {
        localStorage.setItem('specialColor', color.hex);
        onChange({
            type: 'setting',
            changes: {
                specialColor: color.hex
            }
        });
    }

    const errorColorHandler = (color) => {
        localStorage.setItem('errorColor', color.hex);
        onChange({
            type: 'setting',
            changes: {
                errorColor: color.hex
            }
        });
    }

    const resetColors = () => {
        localStorage.setItem('backgroundColor', defaults.backgroundColor);
        localStorage.setItem('promptColor', defaults.promptColor);
        localStorage.setItem('contentColor', defaults.contentColor);
        localStorage.setItem('errorColor', defaults.errorColor);
        localStorage.setItem('specialColor', defaults.specialColor);
        onChange({
            type: 'setting',
            changes: {
                ...settings,
                backgroundColor: defaults.backgroundColor,
                promptColor: defaults.promptColor,
                contentColor: defaults.contentColor,
                errorColor: defaults.errorColor,
                specialColor: defaults.specialColor
            }
        });
    }

    const handleMethodsClose = (val) => {
        setOpenMethods(false);
    }
    const handleMethodsChange = (newMethods) => {
        onChange({
            type: 'method',
            changes: newMethods
        });
    }

    return (
        <div className={classes.root}>
            <Box className={classes.header}>
                <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
                <Button className={classes.resetButton} variant="contained" color="secondary" onClick={resetColors}>Reset
                    Colors</Button>
            </Box>
            <MethodsDialog
                open={openMethods}
                methods={methods}
                onClose={handleMethodsClose}
                onChange={handleMethodsChange}
            />
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={bgColorHandler}
                        color={settings.backgroundColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography align="right" variant="h5">Background Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={promptColorHandler}
                        color={settings.promptColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography align="right" variant="h5">Prompt Text Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={contentColorHandler}
                        color={settings.contentColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography align="right" variant="h5">Content Text Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={specialColorHandler}
                        color={settings.specialColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography align="right" variant="h5">Special Text Color</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ColorPicker
                        onChange={errorColorHandler}
                        color={settings.errorColor}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography align="right" variant="h5">Error Text Color</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => setOpenMethods(true)}>Search Engines/Links</Button>
                </Grid>
            </Grid>
            <div
                style={{
                    backgroundColor: settings.backgroundColor,
                }}
                className={classes.exampleBackground}
            >
                <Typography variant="h5">
                    <C color={settings.promptColor}>
                        {"> "}
                    </C>
                    <C color={settings.contentColor}>
                        ls
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={settings.contentColor}>
                        someFile
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={settings.contentColor}>
                        .bashrc
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={settings.contentColor}>
                        settings.json
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={settings.specialColor}>
                        someFolder
                    </C>
                    <C color={settings.contentColor}>
                        {'/'}
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={settings.specialColor}>
                        node_modules
                    </C>
                    <C color={settings.contentColor}>
                        {'/'}
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={settings.promptColor}>
                        {"> "}
                    </C>
                    <C color={settings.contentColor}>
                        asdf
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={settings.errorColor}>
                        Command not found: asdf
                    </C>
                </Typography>
                <Typography variant="h5">
                    <C color={settings.promptColor}>
                        {"> "}
                    </C>
                </Typography>
            </div>
        </div>
    );
};
