import { useEffect } from "react";
import { useState } from "react";
import SyncLoader from "react-spinners/ClipLoader";
import Toggle from 'react-toggle'
import "./dog.css"
import Cookies from 'js-cookie'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'




function Home() {
    const [dog, setDog] = useState("")
    const [cat, setCat] = useState("")
    const [loading, setLoading] = useState(true)
    const [animal, setAnimal] = useState("")
    const cookie = Cookies.get("theme")
    const [dark, setDark] = useState(cookie)
    const background = document.body
    background.style.backgroundColor = dark;


    async function getAnimal() {
        if (dog) setDog("")
        if (cat) setCat("")
        setLoading(true)
        let res;

        if (animal === 'cat') {
            res = await fetch("https://api.thecatapi.com/v1/images/search")
            if (res.ok) {
                const response = await res.json()
                setCat(response[0].url)
                setLoading(false)
            }
        } else {
            res = await fetch("https://dog.ceo/api/breeds/image/random")
            if (res.ok) {
                const response = await res.json()
                setDog(response.message)
                setLoading(false)
            }
        }
    }
    useEffect(() => {
        getAnimal()
        if (dog) {
            setDog("")
        }
        if (cat) {
            setCat("")
        }
    }, [animal])

    function choosePic() {
        if (dog) {
            return <img src={`${dog}`}></img>
        }
        if (cat) {
            return <img src={`${cat}`}></img>
        }
    }
    function setDarkMode() {
        if (dark === "black") {
            setDark('')
            Cookies.set("theme", "white")
        } else {
            setDark("black")
            Cookies.set("theme", "black")
        }
    }

    return (
        <div className="Container">
                <Toggle
                    id="darkModeToggler"
                    onChange={() => setDarkMode()}
                    checked={dark === 'black' ? true : false}
                    icons={{
                        checked: <BsFillSunFill  className="theSun"/>,
                        unchecked: <BsFillMoonFill className="theMoon"/>
                    }}
                />
            <div className="buttons">
                <button className={dark} onClick={() => setAnimal("cat")}>Cat</button>
                <button className={dark} onClick={() => setAnimal("dog")}>Dog</button>
            </div>
            {loading ? <SyncLoader /> : choosePic()}
            <button className={dark} onClick={() => getAnimal()}>{dog ? "Another Doge" : "Another Kitty"}</button>
        </div>
    )
}

export default Home
