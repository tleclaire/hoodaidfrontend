﻿interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(request);

    try {
        // may error if there is no body
        response.parsedBody = await response.json();
    } catch (ex) {}

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

export async function get<T>(
    path: string,
    args: RequestInit = { method: 'get' },
): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
}

//'Content-Type': 'application/json',
// eslint-disable-next-line no-dupe-keys

export async function post<T>(
    path: string,
    body: any,
    args: RequestInit = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    },
): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
}

export async function put<T>(
    path: string,
    body: any,
    args: RequestInit = { method: 'put', body: JSON.stringify(body) },
): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
}
