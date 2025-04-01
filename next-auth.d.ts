//First step after installing next-auth is to define a interface for sessions
import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            username: string
        } & DefaultSession['user'] //Default session given by next-auth
    }
}
