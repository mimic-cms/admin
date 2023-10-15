import { redirect, fail } from '@sveltejs/kit';

export async function load({ parent }) {
    const { session } = await parent()
    if (session) throw redirect(303, '/admin')

    return {
    }
}

export const actions = {
    login: async ({ request, locals: { supabase } }) => {
        const data = await request.formData();
        const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: data.get('email'),
            password: data.get('password'),
        })
        if (authData) {
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
