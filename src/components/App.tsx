import * as React from 'react';
import Terminal from 'react-console-emulator'
import {createRef, useEffect, useState} from "react";
import Settings from "./Settings";

import {createUseStyles} from "react-jss";
import SettingsIcon from "@material-ui/icons/Settings";
import Drawer from "@material-ui/core/Drawer";


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
        },
        'div[name=react-console-emulator]': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
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
        // @ts-ignore
        color: props => props.contentColor,
        opacity: 0.5,
        '&:hover': {
            opacity: 1
        },
        '&:active': {
            opacity: 0.5
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

const C = (props) => {
    return (
        <span
            style={{
                whiteSpace: 'pre-wrap',
                color: props.color
            }}
        >
            {props.children}
        </span>
    )
}

const defaultSearchEngines = [
    {
        name: 'google',
        type: 'engine',
        aliases: ['g'],
        url: 'https://google.com/search',
        query: 'q=',
        delimiter: ' ',
        uriEncode: true
    },
    {
        name: 'duckduckgo',
        type: 'engine',
        aliases: ['duck', 'd'],
        url: 'https://duckduckgo.com/search',
        query: 'q=',
        delimiter: ' ',
        uriEncode: true
    },
    {
        name: 'reddit',
        type: 'engine',
        aliases: ['r'],
        url: 'https://reddit.com/search',
        query: 'q=',
        delimiter: ' ',
        uriEncode: true

    },
    {
        name: 'youtube',
        type: 'engine',
        aliases: ['yt', 'y'],
        url: 'https://www.youtube.com/results',
        query: 'search_query=',
        delimiter: ' ',
        uriEncode: true
    }
];

const getOrSet = (key, value) => {
    let prop = localStorage.getItem(key);
    if (!prop) {
        localStorage.setItem(key, value);
        prop = value;
    }
    return prop;
};

export default () => {
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [childKey, setChildKey] = useState(0);
    const [shouldReloadMethods, setShouldReloadMethods] = useState(false);
    const [settings, setSettings] = useState({
        backgroundColor: getOrSet('backgroundColor', '#0b091f'),
        promptColor: getOrSet('promptColor', '#dcd05d'),
        contentColor: getOrSet('contentColor', '#ffffff'),
        errorColor: getOrSet('errorColor', '#de8080'),
        specialColor: getOrSet('specialColor', '#8492e2')
    });

    // @ts-ignore
    const classes = useStyles(settings);

    const terminalRef = createRef();

    const [methods, setMethods] = useState(
        JSON.parse(
            getOrSet('startpageMethods', JSON.stringify(
                defaultSearchEngines
            ))
        )
    );

    const [commands, setCommands] = useState({})

    const generateMethods = () => {
        const commandList = {
            clear: {
                description: 'Clears terminal stdout.',
                fn: () => {
                    // @ts-ignore
                    terminalRef.current.clearStdout()
                    return;
                }
            },
            help: {
                description: 'Show a list of available commands.',
                fn: () => {
                    let returnArray = [];
                    returnArray.push(<C color={settings.contentColor}>{"    "}</C>);
                    returnArray.push(<C color={settings.specialColor}>
                        {"clear   "}
                        <C color={settings.contentColor}>- {commandList.clear.description}</C>
                    </C>);
                    returnArray.push(<br/>);
                    returnArray.push(<C color={settings.contentColor}>{"    "}</C>);
                    returnArray.push(<C color={settings.specialColor}>
                        {"help    "}
                        <C color={settings.contentColor}>- {commandList.help.description}</C>
                    </C>);
                    returnArray.push(<br/>);
                    returnArray.push(<C color={settings.contentColor}>{"    "}</C>);
                    returnArray.push(<C color={settings.specialColor}>
                        {"engines "}
                        <C color={settings.contentColor}>- {commandList.engines.description}</C>
                    </C>);
                    returnArray.push(<br/>);
                    returnArray.push(<C color={settings.contentColor}>{"    "}</C>);
                    returnArray.push(<C color={settings.specialColor}>
                        {"links   "}
                        <C color={settings.contentColor}>- {commandList.links.description}</C>
                    </C>);
                    return returnArray;
                }
            },
            engines: {
                description: 'Show a list of available search engines.',
                fn: () => {
                    let returnArray = [];
                    returnArray.push(<C color={settings.contentColor}>
                        {"Usage: <"}
                        <C color={settings.specialColor}>search engine</C>
                        {"> ["}
                        <C color={settings.promptColor}>search query</C>
                        {"]"}
                    </C>);
                    returnArray.push(<br/>);
                    let maxLength = 0;
                    for (const method of methods) {
                        if (method.type === 'engine' && method.name.length > maxLength) {
                            maxLength = method.name.length;
                        }
                    }
                    for (const method of methods) {
                        if (method.type === 'engine') {
                            returnArray.push(<C color={settings.contentColor}>{"    "}</C>);
                            returnArray.push(<C color={settings.specialColor}>{method.name}</C>);
                            if (method.aliases.length > 0) {
                                const spacing = new Array((maxLength - method.name.length) + 4).join(' ');
                                returnArray.push(<C color={settings.contentColor}>
                                    {`${spacing}alias: `}
                                </C>);
                                for (let i = 0; i < method.aliases.length; i++) {
                                    const alias = method.aliases[i];
                                    returnArray.push(<C color={settings.specialColor}>{alias}</C>);
                                    if (i < method.aliases.length - 1) {
                                        returnArray.push(<C color={settings.contentColor}>,&nbsp;</C>);
                                    }
                                }
                            }
                            returnArray.push(<br/>);
                        }
                    }
                    return returnArray;
                }
            },
            links: {
                description: 'Show a list of available quick links',
                fn: () => {
                    return 'link';
                }
            }
        };
        for (const method of methods) {
            if (method.type === 'engine') {
                const func = (...args) => {
                    const query = args.join(method.delimiter);
                    const queryText = method.uriEncode ? encodeURIComponent(query) : query;
                    window.open(`${method.url}?${method.query}${queryText}`, '_self');
                }

                if (!commandList[method.name]) {
                    commandList[method.name] = {
                        description: `Searches using ${method.name}.`,
                        usage: `${method.name} [search query]`,
                        fn: func
                    };
                }

                for (const alias of method.aliases) {
                    if (!commandList[alias]) {
                        commandList[alias] = {
                            description: `Searches using ${method.name}.`,
                            usage: `${alias} [search query]`,
                            fn: func
                        }
                    }
                }
            }
        }
        setCommands(commandList);
    }

    useEffect(() => {
        generateMethods();
        setChildKey(childKey+1);
    }, [setCommands]);


    useEffect(() => {
        if (shouldReloadMethods) {
            // Im disgusted by this, but oh well, his terminal suk
            // @ts-ignore
            generateMethods();
            setShouldReloadMethods(false);
            setChildKey(childKey+1);
        }
    }, [shouldReloadMethods]);

    const terminalStyles = {
        terminal: {
            backgroundColor: 'none',
            borderRadius: 0,
            maxHeight: '50%',
            minHeight: '0px',
            width: '700px',
            position: 'absolute',
            bottom: '50%',
            fontSize: '20px',
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

    const onSettingsClose = () => {
        setSettingsVisible(false);
        setShouldReloadMethods(true);
    }

    const renderTerminal = () => {
        return (
            <div className={classes.fullHeight}>
                <div className={classes.button} onClick={settingsClick}>
                    <SettingsIcon
                        className={classes.icon}
                    />
                </div>
                <Terminal
                    key={childKey}
                    ref={terminalRef}
                    style={terminalStyles.terminal}
                    contentStyle={terminalStyles.content}
                    promptLabelStyle={terminalStyles.prompt}
                    inputTextStyle={terminalStyles.input}
                    messageStyle={terminalStyles.message}
                    styleEchoBack={'labelOnly'}
                    commands={commands}
                    autoFocus
                    promptLabel={'>'}
                    noDefaults
                />
                <div
                    style={{
                        background: `linear-gradient(0deg, rgba(0,0,0,0) 85%, ${settings.backgroundColor} 100%)`,
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
                {renderTerminal()}
                <Drawer anchor="right" open={settingsVisible}>
                    <Settings
                        settings={settings}
                        onClose={onSettingsClose}
                        onChange={setSettings}
                    />
                </Drawer>
            </div>
        </div>
    )
}
