<script context="module">
	export async function load({ error, status }) {
		return {
			props: {
				error,
				status,
			},
		}
	}
</script>

<script>
	export let error, status
</script>

<svelte:head>
	<title>{error.name} {status} | SpaceX Explorers</title>
</svelte:head>

<h1>Uh oh!</h1>
<p>It looks like you just hit a page that doesn't exist.</p>

<h2>{status}: {error.message}</h2>
