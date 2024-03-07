"use server"

import {v4} from "uuid"
import { AccessToken } from "livekit-server-sdk"
import { getself } from "@/lib/auth-service"
import { getUserByUserID } from "@/lib/user-service"

export const createViewerToken = async( hostIdentity: string) => {
    let user
    
    try {
        user = await getself() 
   
    } catch (error) {
        const id  = v4()
        const username = `user#${Math.floor(Math.random()* 1000)}`
        user = { id , username}
    }
    const host = await getUserByUserID(hostIdentity)
    
    if(!host){
        throw new Error("user not dound");
    }

    const isHost = user.id === host.id

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${user.id}` : user.id,
            name: user.username
        }
    )
        token.addGrant({
            room: host.id,
            roomJoin: true,
            canPublish: false,
            canPublishData: true
        })

        //json web token convert krne k liye
        return await Promise.resolve(token.toJwt())
}