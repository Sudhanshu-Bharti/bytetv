import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getself =async () => {
    const self = await currentUser();

    if( !self || !self.username)
    {
        throw new Error('User not authorized');
    }

    const user = await db.user.findUnique({
        where: {
            externalId: self.id
        }
    })

    if(!user){
        throw new Error('User not found');
    }
    return user
}