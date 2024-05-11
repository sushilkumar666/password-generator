import { useCallback, useEffect, useRef, useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const reference = useRef(null);



  let option = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) option += "1234567890";
  if (characterAllowed) {
    option += "!@#$%^&*()-_=+[]{};:'\",.<>?/|`~";

    console.log('character checking')
  }


  const passwordGenerator = useCallback(() => {
    let pass = ""
    for (let i = 0; i < length; i++) {
      pass += option[Math.floor(Math.random() * (option.length + 1))]

    }
    console.log(option.length)
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed])

  const allowNumber = () => {
    setNumberAllowed(prev => !prev);
  }

  const allowCharacter = () => {
    console.log(' inside allow characer')
    setCharacterAllowed((prev) => !prev);
  }

  const copy = () => {
    let value = reference.current.value;
    reference.current.select();
    window.navigator.clipboard.writeText(value);
  }

  return (

    <>
      <input ref={reference} type="text" value={password} readOnly />
      <button onClick={passwordGenerator}>Generate</button> <button onClick={copy}>copy</button> <br />
      <input type="range" min="8" max="100" value={length} onChange={(e) => setLength(e.target.value)} />
      {length} <br />
      <input type="checkbox" onChange={allowNumber} /> Numbers
      <input type="checkbox" onChange={allowCharacter} /> Character
    </>
  )
}

export default App
