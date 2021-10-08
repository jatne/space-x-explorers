import { gql, GraphQLClient } from 'graphql-request'

export async function get(req) {
	const endpoint = import.meta.env.VITE_GRAPHCMS_ENDPOINT
	const graphCmsClient = new GraphQLClient(endpoint, {
		headers: {},
	})

	const slug = req.params.slug

	try {
		const query = gql`
			query GetMission($slug: String!) {
				mission: launch(where: { slug: $slug }) {
					year
					date
					name
					launchSuccess
					rocket {
						name
						type
						image {
							fileName
							url(
								transformation: {
									image: { resize: { width: 500, height: 500, fit: clip } }
								}
							)
						}
					}
					launchSite {
						name
						longName
					}
					link {
						article
						pressKit
						video
						wikipedia
						flickrImages {
							url(
								transformation: {
									image: { resize: { fit: clip, height: 500, width: 500 } }
								}
							)
						}
					}
				}
			}
		`

		const variables = { slug }
		const { mission } = await graphCmsClient.request(query, variables)

		return {
			status: 200,
			body: {
				mission,
			},
		}
	} catch (err) {
		return {
			status: 500,
			body: {
				error: 'A server error occurred',
			},
		}
	}
}
