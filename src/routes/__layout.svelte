<script>
	import '../app.css'
	import Header from '$lib/header.svelte'
</script>

<div class="mx-auto max-w-5xl px-4 sm:px-6 lg-px-8">
	<Header />
	<main class="mx-auto max-w-3xl">
		<slot />
	</main>
</div>
