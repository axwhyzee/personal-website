export const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export const GITHUB_GRAPHQL_HEADERS = {
    'Authorization': 'Bearer ' + process.env.REACT_APP_GITHUB_API_KEY,
    'Content-Type': 'application/json'
};

export const COLOR_CYAN = '#1b8080';

export const COLOR_RED = '#b44646';

export const COLOR_LIME = '#4fbb4f'

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const RESUME_FILEPATH = `${SERVER_URL}/file?filepath=00000000-0000-0000-0000-000000000000.pdf`;

export const RESUME_FILENAME = 'resume_siah_wee_hung.pdf';

export const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql'
