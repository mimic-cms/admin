import { redirect, fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient'

// Note: load() blocks page mounting until everything is retrieved. Fetching data in <script> does not block.
export async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) throw redirect(303, '/admin')

    return {
    }
}

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: data.get('email'),
            password: data.get('password'),
        })
        if (authData) {
            await supabase.auth.setSession({
                access_token: authData.session.access_token,
                refresh_token: authData.session.refresh_token
            })
            throw redirect(303, '/admin')
        }
        else return fail(403, { email: data.get('email'), incorrect: true })
    },
    // register: async ({ cookies, request }) => {
    //     const data = await request.formData();
    //     const { data: authData, error } = await supabase.auth.signUp({
    //         email: data.get('regEmail'),
    //         password: data.get('regPassword'),
    //     })
    //     if (authData?.session) {
    //         await supabase.auth.setSession({
    //             access_token: authData.session.access_token,
    //             refresh_token: authData.session.refresh_token
    //         })
    //         throw redirect(303, '/admin')
    //     }
    //     else return fail(403, { email: data.get('email'), incorrect: true })
    // }
};
