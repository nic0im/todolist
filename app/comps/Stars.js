import { useState } from "react";

export default function Stars(props) {
  const [importancia, setImportancia] = useState( 0);
  const [baja, setBaja] = useState(0)
  const [media, setMedia] = useState(0)
  const [alta, setAlta] = useState(0)

  const handleStar = (ev) => {
    setBaja(1);
    setMedia(0);
    setAlta(0);
    setImportancia(1);
    props.valorEstrellas(1); // Pasa el valor directamente en lugar de importancia
  };
  
  const handleSecondStar = (ev) => {
    setBaja(0);
    setMedia(1);
    setAlta(0);
    setImportancia(2);
    props.valorEstrellas(2); // Pasa el valor directamente en lugar de importancia
  };
  
  const handleThirdStar = (ev) => {
    setBaja(0);
    setMedia(0);
    setAlta(1);
    setImportancia(3);
    props.valorEstrellas(3); // Pasa el valor directamente en lugar de importancia
  };
  

  return (
  <div className="flex opacity-90 text-neutral-950 fill-transparent stroke-black">
        <div className="">
            <button onClick={handleStar} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="black" className={ baja ? "h-5 w-5 fill-green-300" : "h-5 w-5 fill-black/10" }>
                
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            </button>
        </div>
        <div className="">
            <button onClick={handleSecondStar}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="black" className={ media ? "h-5 w-5 fill-orange-300" : "h-5 w-5 fill-black/10" }>
                
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            </button>
        </div>
        <div className="">
            <button  onClick={handleThirdStar} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  stroke="black" className={ alta ? "h-5 w-5 fill-red-300" : "h-5 w-5 fill-black/10" }>
                
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            </button>
        </div>
    </div>
  );
}
