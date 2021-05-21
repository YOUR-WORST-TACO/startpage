import * as React from 'react';
import Terminal from 'react-console-emulator'
import {useEffect, useState} from "react";
import Settings from "./Settings";

import {createUseStyles} from "react-jss";
import SettingsIcon from "@material-ui/icons/Settings";

const backgroundColor = '#0b091f';

const useStyles = createUseStyles({
    '@global': {
        '*': {
            padding: 0,
            margin: 0,
        },
        body: {
            height: '100vh',
            backgroundColor: backgroundColor
        },
        '#root': {
            height: '100%'
        }
    },
    root: {
        height: '100%',
        width: '800px',
        margin: '0 auto',
    },
    shade: {
        height: '100%',
        width: '100%',
        background: `linear-gradient(0deg, rgba(0,0,0,0) 80%, ${backgroundColor} 100%)`,
        position: 'relative',
        zIndex: '100',
        pointerEvents: 'none'
    },
    icon: {
        color: '#aaa',
        '&:hover': {
            color: '#fff'
        },
        '&:active': {
            color: '#aaa'
        }
    },
    button: {
        userSelect: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: '100px',
        right: '100px'
    },
    fullHeight: {
        height: '100%',
        width: '100%'
    }
});

const terminalStyles = {
    terminal: {
        backgroundColor: 'none',
        borderRadius: 0,
        overflow: 'hidden',
        maxHeight: '50%',
        minHeight: '0px',
        width: '700px',
        position: 'absolute',
        bottom: '50%',
        fontSize: '20px'
    },
    content: {
        color: '#fff',
        fontSize: '20px',
        lineHeight: '35px'
    },
    prompt: {
        color: '#dcd05d',
        fontSize: '20px',
        lineHeight: '35px'
    },
    input: {
        color: '#fff',
        fontSize: '20px',
        lineHeight: '40px',
        height: '40px'
    },
    message: {
        color: '#de8080',
        fontSize: '20px',
        lineHeight: '35px'
    }
}

const defaultSearchEngines = {
    'google': {
        url: 'https://google.com'
    },
    'duckduckgo': {
        url: 'https://duckduckgo.com'
    },
    'reddit': {
        url: 'https://reddit.com'
    },
    'youtube': {
        url: 'https://www.youtube.com'
    }
}

const commands = {
    echo: {
        description: 'Echo a passed string.',
        usage: 'echo <string>',
        fn: (...args) => args.join(' ')
    },
    ls: {
        description: 'List available search engines.',
        usage: 'ls',
        fn: () => {
            let returnString = "";
            for (const key of Object.keys(defaultSearchEngines)) {
                returnString += `${key}\n`;
            }
            return returnString;
        }
    },
    test: {
        description: 'test command',
        usage: 'test',
        fn: () => {
            return <span style={{color: '#f0f'}}>Text</span>
        }
    }
}

export default () => {
    const classes = useStyles();

    const [settings, setSettings] = useState(false);

    const settingsClick = () => {
        setSettings(!settings);
    }

    const renderTerminal = () => {
        return (
            <div className={classes.fullHeight}>
                <div className={classes.button} onClick={settingsClick}>
                    <SettingsIcon className={classes.icon}/>
                </div>
                <Terminal
                    style={terminalStyles.terminal}
                    contentStyle={terminalStyles.content}
                    promptLabelStyle={terminalStyles.prompt}
                    inputTextStyle={terminalStyles.input}
                    messageStyle={terminalStyles.message}
                    styleEchoBack={'fullInherit'}
                    welcomeMessage={'welcome\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'}
                    commands={commands}
                    autoFocus={true}
                    promptLabel={'>'}
                />
                <div className={classes.shade}/>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            {settings
                ? <h1>Settings</h1>
                : renderTerminal()
            }
        </div>
    )
}
