export async function GET(request, context) {
    const { params } = context;

    if (!params?.shopId) {
        return
    }

    try {
        const response = await fetch(`https://api.kontur.ru/market/v1/shops/${params.shopId}/products/${params.productId}`, {
            headers: {
                'x-kontur-apikey': '622d28dd-e6b3-c5bb-5c3d-006b2bc0ea71',
            },
        });

        if (!response.ok) {
            return new Response('Ошибка от внешнего API', { status: response.status });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Ошибка:', error);
        return new Response('Ошибка сервера', { status: 500 });
    }
}