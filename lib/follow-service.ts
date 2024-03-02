import { db } from "./db";
import { getself } from "./auth-service";

export const getFollowingUsers= async () => {
    try {
        const self = await getself()

    const followedUsers = await db.follow.findMany({
        where: {
            followerId: self.id
        
        },
        include:{
            following: {
                include: {
                    stream: true
                }
            }
            
        }
    })

    return followedUsers
    } catch (error) {
        return []
    }
}



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

export const followUser = async (id: string) => {
    const self = await getself()

    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if(!otherUser){
        throw new Error("User not Found")
    }

    if (otherUser.id === self.id){
        throw new Error("cant folllow urself");
        
    }

    const exisitingFollow = await db.follow.findFirst({
        where:{
            followerId : self.id,
            followingId: otherUser.id
        }

    })

    
    if(exisitingFollow){
        throw new Error("already following");
        
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            following: true,
            follower:true
        }
      
    })
    return follow
}

export const unfollowUser = async (id : string ) => {
    const self = await getself()

    const otherUser = await db.user.findUnique({
        where : { id}
    })

    if(!otherUser) {
        throw new Error("user not found");
        
    }

    if(otherUser.id === self.id) {
        throw new Error("Cant follow usersefl")
    }
    const exisitingFollow = await db.follow.findFirst({
        where:{
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    if (!exisitingFollow) {
        throw new Error("You arent following the usr");
        
    }
    const follow = await db.follow.delete({
        where: {
            id: exisitingFollow.id
        },
        include: {
            following: true
        }
    })
    return follow
}