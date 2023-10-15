import { redirect } from '@sveltejs/kit';

let userId

export async function load({ parent }) {
    const { supabase, session } = await parent()
    if (!session) throw redirect(303, '/auth')

    userId = session.user.id
    const { data: websiteConfig } = await supabase.from('config').select('*')


    return { websiteConfig, session }
}
