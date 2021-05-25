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
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MethodsDialog = ({onClose, onChange, open, methods}) => {
    const classes = useStyles();

    const [dialogState, setDialogState] = useState(0);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [query, setQuery] = useState('');
    const [delimiter, setDelimiter] = useState('');
    const [encode, setEncode] = useState(false);
    const [aliases, setAliases] = useState([]);
    const [currentAlias, setCurrentAlias] = useState('');

    const resetFields = () => {
        setName('');
        setUrl('');
        setQuery('');
        setDelimiter('');
        setEncode(false);
        setAliases([]);
        setCurrentAlias('');
    };

    const handleMethodDelete = (engineName) => {
        onChange(methods.filter(obj => {
            return obj.name !== engineName;
        }));

        setSuccess(`Deleted ${engineName}.`);
    };

    const openEditMethodDialog = (engine) => {
        switch (engine.type) {
            case 'engine':
                setName(engine.name);
                setUrl(engine.url);
                setAliases(engine.aliases);
                setCurrentAlias('');
                setQuery(engine.query);
                setDelimiter(engine.delimiter);
                setEncode(engine.uriEncode);

                setEdit(true);
                setDialogState(1);
                break;
            case 'link':
                setName(engine.name);
                setUrl(engine.url);

                setEdit( true);
                setDialogState(2);
                break;
        }
    };

    const openNewEngineDialog = () => {
        resetFields();
        setDialogState(1);
    };

    const openNewLinkDialog = () => {
        resetFields();
        setDialogState(2);
    };

    const closeChildDialogs = () => {
        setDialogState(0);
    }

    const onEngineSave = (e) => {
        e.preventDefault();

        if (edit) {
            const newMethods = methods.filter(obj => {
                return obj.name !== name;
            });
            newMethods.push({
                name,
                type: 'engine',
                aliases,
                url,
                query,
                delimiter,
                uriEncode: encode
            });
            onChange(newMethods);
            setDialogState(0);
            setSuccess(`Saved changes to ${name}.`);
        } else {
            if (!methods.find(obj => {
                return obj.name === name
            })) {

                onChange([...methods, {
                    name,
                    type: 'engine',
                    aliases,
                    url,
                    query,
                    delimiter,
                    uriEncode: encode
                }]);

                setSuccess(`New search engine ${name} added!`);

                setDialogState(0);
            } else {
                setError('Search engine name must be unique!');
            }
        }
    }

    const onLinkSave = (e) => {
        e.preventDefault();

        if (edit) {
            const newMethods = methods.filter(obj => {
                return obj.name !== name;
            });
            newMethods.push({
                name,
                type: 'link',
                url
            });
            onChange(newMethods);
            setDialogState(0);
            setSuccess(`Saved changes to ${name}.`);
        } else {
            if (!methods.find(obj => {
                return obj.name === name
            })) {

                onChange([...methods, {
                    name,
                    type: 'link',
                    url
                }]);

                setSuccess(`New link ${name} successfully added!`);

                setDialogState(0);
            } else {
                setError('Link name must be unique!');
            }
        }
    }

    const handleAliasDelete = (alias) => {
        setAliases((aliases) => aliases.filter((value) => value !== alias));
    }

    const handleAliasAdd = () => {
        if (currentAlias !== '' && currentAlias !== ' ') {
            if (!aliases.includes(currentAlias)) {
                setAliases(oldArray => [...oldArray, currentAlias]);
                setCurrentAlias('');
            } else {
                setCurrentAlias('');
            }
        } else {
            setCurrentAlias('');
        }
    }

    const handleDialogClose = () => {
        setDialogState(0);
        onClose();
    }

    const buildMethodList = () => {
        return methods.map((value) => {
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
                        <IconButton
                            aria-label="change"
                            onClick={() => openEditMethodDialog(value)}
                        >
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleMethodDelete(value.name)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        })
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
                            onClick={onClose}
                    >
                        Close
                    </Button>
                </Box>
            </DialogContent>
        </>
    );

    const handleAliasEnter = (event) => {
        if (event.keyCode === 32) {
            handleAliasAdd();
        }
    };

    const handleAliasOnChange = (event) => {
        if (event.target.value === ' ') {
            setCurrentAlias('');
        } else {
            setCurrentAlias(event.target.value);
        }
    };

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
                            onChange={handleAliasOnChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="add-alias" onClick={handleAliasAdd}>
                                        <AddIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="alias-input-help">Press space between aliases</FormHelperText>
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
        <>
            <Dialog maxWidth='lg' open={open} onClose={handleDialogClose} aria-labelledby="method-management-dialog">
                <Snackbar open={error !== ''} autoHideDuration={6000} onClose={() => setError('')}>
                    <Alert onClose={() => setError('')} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
                <Snackbar open={success !== ''} autoHideDuration={6000} onClose={() => setSuccess('')}>
                    <Alert onClose={() => setSuccess('')} severity="success">
                        {success}
                    </Alert>
                </Snackbar>
                {dialogState === 0
                    ? primaryDialog()
                    : dialogState === 1
                        ? openEngineDialog()
                        : openLinkDialog()
                }
            </Dialog>
        </>
    );
}

export default MethodsDialog;
