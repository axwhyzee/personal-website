export const QUERY_REPOS = `
  query($login: String!) {
      user(login: $login) {
        pinnedItems(first: 100, types: REPOSITORY) {
          nodes {
            ... on Repository {
              url
            }
          }
        }
        repositories(first:100) {
          nodes {
            url
            name
            homepageUrl
            description
            createdAt
            openGraphImageUrl
            updatedAt
            visibility
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
  }
`;