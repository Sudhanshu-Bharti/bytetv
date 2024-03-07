"use client"
import { createViewerToken } from "@/actions/token"
import { useEffect, useState } from "react"
import { JwtPayload, jwtDecode } from "jwt-decode";
export const useViewerToken =  (hostIdentity : string) => {

    const [token , setToken] = useState("")
    const [identity , setIdentity] = useState("")
    const [name , setName] = useState("")

    useEffect(() => {
        const createToken = async () => {
            
            try {
                const viewerToken = await createViewerToken(hostIdentity)
                setToken(viewerToken)
    
                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string
                }
                const name= decodedToken?.name
                const identity = decodedToken.iss

                
                if (identity) {
                    setIdentity(identity)
                }
                console.log(identity);
                if(name){
                    setName(name)
                }
    
            } catch (error) {
                throw new Error("Cant generate token");
                
            }
        }
        
        createToken()
        
    }, [hostIdentity])
    
   return {token, name , identity}

} 