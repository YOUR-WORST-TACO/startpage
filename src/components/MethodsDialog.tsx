import * as React from "react";
import {useState} from "react";

// @material-ui
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Dialog from "@material-ui/core/Dialog";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import {createUseStyles} from "react-jss";
import {Add} from "@material-ui/icons";

// local modules

const useStyles = createUseStyles({
    primaryDialog: {
        width: '700px'
    },
    engineDialog: {},
    linkDialog: {},
    closeButton: {
        float: 'right'
    },
    chipBox: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: '10px',
    },
    chip: {
        margin: '5px'
    }
})

const MethodsDialog = (props) => {
    const classes = useStyles();

    const [dialogState, setDialogState] = useState(0);
    const [edit, setEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: null,
        type: null,
        url: null,
        query: null,
        delimiter: null,
        uriEncode: null
    });
    const [aliases, setAliases] = useState(['a', 'b', 'c', 'd']);

    const buildMethodList = () => {
        return props.methods.map((value) => {
            return (
                <ListItem key={value.name} button>
                    <ListItemIcon>
                        <SearchIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={value.name}
                        secondary={value.url}
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="change">
                            <EditIcon/>
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        })
    }

    const onEngineSave = () => {
        setDialogState(0);
    }

    const onLinkSave = () => {
        setDialogState(0);
    }

    const handleAliasDelete = (alias) => {
        setAliases((aliases) => aliases.filter((value) => value !== alias));
    }

    const primaryDialog = () => (
        <>
            <DialogTitle id="method-management-dialog">Manage Search Engines & Links</DialogTitle>
            <DialogContent className={classes.primaryDialog}>
                <List>
                    {buildMethodList()}
                </List>
                <Box>
                    <Button color="primary" onClick={() => setDialogState(1)}>New Search Engine</Button>
                    <Button color="primary" onClick={() => setDialogState(2)}>New Quick Link</Button>
                    <Button className={classes.closeButton}
                            variant="contained"
                            color="secondary"
                            onClick={props.onClose}
                    >
                        Close
                    </Button>
                </Box>
            </DialogContent>
        </>
    );

    const openEngineDialog = () => (
        <>
            <DialogTitle id="method-management-dialog">
                {edit ? "Edit Search Engine" : "New Search Engine"}
            </DialogTitle>
            <DialogContent>
                <form>
                    <TextField id="engine-name" label="Name" fullWidth required/>
                    <TextField id="engine-url" label="Url" fullWidth required/>
                    {/* TODO implement Input with InputAdornment */}
                    <TextField id="new-alias" label="Alias" fullWidth/>
                    <IconButton aria-label="add-alias">
                        <AddIcon />
                    </IconButton>
                    <Box component="ul" className={classes.chipBox}>
                        {aliases.map((value) => {
                            return (
                                <li key={value}>
                                    <Chip
                                        className={classes.chip}
                                        label={value}
                                        onDelete={() => handleAliasDelete(value)}
                                    />
                                </li>
                            );
                        })}
                    </Box>
                </form>
                <Box>
                    <Button
                        className={classes.closeButton}
                        variant="contained"
                        color="secondary"
                        onClick={onEngineSave}
                    >
                        Save
                    </Button>
                </Box>
            </DialogContent>
        </>
    );

    const openLinkDialog = () => (
        <>
            <DialogTitle id="method-management-dialog">
                {edit ? "Edit Link" : "New Link"}
            </DialogTitle>
            <DialogContent>
                <form>
                    <TextField id="link-name" label="Name" required/>
                </form>
                <Box>
                    <Button
                        className={classes.closeButton}
                        variant="contained"
                        color="secondary"
                        onClick={onLinkSave}
                    >
                        Save
                    </Button>
                </Box>
            </DialogContent>
        </>
    );

    return (

        <Dialog maxWidth='lg' open={props.open} onClose={props.onClose} aria-labelledby="method-management-dialog">
            {dialogState === 0
                ? primaryDialog()
                : dialogState === 1
                    ? openEngineDialog()
                    : openLinkDialog()
            }
        </Dialog>
    );
}

export default MethodsDialog;
