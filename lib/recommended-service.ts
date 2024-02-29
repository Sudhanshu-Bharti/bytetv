import { db } from "./db";
import {getself} from './auth-service'

export const getRecommended = async ()=> {
    let userId

    try {
        const selfId = await getself()
         userId = selfId.id 
    } catch {
         userId = null
    }
    
    let users = []

    if (userId) {
        users = await db.user.findMany({
            where:{
                AND: [
                    {
                        NOT:{
                            id: userId 
                        },
                    },
                    {   
                        NOT: {
                            followedBy: {
                                some :{
                                    followerId: userId
                                }
                            }
                        }
                    }
                ]
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