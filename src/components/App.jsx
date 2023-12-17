import React, { useState } from "react";
import Index from "./Index";
import Chat from "./Chat";


function App(props) {
    const [currentScreen, setCurrentScreen] = useState("Index")
    const [confirm, setConfirm] = useState(false)

    function changeScreen(value) {
        setCurrentScreen(value)
    }

    return (
        <>
        {(currentScreen == "Index") && (
            <Index changeScreen={changeScreen} setConfirm={setConfirm} />
        )}

        {(currentScreen == "Chat") && (
            <Chat confirm={confirm} />
        )}




        </>
    )


}


export default App;