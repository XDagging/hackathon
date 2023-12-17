import React, { useState } from "react";
import { FaX } from "react-icons/fa6";



function Check(props) {
    const [id,setId] = useState()
    const [password, setPassword] = useState()

    async function callApi(data) {
        let endpoint = "http://127.0.0.1:3000/check"
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }


    function handleChange(event) {
        if (event.target.id == "id") {
            setId(event.target.value)
        } else if (event.target.id == "password") {
            setPassword(event.target.value)
        } else {
            console.log("invalid handleChange event", event.target.id)
        }


        console.log(event.target.value)
    }



    
    function submitDetail() {  
        const data = {
            studentID: id,
            password: password
        }
        callApi(data).then((res) => {
            if (res.message == "success") {
                console.log("success")
                props.isConfirmed(true)
                props.changeCheck(false)
            } else if (res.message == "incorrect credentials") {
                console.log("incorrect")
            }
            
        })
    }

    function exitOut() {
        props.changeCheck(false)
    }





    return (
        <>  
            <div className="fixed opacity-75 bg-gray-400 top-0 left-0 z-10 w-full h-full"></div>
            <div className="fixed z-10 top-[50%] left-[50%] bg-[#B8F2E6] md:w-2/6 md:h-5/6 w-5/6 rounded-lg shadow-sm" style={{transform: "translate(-50%, -50%)"}}>
                <div className="relative">
                <div className="p-2 top-4 right-4 fixed hover:scale-105 text-white hover:text-black hover:shadow-lg hover:bg-white transition-all bg-black rounded-full" onClick={exitOut}>
                    <FaX className="" size="1.3em" />
                </div>

                <div className="w-5/6 h-full mx-auto text-white py-4 text-center">
                    <p className="font-afacad text-5xl mb-14">
                         Confirm your account
                    </p>
                    <div className="mt-10">
                        <div className="mb-10 p-3 bg-[#FFA69E] w-fit mx-auto h-fit rounded-lg scale-105">
                            <p className="font-afacad text-2xl mb-2">Student ID:</p>
                            <input autoFocus id="id" type="text" placeholder="eg:12345" className="p-4 font-playpen rounded-lg text-black" value={id} maxLength="10" onChange={handleChange}></input>
                        </div>

                        <div className="mb-10 p-3 bg-[#FFA69E] w-fit mx-auto h-fit rounded-lg scale-110">
                            <p className="font-afacad text-2xl mb-2">Student Password:</p>
                            <input id="password" type="password" placeholder="eg:12345" className="p-4 font-playpen rounded-lg text-black" maxLength="15" value={password} onChange={handleChange}></input>
                        </div>

                        <div className="">
                            <button onClick={submitDetail} className="p-4 bg-black rounded-lg animate-bounce hover:animate-none font-playpen">Check Account</button>
                        </div>
                    </div>
                    

                </div>
            </div>
            </div>

        </>
    )
}


export default Check;