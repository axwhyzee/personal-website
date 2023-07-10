import { LEETCODE_GRAPHQL_URL } from '../consts/consts';

export async function get_user_stats(user) {
    const r = await fetch(`${LEETCODE_GRAPHQL_URL}/${user}`);
    return await r.json();
}