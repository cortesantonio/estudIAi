import { Navbar } from "../../components/navbar"
import { Hero } from "./Hero"
import { Features } from "./Features"
import { Steps } from "./Steps"
import { Footer } from "./Footer"

export const Index = () => {
    return (
        <>
            <Navbar />
            < Hero />
            <Features />
            <Steps />
            <Footer />
        </>
    )
}