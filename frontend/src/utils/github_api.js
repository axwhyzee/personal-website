import { QUERY_REPOS } from '../consts/graphql/github';
import { SERVER_URL, CONTENT_TYPE_HEADERS } from '../consts/consts';

function _compare_updated(a, b) {
    return a.updatedAt < b.updatedAt ? 1 : -1;
}

export async function list_user_repos(user) {
    const r = await fetch(`${SERVER_URL}/proxy/graphql/github`, {
        method: 'POST',
        headers: CONTENT_TYPE_HEADERS,
        body: JSON.stringify({
            query: QUERY_REPOS,
            variables: {login: user}
        })
    });
    const data = await r.json();
    const pinned = data.data?.user?.pinnedItems.nodes.map((obj) => obj.url) || [];
    const repos = data.data?.user?.repositories.nodes || [];

    for (const repo of repos) repo.pinned = pinned.includes(repo.url);

    repos.sort(_compare_updated);
    return repos;
}