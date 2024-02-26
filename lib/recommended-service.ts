import { db } from "./db";
import {getself} from './auth-service'

export const getRecommended = async ()=> {

    const users = await db.user.findMany({
        orderBy: {
            CreatedAt: 'desc'
        }
    })

    return users
}