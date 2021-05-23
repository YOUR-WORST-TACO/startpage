import {useState} from "react";
import * as React from "react";
import {ChromePicker} from 'react-color';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
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
});

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

export default ColorPicker;
