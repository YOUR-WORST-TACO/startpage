import * as React from "react";
import {useState} from "react";

// @material-ui
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from "@material-ui/core/DialogContentText";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import Dialog from "@material-ui/core/Dialog";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import LinkIcon from '@material-ui/icons/Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {createUseStyles} from 'react-jss';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// local modules

const useStyles = createUseStyles({
    primaryDialog: {
        width: '700px'
    },
    engineDialog: {
        width: '400px'
    },
    linkDialog: {},
    closeButton: {
        float: 'right'
    },
    chipBox: {
        marginTop: '10px',
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

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [query, setQuery] = useState('');
    const [delimiter, setDelimiter] = useState('');
    const [encode, setEncode] = useState(false);
    const [aliases, setAliases] = useState([]);
    const [currentAlias, setCurrentAlias] = useState('');

    const buildMethodList = () => {
        return props.methods.map((value) => {
            return (
                <ListItem key={value.name} button divider>
                    <ListItemIcon>
                        {value.type === 'engine'
                            ? <SearchIcon/>
                            : <LinkIcon/>
                        }
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

    const resetFields = () => {
        setName('');
        setUrl('');
        setQuery('');
        setDelimiter('');
        setEncode(false);
        setAliases([]);
        setCurrentAlias('');
    };

    const openNewEngineDialog = () => {
        setName('')
        setDialogState(1);
    };

    const openNewLinkDialog = () => {
        setDialogState(2);
    };

    const closeChildDialogs = () => {
        setDialogState(0);
    }

    const onEngineSave = (e) => {
        e.preventDefault();
        // TODO implement saving by sending
        //      updated object using onChange
        console.log(name);
        console.log(url);
        console.log(aliases);
        console.log(query);
        console.log(delimiter);
        console.log(encode);
        setDialogState(0);
    }

    const onLinkSave = (e) => {
        e.preventDefault();
        setDialogState(0);
    }

    const handleAliasDelete = (alias) => {
        setAliases((aliases) => aliases.filter((value) => value !== alias));
    }

    const handleAliasAdd = () => {
        if (currentAlias !== '') {
            if (!aliases.includes(currentAlias)) {
                setAliases(oldArray => [...oldArray, currentAlias]);
                setCurrentAlias('');
            } else {
                setCurrentAlias('');
            }
        }
    }

    const handleDialogClose = () => {
        setDialogState(0);
        props.onClose();
    }

    const primaryDialog = () => (
        <>
            <DialogTitle id="method-management-dialog">Manage Search Engines & Links</DialogTitle>
            <DialogContent className={classes.primaryDialog}>
                <List>
                    {buildMethodList()}
                </List>
                <Box>
                    <Button color="primary" onClick={openNewEngineDialog}>New Search Engine</Button>
                    <Button color="primary" onClick={openNewLinkDialog}>New Quick Link</Button>
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


    const handleAliasEnter = (event) => {
        if (event.keyCode === 13) {
            handleAliasAdd();
        }
    }

    const openEngineDialog = () => (
        <>
            <form onSubmit={onEngineSave}>
                <DialogTitle id="method-management-dialog">
                    {edit ? "Edit Search Engine" : "New Search Engine"}
                </DialogTitle>
                <DialogContent className={classes.engineDialog}>

                    <TextField
                        id="engine-name"
                        label="Name"
                        fullWidth
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        id="engine-url"
                        label="Url"
                        fullWidth
                        required
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="alias-input">Alias</InputLabel>
                        <Input
                            id="alias-input"
                            type="text"
                            onKeyDown={handleAliasEnter}
                            value={currentAlias}
                            onChange={e => setCurrentAlias(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="add-alias" onClick={handleAliasAdd}>
                                        <AddIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Paper component="ul" className={classes.chipBox}>
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
                    </Paper>
                    <TextField
                        id="engine-query"
                        label="Query"
                        fullWidth
                        required
                        placeholder="q="
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <TextField
                        id="engine-delimiter"
                        label="delimiter"
                        fullWidth
                        required
                        placeholder="+"
                        value={delimiter}
                        onChange={e => setDelimiter(e.target.value)}
                    />
                    <FormControl fullWidth>
                        <FormGroup>
                            <FormControlLabel label="Use URIEncoding" control={
                                <Checkbox
                                    name="engine-uri"
                                    value={encode}
                                    onChange={e => setEncode(e.target.checked)}
                                />
                            }/>
                        </FormGroup>
                    </FormControl>
                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={closeChildDialogs}
                        >
                            Close
                        </Button>
                        <Button
                            className={classes.closeButton}
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </>
    );

    const openLinkDialog = () => (
        <>
            <form onSubmit={onLinkSave}>
                <DialogTitle id="method-management-dialog">
                    {edit ? "Edit Link" : "New Link"}
                </DialogTitle>
                <DialogContent className={classes.engineDialog}>

                    <TextField
                        id="link-name"
                        label="Name"
                        fullWidth
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        id="link-url"
                        label="Url"
                        fullWidth
                        required
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />

                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={closeChildDialogs}
                        >
                            Close
                        </Button>
                        <Button
                            className={classes.closeButton}
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </>
    );

    return (

        <Dialog maxWidth='lg' open={props.open} onClose={handleDialogClose} aria-labelledby="method-management-dialog">
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
