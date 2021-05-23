
export default {
    searchEngines: [
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
    ],
    backgroundColor: '#0b091f',
    promptColor: '#dcd05d',
    contentColor: '#ffffff',
    errorColor: '#de8080',
    specialColor: '#8492e2'
};
