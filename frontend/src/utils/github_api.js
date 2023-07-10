import { SERVER_URL, CONTENT_TYPE_HEADERS } from '../consts/consts';
import { QUERY_REPOS } from '../consts/graphql/github';

function _compare_updated(a, b) {
    return a.updatedAt < b.updatedAt ? 1 : -1;
}

export async function list_user_repos(user, token='') {
    const headers = {...CONTENT_TYPE_HEADERS};

    if (token) headers.Authorization = 'Bearer ' + token;
 
    const r = await fetch(`${SERVER_URL}/proxy/graphql/github`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            query: QUERY_REPOS,
            variables: {login: user}
        })
    });
    const data = await r.json();
    if ('data' in data) {
        const pinned = data.data?.user?.pinnedItems.nodes.map((obj) => obj.url) || [];
        const repos = data.data?.user?.repositories.nodes || [];

        for (const repo of repos) repo.pinned = pinned.includes(repo.url);

        repos.sort(_compare_updated);
        return {repos: repos, error: ''};
    } else if ('message' in data) {
        return {repos: [], error: data.message};
    }
}