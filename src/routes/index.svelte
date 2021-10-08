<script context="module">
	export const prerender = true

	export async function load({ fetch }) {
		const res = await fetch('/launches.json')

		if (res.ok) {
			const { launches } = await res.json()
			return {
				props: {
					launches,
				},
			}
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
			<a sveltekit:prefetch href={`/mission/${slug}`}>
				<h2>{name}</h2>
				<time>{date}</time>
			</a>
		</li>
	{/each}
</ul>
