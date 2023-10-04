<script>
	export let form
</script>

<h1>Log In</h1>
{#if form?.incorrect}<p>Invalid credentials! Try again.</p>{/if}
<form method="POST" action="?/login">
	<label
		>Email
		<input name="email" type="email" value={form?.email ?? ''} required />
	</label>
	<label
		>Password
		<input name="password" type="password" required />
	</label>
	<button formaction="?/login">Log In</button>
</form>

<!-- <h1>Sign Up</h1>
{#if form?.incorrect}<p>Invalid credentials! Try again.</p>{/if}
<form method="POST" action="?/register">
	<label
		>Email
		<input name="regEmail" type="email" value={form?.regEmail ?? ''} required />
	</label>
	<label
		>Password
		<input name="regPassword" type="password" required />
	</label>
	<button formaction="?/register">Log In</button>
</form> -->
