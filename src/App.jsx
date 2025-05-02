import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length , setlength] = useState(8);
  const[numberAllowed, setnumberAllowed] = useState(false)
  const[charAllowed, setcharAllowed]= useState(false);
  const [password,setpassword] = useState("")

  //ref hook

  const passwordRef = useRef(null)

 


  const passwordGenerator = useCallback(()=>{

    let pass = ""
    let str = 
    "ABCDEFGHIJHKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*(){}[]`~"
    }
    for (let i = 1; i<=length; i++) {
        let char = Math.floor (Math.random()*str.length + 1)  
        
        pass += str.charAt(char)
    }
    setpassword(pass)

  },
  [ length,numberAllowed,charAllowed,setpassword]
)
// important
const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,20)
  window.navigator.clipboard.writeText(password)
},
[password])

useEffect(()=>{
  passwordGenerator()
},
[length, numberAllowed, charAllowed, passwordGenerator]
)  
// passwordGenerator()

  return (
    <>
       
    <div className='max-w-md mx-auto shadow-md
    rounded-lg py-3 px-4 my-8 text-orange-500 bg-gray-700 w-full'>
       <h1 className=' text-white text-center'>
       Password Generator</h1>
       
       
       <div className='flex shadow rounded-lg  overflow-hidden bg-white mb-4'>
        <input type="text"
        value={password}
        placeholder='password'
        readOnly
        ref={passwordRef}
        className='outline-none w-full py-1 px-3 '
         />

         <button 
         onClick={copyPasswordToClipboard}
         className=' hover:scale-120 outline-none bg-blue-700 text-white
         px-3 py-0.5 shrink-0'>
          copy
         </button>

       </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={6}
          max={98}
          value={length}

          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label >Length:{length}</label>

        </div>

        <div>
        <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>
            {setnumberAllowed((prev) => !prev);

            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div>
        <input
          type='checkbox'
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>
            {setcharAllowed((prev) => !prev);

            }}
          />
          <label htmlFor="charInput">Character</label>
        </div>
        </div>
    </div>
    </>
  )
}

export default App
