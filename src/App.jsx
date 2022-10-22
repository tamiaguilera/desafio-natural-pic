import "./styles.css";

import { Context } from './context/context.js'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Favoritos from "./views/Favoritos";


export default function App() {
  const endpoint = "/fotos.json";

  const [fotos, setFotos]= useState([])
  const [favoritos, setFavoritos] = useState ([])

  const handleFavoritos = (fotos)=> {
    const enFavoritos = favoritos.includes(fotos)

    if(enFavoritos) {
      const favoritosActualizados = favoritos.filter((favorito)=> favorito != fotos)
      setFavoritos(favoritosActualizados)
    } else{
      const favoritosActualizados = [...favoritos]
      favoritosActualizados.push(fotos)
      setFavoritos(favoritosActualizados)
    }

}
  const globalState = { fotos, favoritos, handleFavoritos}

  useEffect(()=>{
    fetch(endpoint)
      .then((res)=> res.json())
      .then((json)=> {
        console.log(json.photos)
        setFotos(json.photos)
      })
      .catch((e)=> console.log(e))
  },[])

  return (
    <div className="App">
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>

    </div>
  );
}
