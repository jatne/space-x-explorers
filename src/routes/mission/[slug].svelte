<script context="module">
	export const prerender = true

	export async function load({ fetch, page: { params } }) {
		const { slug } = params
		const res = await fetch(`/mission/${slug}.json`)

		if (res.ok) {
			const { mission } = await res.json()
			return {
				props: {
					mission,
				},
			}
		}
	}
</script>

<script>
	export let mission

	const { name, date, launchSuccess, launchSite, link, rocket } = mission
</script>

<article>
	<h1>{name}</h1>
	<time class="text-sm mb-4 block">{date}</time>
	{#if launchSuccess}
		<p>Launched successfully</p>
	{:else}
		<p>Launch failed</p>
	{/if}
	<p><strong>Launch site: </strong>{launchSite.longName}</p>
	<p><strong>Launch site short name: </strong>{launchSite.name}</p>
	<section class="py-5">
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

<style lang="postcss">
	p {
		@apply text-xl;
		@apply mb-2;
	}

	h1 {
		@apply text-4xl;
	}

	h2 {
		@apply text-3xl;
	}

	h3 {
		@apply text-4xl;
	}
	h1,
	h2,
	h3 {
		@apply my-5;
	}
</style>
