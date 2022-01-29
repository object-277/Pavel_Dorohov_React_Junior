import { client } from "@tilework/opus";

export const executePost = async (query) => {
    client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);
    const response = await client.post(query).then((data) => data);
    return response;
}