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
            height: '100vh'
        },
        '#root': {
            height: '100%'
        }
    },
    root: {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    wrapper: {
        height: '100%',
        width: '800px',
        margin: '0 auto',
    },
    shade: {
        height: '100%',
        width: '100%',
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
};

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
};

const getOrSet = (key, value) => {
    let prop = localStorage.getItem(key);
    if (!prop) {
        localStorage.setItem(key, value);
        prop = value;
    }
    return prop;
};

export default () => {
    const classes = useStyles();

    const [settingsVisible, setSettingsVisible] = useState(false);
    const [settings, setSettings] = useState({
        backgroundColor: getOrSet('backgroundColor', backgroundColor),
        promptColor: getOrSet('promptColor', '#dcd05d'),
        contentColor: getOrSet('contentColor', '#ffffff'),
        errorColor: getOrSet('errorColor', '#de8080')
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
            color: settings.contentColor,
            fontSize: '20px',
            lineHeight: '35px'
        },
        prompt: {
            color: settings.promptColor,
            fontSize: '20px',
            lineHeight: '35px'
        },
        input: {
            color: settings.contentColor,
            fontSize: '20px',
            lineHeight: '40px',
            height: '40px'
        },
        message: {
            color: settings.errorColor,
            fontSize: '20px',
            lineHeight: '35px'
        }
    }

    const settingsClick = () => {
        setSettingsVisible(true);
    }

    const onSettingsChange = (newSettings) => {
        setSettings(newSettings);
        console.log(settings);
    }

    const onSettingsClose = () => {
        /*const keys = Object.keys(settings);
        for (const key of keys) {
            localStorage.setItem(key, settings[key]);
        }*/
        setSettingsVisible(false);
    }

    const setSettingValues = (event) => {

    };

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
                    welcomeMessage={'welcome'}
                    commands={commands}
                    autoFocus={true}
                    promptLabel={'>'}
                />
                <div
                    style={{
                        background: `linear-gradient(0deg, rgba(0,0,0,0) 80%, ${settings.backgroundColor} 100%)`,
                    }}
                    className={classes.shade}
                />
            </div>
        )
    }

    return (
        <div
            className={classes.root}
            style={{
                backgroundColor: settings.backgroundColor
            }}
        >
            <div className={classes.wrapper}>
                {settingsVisible
                    ? <Settings
                        settings={settings}
                        onClose={onSettingsClose}
                        onChange={onSettingsChange}
                    />
                    : renderTerminal()
                }
            </div>
        </div>
    )
}
