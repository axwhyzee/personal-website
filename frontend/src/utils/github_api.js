import { GITHUB_GRAPHQL_URL, GITHUB_GRAPHQL_HEADERS } from '../consts/consts';
import { QUERY_REPOS } from '../consts/graphql/github';

function _compare_updated(a, b) {
    return a.updatedAt < b.updatedAt ? 1 : -1;
}

export async function list_user_repos(user) {
    const r = await fetch(GITHUB_GRAPHQL_URL, {
        method: 'POST',
        headers: GITHUB_GRAPHQL_HEADERS,
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