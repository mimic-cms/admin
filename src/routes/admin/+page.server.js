import { redirect } from '@sveltejs/kit';

let userId

export async function load({ parent }) {
    const { session } = await parent()
    if (!session) throw redirect(303, '/auth')

    userId = session.user.id
}

export const actions = {
    site: async ({ request }) => {
        const data = await request.formData();
        await supabase.from('config').insert([{
            name: data.get('name'),
            user_id: userId
        }])
    }
};
