import { serialize } from "cookie";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { redirect } from "next/navigation";


//scrap this for db sess mangm, ask group abt making new table on airtable
//if still have no access to db, go for stateless

//1. create sess when user logs/signs in

//2. 

//secret keys are what are used to verify cookie from machine to the server
const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

//encrypt + decrypt functs go here after payload/user info is gotten

//create session funct
export async function createSession(){
    const expireDate = new Date(Date.now() + 60*60*24);
    const session = await //encrypt user id + expireDate

    cookies().set('session', sessionStorage, {
        httpOnly: true,
        secure: true,
        expires: expireDate,
        sameSite: 'lax',
        path: '/',
    });
    redirect('/'); //redirect to profile page w bookmarks
}

//verify session funct
export async function verifySession() {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.//user id
        ){
            redirect('/login');
        }
        return {
            isAuth: true, userId: Number(session.//user id
            )};
        }
}


//delete session funct
export function deleteSession() {
    cookies().delete('session');
    redirect('/login');
}