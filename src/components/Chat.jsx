import React, {useEffect, useState} from 'react';
import { v4 } from "uuid"
import { FaArrowRight, FaPaperPlane, FaSpinner } from "react-icons/fa6";
let socket;

let userId;
let firstRender = true;
function Chat(props) {
    const [] = useState("")
    const [userMsg, setUserMsg] = useState("")
    const [connectionStatus, setConnectionStatus] = useState(false)
    const [messages, setMessages] = useState([
    ])
    // {
    //     sender: "",
    //     message: "",
    //     // timestamp: ""
    // }
    

    const sendMessage = (event) => {
        if (userMsg.length > 0) {
            setMessages((prevMessages) => {
                let nonState = []
                for (let i=0; i < prevMessages.length; i++) {
                    nonState.push(prevMessages[i])
                }



                nonState.push({sender: "me", message: userMsg})







                return nonState
            })
            console.log("submitted", userMsg)
            
            
            waitForSocketConnection(socket, () => {
                console.log("thing sent",{sender: "me", message: userMsg})
                socket.send(JSON.stringify({sender: "me", message: userMsg}))
                console.log("message should have been sent")
            }
            )

            
            
                
            
            

            setUserMsg("")
        } else {
            console.log("not long enough yet")
        }
    }

    function messageChange(event) {
        console.log(userMsg)
        setUserMsg(event.target.value)
    }


    if (firstRender) {
        socket = new WebSocket("ws://localhost:2999");
        userId = v4()
        socket.uuid = userId
        
        firstRender = false;
    }


    function waitForSocketConnection(socket, callback){
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("Connection is made")
                    if (callback != null){
                        callback();
                    }
                } else {
                    console.log("wait for connection...")
                    waitForSocketConnection(socket, callback);
                }
                }, 5)
            }
    




    useEffect(() => {
        console.log(messages)
        socket.onmessage = ({data}) => {
            console.log("message received " + data)
            if (data == "ce") {
                setMessages([
                ])
                setConnectionStatus(true);
            } else if (data == "*/disconnected*/") {
                setMessages([{}])
                waitForSocketConnection(socket, () => {
                    socket.send("*/closing*/")
                    console.log("this connection closed")
                    setConnectionStatus(false)
                    console.log("socket closed")
                })
                




            } else {
                setMessages([...messages, {sender: "stranger", message: data}])
            }
            
            
        }

        return (           
            // socket.close() 
            // setMessages("")
            console.log("this is unmounting")
        )

    }, [messages])

    const goBack = () => {
        console.log("going back clicked")
    }

    const skipUser = () => {

        waitForSocketConnection(socket, () => {
            socket.send("*/closing*/")
            console.log("this connection closed")
            setConnectionStatus(false)
        })
    }


   

    return (
    <>

        {(!connectionStatus) && (
            <div className='z-50 fixed top-0 left-0 w-full h-full opacity-75 '>
                <div className='w-full h-full relative'>
                    <div className='fixed top-[50%] left-[50%]' style={{transform: "translate(-50%, -50%)"}}>
                        <FaSpinner size={"20vh"} className='animate-spin' />
                    </div>
                </div>  

            
            </div>
            
        )}
        
        {(connectionStatus) && (
            <section className='overflow-y-hidden overflow-x-hidden'>

        
            <div className='fixed top-0 h-[10%] left-0 w-full bg-[#FAF3DD] z-10'>
            <div className='grid items-center justify-items-center grid-cols-2 w-full h-full'>
                <div className='justify-self-start pl-3'>
                    <p className="font-doodle text-6xl text-cyan-300 ">
                        Ometv
                    </p>
                </div>
                <div className='justify-self-end self-center pr-3'>
                    <div className=' w-fit p-3 bg-black rounded-full group' onClick={goBack}>
                        <FaArrowRight className='text-white group-hover:translate-x-[20px] transition-all' />
                    </div>
                
                </div>
            </div>

            
            
            </div>

            <div className='absolute top-[10%] left-0 w-full h-[80%] bg-[#FFA69E]'>
                <div className='w-5/6 h-full mx-auto z-40 relative'>
                    <div className='w-4/6 h-full mx-auto p-4 relative bg-[#AED9E0]'>
                        <div className='absolute w-full h-[10%] bottom-0 bg-blue-300 z-60 left-0'>
                            <div className='w-full h-full relative'>
                                <input type="text" value={userMsg} onChange={messageChange} placeholder="Type message:" className='p-4 rounded-lg font-playpen top-[50%] absolute left-2 w-5/6' maxLength="100" style={{transform: "translateY(-50%)"}}></input>
                                <button onClick={sendMessage} className='absolute top-[50%] right-2 rounded-full bg-black text-white p-4 hover:scale-105 transition-all hover:bg-white hover:text-black' style={{transform: "translateY(-50%)"}}><FaPaperPlane /></button>
                            </div>

                            

                            
                        </div>
                        {(!props.confirm) && (
                            <p className='my-2 font-afacad text-3xl' >New chat started :</p>
                        )}
                        
                        {(props.confirm) && (
                            <p className='my-2 font-afacad text-3xl' >New chat started with mcps student:</p>
                        )}
                        


                        {/* <div className='grid grid-cols-1 items-center justify-items-center grid-rows-[100px] overflow-y-auto'> */}
                            {/* {(typeof(messages) != "undefined") && ( */}
                            <div className='h-[85%] overflow-y-auto p-2'>


                                {messages.map((user, index) => {
                                    console.log(user)
                                return (

                                    <div className='grid grid-cols-1 items-center justify-items-center grid-rows-[100px] overflow-y-auto' key={index}>
                                    {(user.sender == "stranger") && (
                                    <div className='justify-self-start'>

                                    <p className='font-playpen text-sm'>Stranger</p>
                                    <div className="p-3 bg-blue-300 rounded-lg relative border-gray-200 border-2 shadow-sm ">
                                    <p className='text-lg font-afacad'>
                                        {user.message}
                                    </p>
                                    {/* <div className='absolute bottom-[-10px] left-2 text-sm z-60 text-white'>
                                        Stranger
                                    </div> */}
                                    </div>
                                    </div>
                                )}
                                {(user.sender == "me") && (


                                        <div className='justify-self-end'>
                                            <p className='font-playpen text-sm'>You:</p>
                                            <div className="p-3 bg-blue-300 rounded-lg relative border-gray-200 border-2 shadow-sm ">
                                                <p className='text-lg font-afacad'>
                                                {user.message}
                                                </p>

                                            </div>
                                

                                        </div>

                                )}
                                

                                

                                
                                </div>
                                
                               
                                



                                )})}
                                </div>
                            {/* )} */}
                            



                                
                                

            

                            

                        {/* </div> */}
                        






                    </div>


                </div>
            </div>


            <div className='fixed bottom-0 left-0 w-full h-[10%] bg-[#FAF3DD]'>
                <div className='relative w-full h-full'>
                    <div className='right-5 absolute top-[50%]' style={{transform: "translateY(-50%)"}}>
                        <p className='text-white px-6 py-3 bg-blue-400 rounded-lg hover:bg-blue-500 select-none opacity-60 hover:opacity-100' onClick={skipUser}>Skip User</p>
                    </div>
                </div>

            </div>



        </section>
        )}
        
        
    </>
  )

}


export default Chat;





