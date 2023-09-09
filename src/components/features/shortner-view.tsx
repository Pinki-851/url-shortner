'use client';

import { Close } from '@/assets/close';
import { API, BASE_URL } from '@/constants/base-url';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

export function ShortnerView() {
  const [inputVal, setInputVal] = useState<string>('');
  const [id, setID] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  console.log('router', router, pathname);

  // useEffect(() => {
  //   // console.log('use');
  //   let time = setTimeout(() => {
  //     handleChange();
  //   }, 2000);
  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, [inputVal]);

  async function handleChange() {
    console.log('input');
    const res = await fetch(API.URL, {
      method: 'POST',
      body: JSON.stringify({ url: inputVal }),
      headers: { 'Content-Type': 'application/json' },
    });
    const finalRes = await res.json();
    setID(finalRes?.id);
    console.log('finalRes', finalRes);
  }

  const handleCopy = async (text: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback behavior if clipboard API is not supported
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };
  console.log('url', BASE_URL + API.URL + `/${id}`);
  return (
    <Fragment>
      <div className='flex justify-center  w-full h-full pt-[10rem] sm:pt-[20rem]'>
        <div className='relative w-max'>
          <input
            type='text'
            className='w-[30rem] sm:w-[50rem] h-[4.8rem] pr-[4rem] bg-white rounded-[.8rem] focus-visible:outline-none focus-visible:ring-fuchsia-600 active:ring-fuchsia-600 active:ring-2 focus-visible:ring-2 p-[1rem] text-fuchsia-600 text-[1.4rem]'
            onChange={e => {
              // console.log('e-key', e?.key);

              setInputVal(e.target.value);
            }}
            onKeyDown={e => {
              console.log('e-key', e.key);
              if (e.key === 'Enter') {
                console.log('enter');
                handleChange();
              }
            }}
            value={inputVal}
          />
          <Close
            className={`absolute right-[1.6rem] top-1/3 text-fuchsia-500 cursor-pointer w-[1.6rem] h-[1.6rem] ${
              inputVal?.length >= 1 ? 'block' : 'hidden'
            }`}
            onClick={() => {
              setInputVal('');
              setID('');
            }}
          />
        </div>
      </div>
      {id !== '' && (
        <>
          <div className='flex justify-center flex-wrap items-center w-[30rem] sm:w-[50rem] h-[20rem] mx-auto mt-[1rem] text-[1.6rem] bg-white rounded-[.8rem]'>
            <p className='px-[2rem]'>{BASE_URL + API.URL + `/${id}`}</p>
            <button
              onClick={() => {
                handleCopy(BASE_URL + API.URL + `/${id}`);
              }}
            >
              copy
            </button>
          </div>
        </>
      )}
    </Fragment>
  );
}
