import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient'

let userId

// Note: load() blocks page mounting until everything is retrieved. Fetching data in <script> does not block.
export async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw redirect(303, '/login')

    userId = session.user.id
    const { data: websiteConfig } = await supabase.from('config').select('*')

    return { websiteConfig }
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
