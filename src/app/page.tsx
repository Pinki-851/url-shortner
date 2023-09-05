"use client"
import { ShortnerView } from '@/components/features/shortner-view'
import { MovingBackground } from '@/components/moving-background'

export default function Home() {
  // console.log('check');
  return (<main>
    <MovingBackground/>
    <ShortnerView/>
  </main>
  )
}
