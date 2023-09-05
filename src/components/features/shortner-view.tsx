import { Close } from '@/assets/close';
import { Fragment, useEffect, useState } from 'react';

export  function ShortnerView() {
    const[inputVal,setInputVal]=useState("");

    useEffect(()=>{
      // console.log('use');
let time=setTimeout(()=>{handleChange()},2000);
return ()=>{
  clearTimeout(time)
};
    },[inputVal]);
    
    async function handleChange(){
      // console.log('input');
    const res= await fetch("",{method:"POST",body:"",headers:{      'Content-Type': 'application/json',
    }})
    const finalRes=await res.json()
    }
  return (<Fragment>

    <div className='flex justify-center  w-full h-full pt-[10rem] sm:pt-[20rem]'>

    <div className='relative w-max'>
    <input type='text' className='w-[30rem] sm:w-[50rem] h-[4.8rem] pr-[3rem] bg-white rounded-[.8rem] focus-visible:outline-none focus-visible:ring-fuchsia-600 active:ring-fuchsia-600 active:ring-2 focus-visible:ring-2 p-[1rem] text-fuchsia-600 text-[1.4rem]' onChange={(e)=>{    setInputVal(e.target.value);}} value={inputVal}/>
    <Close className={`absolute right-[1.6rem] top-1/3 text-fuchsia-500 cursor-pointer w-[1.6rem] h-[1.6rem] ${inputVal?.length>=1?"block":"hidden"}`} onClick={()=>{setInputVal("")}}/>
    </div>
    </div>
   {inputVal&& <div className='flex justify-center items-center w-[30rem] sm:w-[50rem] h-[20rem] mx-auto mt-[1rem] text-[1.6rem] bg-white rounded-[.8rem]'>{inputVal}</div>}
  </Fragment>
  )
}
