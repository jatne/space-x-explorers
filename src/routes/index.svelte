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

<h1 class="text-4xl">SpaceX Explorers</h1>

<ul>
	{#each launches as { slug, name, date }}
		<li
			class="
				border-primary
				border
				rounded-xl
				my-5
				p-5
				transition
				hover:bg-primary
			"
		>
			<a sveltekit:prefetch href={`/mission/${slug}`}>
				<h2 class="text-3xl">{name}</h2>
				<time>{new Date(date)}</time>
			</a>
		</li>
	{/each}
</ul>
