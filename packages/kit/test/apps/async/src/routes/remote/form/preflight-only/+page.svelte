<script>
	import { get, set } from './form.remote.ts';
	import * as v from 'valibot';

	const data = get();

	const schema = v.object({
		a: v.pipe(v.string(), v.maxLength(7, 'a is too long')),
		b: v.string(),
		c: v.string(),
		d: v.string()
	});

	/** @param {Event} event */
	function validate_on_change(event) {
		if (event.target instanceof HTMLInputElement && event.target.name.startsWith('d')) return;
		set.validate();
	}
</script>

<p>a: {(await data).a}</p>
<p>b: {(await data).b}</p>
<p>c: {(await data).c}</p>

<hr />

<form
	{...set.preflight(schema)}
	oninput={() => set.validate({ preflightOnly: true })}
	onchange={validate_on_change}
>
	<input {...set.fields.a.as('text')} />
	<input {...set.fields.b.as('text')} />
	<input {...set.fields.c.as('text')} />
	<input {...set.fields.d.as('text')} />

	<button>submit</button>
</form>

<div class="issues">
	{#each set.fields.allIssues() as issue}
		<p>{issue.message}</p>
	{/each}
</div>
