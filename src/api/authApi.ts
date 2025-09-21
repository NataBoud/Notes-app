import { BASE_URL } from "../config";

export async function loginRequest({ email, password }: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Login failed ${res.status} ${msg}`);
    }
    return res.json(); // contient {token, user}
}

export async function registerRequest({ email, password }: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Register failed ${res.status} ${msg}`);
    }
    return res.json(); // contient {token, user}
}
