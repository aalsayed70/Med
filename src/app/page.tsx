import { Header } from "@/sections/Header"; 
import {Hero} from "@/sections/Hero"
import { ModelNames } from "@/sections/ModelNames";
import {Models} from "@/sections/Models"
import GoogleMapEmbed from "@/sections/Map"
import {Footer} from "@/sections/Footer"
export default function Home() {
  return(
    <>
      <Header />
      <Hero />;
      <ModelNames/>
      <Models/>
      <div className="mt-5 mb-5">
        <GoogleMapEmbed/>
      </div>
      <Footer/>
    </>
  )
}
