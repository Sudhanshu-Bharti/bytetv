"use server"

import { IngressAudioEncodingPreset,IngressInput, IngressClient, RoomServiceClient, IngressVideoEncodingPreset, CreateIngressOptions  } from "livekit-server-sdk"
import { db } from "@/lib/db"
import { getself } from "@/lib/auth-service"
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models_pb"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!

)

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

export const resetIngresses = async (hostIdentity: string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    })

    const rooms = await roomService.listRooms([hostIdentity])

    for( const room of rooms){
        await roomService.deleteRoom(room.name)
    }

    for ( const ingress of ingresses){
        if(ingress.ingressId){
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }
}

export const createIngress = async(ingressType: IngressInput )=> {

    const self =await getself()

    //start se phle reset all the prev ingress 
    await resetIngresses(self.id)


    const options : CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantName: self.username,
        participantIdentity: self.id
    }

    if(ingressType === IngressInput.WHIP_INPUT){
        options.bypassTranscoding = true
    } else {
        options.video={
            source: TrackSource.CAMERA,
            //@ts-ignore
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
        }
        options.audio = {
            source: TrackSource.MICROPHONE,
            //@ts-ignore
            preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
        }
    }
    const ingress = await ingressClient.createIngress(
        ingressType, options
    )

    if (!ingress || !ingress.url || ! ingress.streamKey) {
        throw new Error("Ingress error");
    }

    await db.stream.update({
        where:{userId: self.id },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            Streamkey: ingress.streamKey
        }
    })

    revalidatePath(`/u/${self.username}/keys`)
    return ingress
}