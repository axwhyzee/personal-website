import { SERVER_URL, CONTENT_TYPE_HEADERS } from '../consts/consts';
import { QUERY_USER_STATS } from '../consts/graphql/leetcode';

export async function get_user_stats(user) {
    const r = await fetch(`${SERVER_URL}/proxy/graphql/leetcode`, {
        method: 'POST',
        headers: CONTENT_TYPE_HEADERS,
        body: JSON.stringify({
            query: QUERY_USER_STATS,
            variables: {login: user}
        })
    });
    const data = await r.json();
    console.log(data);
    return data;
}