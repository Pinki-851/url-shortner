'use client';

import { Close } from '@/assets/close';
import { API, BASE_URL } from '@/constants/base-url';
import { Fragment, useState } from 'react';

export function ShortnerView() {
  const [inputVal, setInputVal] = useState<string>('');
  const [id, setID] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);

  async function handleChange() {
    console.log('input');
    setLoading(true);
    const res = await fetch(API.URL, {
      method: 'POST',
      body: JSON.stringify({ url: inputVal }),
      headers: { 'Content-Type': 'application/json' },
    });
    const finalRes = await res.json();
    setID(finalRes?.id);
    setLoading(false);
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
  return (
    <Fragment>
      <div className='flex justify-center  w-full h-full pt-[10rem] sm:pt-[20rem]'>
        <div className='relative w-max'>
          <input
            type='text'
            className='w-[30rem] sm:w-[50rem] h-[4.8rem] pr-[4rem] bg-white rounded-[.8rem] focus-visible:outline-none focus-visible:ring-fuchsia-600 active:ring-fuchsia-600 active:ring-2 focus-visible:ring-2 p-[1rem] text-fuchsia-600 text-[1.4rem]'
            onChange={e => {
              setInputVal(e.target.value);
            }}
            onKeyDown={e => {
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
      <div className='flex flex-col gap-[.8rem] justify-center flex-wrap items-center w-[30rem] sm:w-[50rem] h-[20rem] mx-auto mt-[1rem] text-[1.6rem] bg-white rounded-[.8rem]'>
        {loading ? (
          <p>loading....</p>
        ) : (
          <>
            <p className='px-[2rem]'>
              {id === '' ? 'Please upload your url' : BASE_URL + API.URL + `/${id}`}
            </p>
            {id !== '' && (
              <button
                onClick={() => {
                  handleCopy(BASE_URL + API.URL + `/${id}`);
                  setCopy(true);
                  setTimeout(() => {
                    setCopy(false);
                  }, 1000);
                }}
                className='p-[1rem] hover:bg-fuchsia-200/70  rounded-[.8rem]'
              >
                {copy ? 'copied' : 'copy'}
              </button>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}
