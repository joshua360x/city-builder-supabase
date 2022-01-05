const SUPABASE_URL = 'https://nhbazqqortcneqwecrjp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwNzU3MywiZXhwIjoxOTU1MDgzNTczfQ.ItAD5AYhCLq3yVOxHVfShkrOdhiFsmpg3uT9tBIISV0';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}





export async function getCity() {
    const response = await client
    //technically should be cities since its multiple and its grabbing only one from the database
        .from('city')
        .select()
        .single();

    return checkError(response);
}

export async function createDefaultCity() {
    const response = await client
        .from('city')
        .insert([
            {
                name: 'Hello World',
                skyline: 'cloudy',
                castle: 'small',
                land: 'grass',
                tagline: []
            }
        ]);

    return checkError(response);
}




export async function updateSkyline(value) {

    const user = await getUser();

    const response = await client
        .from('city')

        .update({ skyline: value })

        .match({ user_id: user.user.id })

        .single();
  
    return checkError(response);
}

export async function updateCastle(id) {

    const user = await getUser();

    const response = await client
        .from('city')

        .update({ castle: id })

        .match({ user_id: user.user.id })

        .single();
  
    return checkError(response);
}

export async function updateLand(id) {

    const user = await getUser();

    const response = await client
        .from('city')

        .update({ land: id })

        .match({ user_id: user.user.id })

        .single();
  
    return checkError(response);
}


















export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}
