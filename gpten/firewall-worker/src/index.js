export default {
    async fetch(request) {
        const clientIP = request.headers.get("CF-Connecting-IP");

        // Lista de IPs bloqueadas (puedes mejorar esto con una base de datos)
        const blockedIPs = ["192.168.198.233", "203.0.113.42"];

        if (blockedIPs.includes(clientIP)) {
            return new Response("Acceso Denegado", { status: 403 });
        }

        return new Response("Acceso Permitido", { status: 200 });
    }
};
