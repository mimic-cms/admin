let userId

export async function load({ parent }) {
    const { session } = await parent()
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
