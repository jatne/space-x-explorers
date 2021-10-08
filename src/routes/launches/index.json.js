import { gql, GraphQLClient } from 'graphql-request'

export async function get() {
	const endpoint = import.meta.env.VITE_GRAPHCMS_ENDPOINT
	const graphCmsClient = new GraphQLClient(endpoint, {
		headers: {},
	})

	try {
		const query = gql`
			query LaunchesIndex {
				launches {
					id
					slug
					date
					name
				}
			}
		`

		const { launches } = await graphCmsClient.request(query)

		return {
			status: 200,
			body: {
				launches,
			},
		}
	} catch (err) {
		return {
			status: 500,
			body: {
				error: err,
			},
		}
	}
}
