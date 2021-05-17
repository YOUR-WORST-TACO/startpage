import * as React from 'react';
import Terminal from 'react-console-emulator'

const commands = {
    echo: {
        description: 'Echo a passed string.',
        usage: 'echo <string>',
        fn: (...args) => args.join(' ')
    }
}

export default () => {
    return (
        <Terminal
            style={{
                maxHeight: 400
            }}
            commands={commands}
            welcomeMessage={'Welcome to the React terminal!'}
            promptLabel={'me@React:~$'}
        />
    )
}
