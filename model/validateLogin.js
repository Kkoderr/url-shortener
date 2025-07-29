import { eq } from "drizzle-orm"
import { db } from "../config/dbClient(drizzle).js"
import { users } from "../drizzle/schema.js"
import argon2 from 'argon2';

const check_password = async (password, encrypted_password) => {
    try {
        return await argon2.verify(encrypted_password, password);
    } catch(e) {
        console.log(e);
        return false;
    }
}

export const validate_login = async(email, password)=>{
    try{
        let data = await db.select().from(users).where(eq(users.email, email));
        if(data.length > 0) {
            if(await check_password(password, data[0].password)){
                return [true, 'User authenticated!', data[0]];
            }else{
                return [false, 'Password incorect!', {}];
            }
        }
        return [false, 'Email not found!', {}];
        
    }catch(e){
        console.log(e)
        return [false, 'DB Error!', {}];
    }
}