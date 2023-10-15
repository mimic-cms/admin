<script>
	import { PUBLIC_BUILDER_URL } from '$env/static/public'

	export let data
	let { websiteConfig, session } = data
</script>

<h1>Admin</h1>
<h2>Current Websites</h2>
<ul style="list-style:none;">
	{#each websiteConfig as config}
		<li>
			<details>
				<summary>{config.name}</summary>
				<ul>
					<li><a href="https://google.com">Live Site</a></li>
					<li>
						<a
							href={`${PUBLIC_BUILDER_URL}auth/callback/?code=${session.access_token}&refresh=${
								session.refresh_token
							}&iss=${session.user.iss.match(/^https:\/\/(\w*).supabase.co\/auth\//)[1]}`}
							>Builder</a
						>
					</li>
				</ul>
			</details>
		</li>
	{/each}
</ul>
<h2>Create Website</h2>
<form style="display:flex; flex-direction:column; gap:.5rem;" method="POST" action="?/site">
	<label
		>Website Name
		<input name="name" type="text" required />
	</label>
	<button style="width:fit-content;" formaction="?/site">Add Website</button>
</form>
