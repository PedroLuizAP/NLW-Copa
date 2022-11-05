import "@fastify/jwt"
import { Fastify } from 'fastify';

declare module "@fastify/jwt"{
    interface FastifyJWT{
        user:{
            sub:string;
            name:string;
            avatarUrl: string;
        }
    }
}