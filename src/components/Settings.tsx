import * as React from 'react';

import Drawer from "@material-ui/core/Drawer";
import SettingsIcon from '@material-ui/icons/Settings';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import {createUseStyles} from "react-jss";
import {useState} from "react";

const useStyles = createUseStyles({

})

export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const settingsClick = () => {
        setOpen(!open);
    }

    const drawerClickAwayHandler = () => {
        if (open) {
            setOpen(false);
        }
    }

    return (
        <div>

        </div>
    );
};
