'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Page({ params }) {
    console.log(params.id)
    const cep = parseInt(params.id)
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
            console.error('Erro na requisição:', error)
            setData({ error: 'CEP Inválido'})
        })
    }, [cep])

    console.log(data)

    if (data.error || data.erro) {
        return (
            <div className="flex flex-col justify-center h-screen bg-[#1f2937] text-white font-bold items-center gap-4">
                <h1>CEP não encontrado</h1>
                <Link 
                    href="/" 
                    className="bg-blue-700 px-8 py-3 rounded-lg font-bold text-white text-lg hover:bg-blue-800 transition-all duration-300 ease-in-out"
                    >
                    Buscar outro CEP
                </Link>
            </div>
        )
    }

    return (
        <main className="flex flex-col justify-center items-center h-screen bg-[#1f2937] text-white font-bold">
            <div className="flex flex-col py-10">
                <h1 className="text-2xl font-bold">CEP: {data.cep}</h1>
                <p>Logradouro: {data.logradouro}</p>
                <p>Bairro; {data.bairro}</p>
                <p>Cidade: {data.localidade}</p>
                <p>EStado: {data.uf}</p>
            </div>
            <div className="">
                <Link 
                href="/"
                className="bg-blue-700 px-8 py-3 rounded-lg font-bold text-white text-lg hover:bg-blue-800 transition-all duration-300 ease-in-out">
                    Buscar outro CEP
                </Link>
            </div>
        </main>
    )
}