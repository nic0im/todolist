"use client"
import { useEffect, useState } from "react"
import Add from "./svg/Add"
import TrashCan from "./svg/TrashCan"
import axios from "axios"


export default function NavBar() {

  const [proyectos, setProyectos] = useState([])

  const getAllProyects = async () => {

    try{
      await axios.get("https://txkwh4-8080.csb.app/Proyectos").then((p)=>setProyectos(p.data))
      return
    }catch(err){return console.log(err)}
    
  }

  useEffect(()=>{
    getAllProyects()
  },[])


  return (
    <div>
      <div className=" text-2xl mt-6 mb-4 flex justify-between gap-2 px-10">
        <p>Proyectos</p>
        <div className="border border-red-400 w-16 text-sm flex justify-center items-center"> Nuevo</div> 
      </div>
      <div className="flex flex-col gap-2 text-center">
        {proyectos.map((p)=>{
          return(
          <div className="py-3 text-md border border-red-500 hover:bg-black/10 flex justify-between">
            <div key={p.nombre} className=" w-full text-center">
            {p.nombre}
            </div>
            <div className=" mr-4">
              <TrashCan />
            </div>
            
          </div>
          )
        })}
      </div>

    </div>
  )
}
