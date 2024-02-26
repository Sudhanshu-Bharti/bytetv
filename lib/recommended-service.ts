import { db } from "./db";
import {getself} from './auth-service'

export const getRecommended = async ()=> {
    let userId

    try {
        const selfId = await getself()
         userId = selfId 
    } catch {
         userId = null
    }
    
    let users = []

    if (userId) {
        users = await db.user.findMany({
            where:{
                NOT:{
                    id: userId.id 
                }
            },
            orderBy: {
                CreatedAt: 'desc'
            }
        })
    } else {
        users = await db.user.findMany({
            orderBy: {
                CreatedAt: 'desc'
            }
        })   
    }

    return users
}