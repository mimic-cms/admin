import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL, PUBLIC_DOMAIN } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

export const load = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_KEY,
        event: { fetch },
        serverSession: data.session,
        cookieOptions: {
            domain: PUBLIC_DOMAIN
        }
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return { supabase, session }
}