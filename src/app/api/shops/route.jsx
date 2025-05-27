export async function GET() {
    try {
        const response = await fetch('https://api.kontur.ru/market/v1/shops', {
            headers: {
                'x-kontur-apikey': '622d28dd-e6b3-c5bb-5c3d-006b2bc0ea71',
            },
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error.message, { status: 500 });
    }
}
