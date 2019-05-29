import React, {useState, useEffect, useLayoutEffect} from 'react';
import '../App.css';

const EffectUser2 = () => {
  console.log("Render!")
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  useEffect(() => {
    console.log("Effect 1, always reruns", performance.now())
    return () => console.log("Cleanup 1, always", performance.now())
  })
  useEffect(() => {
    console.log("Effect 2, never reruns", performance.now())
    return () => console.log("Cleanup 2, on unmount", performance.now())
  }, [])
  useLayoutEffect(() => {
    console.log("Effect 4, useLayoutEffect", performance.now())
    return () => console.log("Cleanup 4, useLayoutEffect", performance.now())
  })
  useEffect(() => {
    console.log("Effect 3, depends on A", performance.now())
    return () => console.log("Cleanup 3, depends on A", performance.now())
  }, [a])
  return <>
    <button onClick={() => setA(a + 1)} >Increment A, {a}</button>
    <button onClick={() => setB(b + 1)} >Increment B, {a}</button>
  </>
}

const Destroyer = () => {
  const [dead, setDead] = useState(false)
  useEffect(() => {
    console.log("DESTROYER EFFECT!", performance.now())
    let listener;
    if("performance" in window){
      listener = window.addEventListener("load", ()=>{
        let paintMetrics = performance.getEntriesByType("paint");
        console.log("SLKDA")
        if(paintMetrics !== undefined && paintMetrics.length > 0){
          paintMetrics.forEach((paintMetric)=>{
            console.log(`${paintMetric.name}: ${paintMetric.startTime}`);
          });
        }
      });
    }
    return () => listener && listener.removeEventListener();
  }, [])
  return <>
    {dead ? null : <EffectUser2 />}
    <button onClick={() => {
      console.log("KILL!")
      dead ? setDead(false) : setDead(true)
      }
    }>
      {dead ? 'REVIVE' : 'KILL'}
    </button>
  </>
}

export default Destroyer