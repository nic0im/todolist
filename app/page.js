"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function Home() {
  const [tareas, setTareas] = useState([]); 
  const [tareaId, setTareaId] = useState("");
  const [tareaNombreAdd, setTareaNombreAdd] = useState("");
  const [tareaNombre, setTareaNombre] = useState("");
  const [tareaEstado, setTareaEstado] = useState(false);
  const [tareaImportancia, setTareaImportancia] = useState(0);
  const [tareaDescripcion, setTareaDescripcion] = useState();
  const [debounced, setDebounced] = useState("");

  const router = useRouter();
  //Debounce update//////////////////////////////////////////
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(tareaDescripcion);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [tareaDescripcion, tareaNombre]);

  useEffect(() => {;
    handleUpdate(tareaId);
  }, [debounced]);
  /////////////////////////////////////////////////////////

  ///////OBTENER TODAS LAS TAREAS//////////////
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

  useEffect(() => {
    getTasks();
  }, []); // Add an empty dependency array to run the effect only once
 ////////////////////////////////////////////////////////////////////

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
    setTareaNombreAdd(ev.target.value);
  };

  const setValorEstrellasHandle = (value) => {
    setTareaImportancia(value);
    return;
  };

  const handleAgregarTarea = async () => {
    try {
      await axios
        .post("https://txkwh4-8080.csb.app/Tareas/", {
          nombre: tareaNombreAdd,
          estado: tareaEstado,
          importancia: tareaImportancia,
          descripcion: tareaDescripcion,
        })
        .then((res) => {
          setTareas([...tareas, res.data]);
        })
        .then(() => {
          setTareaNombreAdd("");
        });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleUpdateEstadoTarea = async (_id, estado) => {
    const nuevoeEstado = !estado;
    try {
      await axios
        .put(`https://txkwh4-8080.csb.app/Tareas/${_id}`, {
          estado: nuevoeEstado,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (_id) => {
    if (!_id) {
      return;
    }
    const taskToUpdate = {
      nombre: tareaNombre,
      importancia: tareaImportancia,
      descripcion: tareaDescripcion,
    };

    try {
      console.log("handle update working");
      await axios
        .put(`https://txkwh4-8080.csb.app/Tareas/${_id}`, taskToUpdate)
        .then(() => {
          console.log(
            "Actualizado--- reemplazar por una notificacion y reasignar a objetos locales"
          );
        });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };


  return (
    <main className="bg-gradient-to-b from-gray-300/30 to-black/40 h-full px-6">
      <div className="flex flex-col gap-2 overflow-y-auto">
        <div className="border border-red-400 p-4 flex justify-between mt-4">
          <div className="border border-orange-600 text-4xl">
            Proyecto nombre
          </div>
          <div className="border border-blue-800 w-fit flex mr-5">
            <div className="flex gap-4">
              <div className=" flex">
                <input
                  type="text"
                  placeholder="Ingresar Tarea"
                  className=" text-right rounded"
                  onChange={handleInput}
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
          </div>
        </div>
        <div className="flex justify-between px-4">
        <div className="flex flex-col">
          <label for="frutas">Filtrar por:</label>
            <select id="filtros" name="filtro">
              <option value="recientes">Recientes</option>
              <option value="importancia">Importancia</option>
            </select>
          </div>
          <div className="border border-black p-2 bg-black/10 rounded-md mr-6">
            Mostrar Completadas
          </div>
         
        </div>
        <div className=" justify-between grid grid-cols-2 border border-green-700">
          {tareas?.map((t) => {
            return (
              <div //DIV PRINCIPAL
                key={t.nombre}
                className={`flex gap-2 mt-2  p-4 rounded-md shadow-md justify-between w-[700px] h-[200px] ${
                  t.estado
                    ? "hover:bg-green-400/60 bg-gradient-to-t from-green-300/40 to-green-300/80 "
                    : "bg-white/40 "
                } `}
              >
                <div //DIV NOMBRE TAREA y DESCRIPCION
                  className="flex flex-col w-full "
                >
                  <textarea
                    className=" font-semibold text-xl bg-transparent"
                    defaultValue={t.nombre}
                    onChange={(ev) => {
                      setTareaNombre(ev.target.value);
                      setTareaDescripcion(t.descripcion);
                      return setTareaId(t._id);
                    }}
                  />
                  <textarea
                    className=" bg-transparent h-full w-full"
                    defaultValue={t.descripcion}
                    //AGREGAR SETVALUE DESPUES DE UNOS SEGUNDOS Y HANDLE UPLOAD
                    onChange={(event) => {
                      setTareaDescripcion(event.target.value);
                      setTareaNombre(t.nombre);
                      return setTareaId(t._id);
                    }}
                  />
                </div>
                <div //DIV BUTTONS
                >
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
                        deleteTask(t._id);
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
              </div>
            ); // Use curly braces to interpolate 't.nombre'
          })}
        </div>
      </div>
      <div></div>
    </main>
  );
}
