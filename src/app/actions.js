'use server'

import { cookies } from "next/headers"

export async function deleteSessionCookies() {
    cookies().delete('actk');
    return true
}