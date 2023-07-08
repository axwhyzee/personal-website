export const QUERY_USER_STATS = `
    query($login: String!) {
        matchedUser(username: $login) {
            username
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
            }
        }
    }
`;