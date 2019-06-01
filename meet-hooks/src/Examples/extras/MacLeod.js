import React, {useEffect, useRef} from 'react';
import '../../App.css';
import ScowlingImmortal from './MacLeod.png'

const MacLeod = ({qty}) => {
  const highlanderHolderRef = useRef()
  const appendHighlander = () => {
    const newImg = document.createElement('img')
    newImg.setAttribute('class', 'MacLeod')
    newImg.setAttribute('src', ScowlingImmortal)
    newImg.setAttribute('style', `left: ${(Math.random() - 0.05) * window.innerWidth}px;`)
    highlanderHolderRef.current.appendChild(newImg);
  }
  useEffect(() => {
    appendHighlander()
  })
  return <div
    id="highlanderHolder"
    ref={highlanderHolderRef}
  />
}

export default MacLeod