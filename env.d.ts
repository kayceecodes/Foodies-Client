declare module '*.css' {
    const content: Record<string, string>
    export default content
}


namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string
    }
}