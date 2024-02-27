import { db } from "./db";
import { getself } from "./auth-service";


export const isFollowingUser = async (id :string) => {
    const self = await getself()
    const otherUser = await db.user.findUnique({
        where: { id }
    })
try {
    if (!otherUser) {
        throw new Error('UNF')
    }

    if (otherUser.id === self.id) {
        return true
    }

    const exisitingFollow = await db.follow.findFirst({
        where:{
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    return !!exisitingFollow

    } catch (error) {
    return false
    }

}