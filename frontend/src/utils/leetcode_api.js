import { LEETCODE_GRAPHQL_URL } from '../consts/consts';
import { QUERY_USER_STATS } from '../consts/graphql/leetcode';

export async function get_user_stats(user) {
    const r = await fetch(LEETCODE_GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({
            query: QUERY_USER_STATS,
            variables: {login: user}
        })
    });
    const data = await r.json();
    console.log(data);
    return data;
}