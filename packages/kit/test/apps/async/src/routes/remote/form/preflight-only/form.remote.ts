import { form, query } from '$app/server';
import { invalid } from '@sveltejs/kit';
import * as v from 'valibot';

let data = { a: '', b: '', c: '', d: '' };

export const get = query(() => {
	return data;
});

export const set = form(
	v.object({
		a: v.pipe(v.string(), v.minLength(3, 'a is too short')),
		b: v.pipe(v.string(), v.minLength(3, 'b is too short')),
		c: v.pipe(v.string(), v.minLength(3, 'c is too short')),
		d: v.string()
	}),
	async (d, issue) => {
		if (d.d === 'taken') {
			invalid(issue.d('That slug is taken'));
		}

		data = d;
	}
);
