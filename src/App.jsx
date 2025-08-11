import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Icon = ({ placeholderContent: placeholderContent }) => {
  return (
    <div className='icon-container'>
      <h3>{placeholderContent}</h3>
    </div>
  )
}

//Placeholder items
const App = () => {
  return (
    <>
    <div className="hbox">
      <div className="hbox">
        <Icon placeholderContent="00" />
        <Icon placeholderContent="000" />
      </div>
      <div className="hbox">
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
      </div>
      <div className="hbox">
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
      </div>
      <div className="hbox">
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
      </div>
      <div className="hbox">
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
      </div>
      <div className="hbox">
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
        <Icon placeholderContent="A" />
        <Icon placeholderContent="B" />
        <Icon placeholderContent="C" />
      </div>
    </div>
    </>
  )
}

export default App
