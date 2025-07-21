import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config()

let client = null;
let isConnected = false;

export const getClient = async()=>{
    try{
        if(!isConnected){
            client = await mysql.createConnection({
                host: process.env.HOST || "localhost",
                user: process.env.USER || "root",
                password: process.env.PASSWORD || "",
                database: process.env.DATABASE,
            })
            isConnected = true
        }
        return client;
    }catch(e){
        console.log('Connection error: ', e.message);
        throw new Error("Error connecting to DB!")
    }
}

export const closeClient = async()=>{
    try{
        if(isConnected && client){
            await client.end();
            isConnected = false;
            client = null;
            console.log('Database Client Closed!');
        }
    }catch(e){
        console.log('Error closing database client :',e.message);
    }
}