<script context="module">
	import { gql, GraphQLClient } from 'graphql-request'

	export async function load({ page: { params } }) {
		const { slug } = params
		const endpoint =
			'https://api-eu-central-1.graphcms.com/v2/ckucohqd967ef01yz8cfm64gp/master'
		const graphCmsClient = new GraphQLClient(endpoint, { headers: {} })

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
			props: { mission },
		}
	}
</script>

<script>
	export let mission

	const { name, date, launchSuccess, launchSite, link, rocket } = mission
</script>

<article>
	<h1>{name}</h1>
	<time>{date}</time>
	{#if launchSuccess}
		<p>Launched successfully</p>
	{:else}
		<p>Launch failed</p>
	{/if}
	<p><strong>Launch site: </strong>{launchSite.longName}</p>
	<p><strong>Launch site short name: </strong>{launchSite.name}</p>
	<section>
		<h2>Links:</h2>
		<ul>
			{#if link.article}
				<li>
					<a href={link.article}>Article</a>
				</li>
			{/if}
			{#if link.pressKit}
				<li>
					<a href={link.pressKit}>pressKit</a>
				</li>
			{/if}
			{#if link.video}
				<li>
					<a href={link.video}>video</a>
				</li>
			{/if}
			{#if link.wikipedia}
				<li>
					<a href={link.wikipedia}>wikipedia</a>
				</li>
			{/if}
		</ul>
		{#if link.flickrImages.length > 0}
			<h3>Flickr Images</h3>
			{#each link.flickrImages as image}
				<img src={image.url} alt={image.alt} />
			{/each}
		{/if}
	</section>
	<h3>Rocket Name: {rocket.name}, type: {rocket.type}</h3>
	<img src={rocket.image.url} alt={rocket.name} />
</article>
