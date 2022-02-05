export const Config = {
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1",
    USER_ID: process.env.NEXT_PUBLIC_USER_ID ?? "root",
    PASSWORD: process.env.NEXT_PUBLIC_PASSWORD ?? "password",
}