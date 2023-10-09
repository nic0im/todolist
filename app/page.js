"use client";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [tareaId, setTareaId] = useState("");
  const [tareaNombre, setTareaNombre] = useState("");
  const [tareaEstado, setTareaEstado] = useState(false);
  const [tareaImportancia, setTareaImportancia] = useState(1);

  const getTasks = async () => {
    try {
      const response = await axios.get("https://txkwh4-8080.csb.app/Tareas",);
      setTareas(response.data); // Assuming the tasks are returned as an array in the response
    } catch (err) {
      console.error(err);
    }
  };
  const deleteTask = async () => {
    try {
      await axios.delete(`https://txkwh4-8080.csb.app/Tareas/${_id}`);
      console.log("Tarea eliminada");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = () => {
    setTareaNombre(ev.target.value);
  };

  useEffect(() => {
    getTasks();
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <main className="">
      <div className="flex flex-col h-screen gap-2 items-center justify-center">
        <h1 className=" text-3xl">To do list</h1>
        <div className="flex gap-4">
          <div className=" flex">
            <input
              type="text"
              placeholder="Ingresar Tarea"
              className=" text-right rounded"
              onChange={handleInput}
            />
          </div>
          <button className="border px-2 rounded text-white hover:text-black hover:bg-white bg-black">
            {" "}
            Agregar tarea
          </button>
        </div>

        <div className=" mt-5">
          {tareas?.map((t) => {
            return (
              <div
                key={t.nombre}
                className="flex gap-2 mt-2 justify-between flex-col"
              >
                <div className="flex">
                  <div
                    className={`${
                      t.estado
                        ? "text-green-400 line-through"
                        : " text-orange-400"
                    }`}
                  >
                    {t.nombre}
                  </div>
                  <div className="text-gray-600 static cursor-pointer flex gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 ml-3 hover:w-6 hover:h-6 hover:text-white cursor-pointer static"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
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
                        className="w-5 h-5 hover:w-6 hover:h-6 hover:text-white cursor-pointer static"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
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
