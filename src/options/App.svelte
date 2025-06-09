<script>
	export let name = 'News Feed Eradicator';
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 space-y-4">
	<h1 class="text-4xl font-bold" data-testid="title">{name}</h1>
	<p class="text-lg text-gray-700">A cleaner social experience, now built with Svelte and Tailwind.</p>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}
</style>
