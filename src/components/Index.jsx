import React, {useState} from "react";
import Check from "./Check.jsx"



function Index(props) {
    const [tag, setTag] = useState("")
    const [check, setCheck] = useState(false)
    function tagChange(event) {
        setTag(event.target.value)
        console.log(tag)
    }

    function changeCheck(value) {
        setCheck(value)
    }
    

    function submitClick(event) {
        if (event.target.id == "all") {
            console.log("anyone can chat with them")
            props.changeScreen("Chat")
        } else if (event.target.id == "students") {
            console.log("mcps can chat with them")
            setCheck(true)
        } else {
            console.log("only certain people can chat with them")
        }
    }

    function isConfirmed() {
        props.setConfirm(true)
    }



    return (
        <>

            {(check) && (
                <Check changeCheck={changeCheck} isConfirmed={isConfirmed} />
            )}
            {/* change the width and height stuff once we have elements */}
            <section className="bg-[#FFA69E] h-screen w-screen select-none">
            <div className="fixed top-5 left-4 w-fit h-fit">
                <p className="font-doodle text-6xl text-cyan-300 transition-all hover:scale-105">
                    Ometv
                </p>
            </div>

            <div className="relative h-full w-4/6 mx-auto">
                <div className="w-full h-4/6 rounded-lg bg-[#FAF3DD] m-0 absolute top-[50%] shadow-lg " style={{transform: "translateY(-50%)"}}>
                    <h1 className="text-5xl text-black text-center w-fit h-fit rounded-lg mx-auto font-afacad mt-3">Meet people anonymously</h1>

        {/* items-center justify-items-center */}
                    <div className="grid grid-cols-1  sm:gap-5 gap-y-2 p-2 items-start justify-items-center sm:grid-cols-2">
                        <div className=" sm:w-4/6 w-full bg-blue-200 rounded-lg p-2">
                        <p className="my-2 font-playpen text-2xl">Chat with anyone</p>
                            <p className="mb-5 font-playpen">Add Tags: <input type="text" placeholder="Dogs" maxLength="10" value={tag} className="font-playpen rounded-lg p-3" onChange={tagChange}></input></p>
                            <p id="all" className="p-2 bg-black text-white w-fit rounded-lg hover:scale-105 active:border-8 active:border-gray-300 active:shadow-2xl" onClick={submitClick}>
                                Find a person to talk to
                            </p>

                        </div>
                        <div className="sm:w-4/6 w-full bg-blue-200 rounded-lg p-2">
                            <p className="font-playpen my-2 text-2xl">Chat with mcps students</p>
                            <p className="mb-5 font-playpen">Add Tags: <input type="text" placeholder="Dogs" className="font-playpen rounded-lg p-3"></input></p>
                            <p id="students" className="p-2 bg-black text-white w-fit rounded-lg hover:scale-105" onClick={submitClick}>
                                Chat to students
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            





            </section>



        </>
    )


}


export default Index;