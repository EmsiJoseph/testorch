import { handleClientSideApiResponse } from "@/lib/handlers/handle-client-side-api-response"
import { StepProps } from "@/lib/interfaces/project.interfaces"
import { useSignalEffect } from "@preact/signals-react"
import { useEffect, useRef } from "react"

import socket from "@/lib/clients/socket-io"
import useSocketsStore from "@/lib/stores/use-sockets"


const TestRunningContainer: React.FC<StepProps> = ({ nextStep }) => {

    const {buildProgress, setBuildProgress} = useSocketsStore()

    const hasExecutedRef = useRef(false)

    useEffect(() => {
        if (hasExecutedRef.current) return
        hasExecutedRef.current = true
    
        const getDashboards = () => {
        
        }
    
        getDashboards()
      }, [])
    
      useSignalEffect(() => {
        // Listen for build status updates
        socket.on("buildProgress", (progress) => {
          console.log("Build Progress Update: ", progress)
          setBuildProgress(progress)
        })
    
        // Clean up the event listeners on component unmount
        return () => {
          socket.off("buildProgress")
        }
      })
    return (

    )

}

export default TestRunningContainer
