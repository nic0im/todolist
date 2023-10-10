"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Stars from "./comps/Stars.js";
import { useRouter } from "next/navigation";

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [tareaId, setTareaId] = useState("");
  const [tareaNombre, setTareaNombre] = useState("");
  const [tareaEstado, setTareaEstado] = useState(false);
  const [tareaImportancia, setTareaImportancia] = useState(0);
  const router = useRouter();
  const getTasks = async () => {
    try {
      await axios
        .get("https://txkwh4-8080.csb.app/Tareas", {
          headers: {
            "Cache-Control": "no-cache",
          },
        })
        .then((res) => {
          setTareas(res.data);
        }); // Assuming the tasks are returned as an array in the response
    } catch (err) {
      console.error(err);
    }
  };
  const deleteTask = async (_id) => {
    try {
      await axios
        .delete(`https://txkwh4-8080.csb.app/Tareas/${_id}`)
        .then((res) => {
          const nuevoArray = tareas.filter((obj) => obj._id !== res.data._id);
          return setTareas(nuevoArray);
        });
      console.log("Tarea eliminada");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (ev) => {
    setTareaNombre(ev.target.value);
  };

  const setValorEstrellasHandle = (value) => {
    setTareaImportancia(value);
    return;
  };
  const handleAgregarTarea = async () => {
    try {
      await axios
        .post("https://txkwh4-8080.csb.app/Tareas/", {
          nombre: tareaNombre,
          estado: tareaEstado,
          importancia: tareaImportancia,
        })
        .then((res) => {
          setTareas([...tareas, res.data]);
        })
        .then(() => {
          setTareaNombre("");
        });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  

  const handleUpdateTarea = () => {
    return
  }

  const handleUpdateEstadoTarea = async (_id, estado) => {
    const nuevoeEstado = !estado;
    try { 
      await axios.put(`https://txkwh4-8080.csb.app/Tareas/${_id}`, {estado: nuevoeEstado}) } 
      catch (err) { console.log(err) }}

  useEffect(() => {
    getTasks();
  }, []); // Add an empty dependency array to run the effect only once


  return (
    <main className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full">
      <div className="flex flex-col  gap-2 items-center justify-center overflow-y-auto">
        <h1 className=" text-3xl">To do list</h1>
        <div className="flex gap-4">
          <div className=" flex">
            <input
              type="text"
              placeholder="Ingresar Tarea"
              className=" text-right rounded"
              onChange={handleInput}
              value={tareaNombre}
            />
          </div>
          <button
            onClick={handleAgregarTarea}
            className="border px-2 rounded text-white hover:text-black hover:bg-white bg-black"
          >
            {" "}
            Agregar tarea
          </button>
        </div>
        <Stars valorEstrellas={setValorEstrellasHandle} />

        <div className=" mt-5 justify-between grid grid-cols-2 gap-6 ">
          {tareas?.map((t) => {
            return (
              <div
                key={t.nombre}
                className={`flex gap-2 mt-2 flex-col border border-green-700 p-4 rounded-md shadow ${t.estado ? "bg-green-300": "bg-white/40"} `}
              >
                <div></div>
                <div className="flex justify-between text-black">
                  <div className="">
                    <span className=" font-semibold">{t.nombre}</span>
                  <p>
                   Esta es la descripcion de la tarea
                  </p>
                  </div>
                  <div className="text-gray-600 static cursor-pointer flex gap-2 flex-col">
                    <button
                    onClick={() => {
                      handleUpdateEstadoTarea(t._id, t.estado);
                    }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 hover:text-green-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        //deleteTask(t._id);
                      }}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 ml- mt-[2px] hover:text-blue-500 cursor-pointer static"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => {
                        //deleteTask(t._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 hover:text-red-400 cursor-pointer static"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-white">
                  
                </div>
              </div>
            ); // Use curly braces to interpolate 't.nombre'
          })}
        </div>
      </div>
      <div></div>
    </main>
  );
}
