<script context="module">
	import { gql, GraphQLClient } from 'graphql-request'
	export async function load() {
		const endpoint =
			'https://api-eu-central-1.graphcms.com/v2/ckucohqd967ef01yz8cfm64gp/master'
		const graphCmsClient = new GraphQLClient(endpoint, {
			headers: {},
		})

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
			props: {
				launches,
			},
		}
	}
</script>

<script>
	export let launches
</script>

<svelte:head>
	<title>SpaceX Explorers</title>
</svelte:head>

<ul>
	{#each launches as { slug, name, date }}
		<li>
			<a href={`/mission/${slug}`}>
				<h2>{name}</h2>
				<time>{date}</time>
			</a>
		</li>
	{/each}
</ul>
