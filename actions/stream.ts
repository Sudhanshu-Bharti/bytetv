"use server"
import { db } from "@/lib/db"
import { getself } from "@/lib/auth-service"
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateStream = async (values: Partial<Stream>) => {

    try {
        const self = await getself()
        const selfStream = await db.stream.findUnique({
            where: {
                userId : self.id
            }
        })
    
        if(!selfStream) {
            throw new Error("Internal error");
            
        }
    
        const validData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatDelayed: values.isChatDelayed,
            isChatFollowersOnly: values.isChatFollowersOnly
        }
    
        const stream = await db.stream.update({
            where:{
                id: selfStream.id
            },
            data: {
                ...validData
            }
        })
    
        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)
        return stream;
        
    } catch (error) {
            throw new Error("Internal error");
            
    }
}