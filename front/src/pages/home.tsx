import React from 'react'
import Header from '../components/Header'
import '../index.css'

const home = () => {
    return (
        <>
            <Header />
            //Imagen
            <div className="flex bottom-4 left-0 right-0 flex justify-center space-x-2">
            <h4>Label goes here</h4>
            <h1>Lorem Ipsum simply dummy</h1>
            <p>Welcome to Burger Bliss, where we take your cravings to a whole new level! Our mouthwatering burgers are made from 100% beef and are served on freshly baked buns. </p>
            </div>
        </>
    )
}

export default home