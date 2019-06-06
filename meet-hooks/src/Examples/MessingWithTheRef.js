import React, {useState, useEffect, useLayoutEffect, useRef, useImperativeHandle} from 'react';
import usePrintOnce from './usePrintOnce'
import '../App.css';

const description = `*🏈 MessingWithTheRef*
shows the how refs handle values over time.`

const MessingWithTheRef = React.forwardRef((props, ref) => {
  usePrintOnce(description);
  console.log("Render")

  // Shows that ref can be initialized to a useState's initial state
  const [ball] = useState('🏈')
  const theRef = useRef(ball);
  console.log('The ball:', theRef.current)
  useImperativeHandle(ref, () => theRef)
  // Shows that once a ref is defined, it's ready to be mutated and used
  theRef.current = '🥔'
  const [alsoTheBall] = useState(theRef.current)
  console.log('Also the ball:', alsoTheBall);

  // Shows that our ref is defined before the browser paints
  useLayoutEffect(() => {console.log('useLayout: ', theRef.current.value)})

  // Shows that after render, the ref's got its element
  // Will break on subsequent render because theRef.current is now a 🥔
  // and not an input element. It doesn't get reset on the new render.
  useEffect(() => {
    theRef.current.setRangeText('🧨')
    return () => console.log('Unmount', theRef.current.value)
  })

  return <div><input ref={theRef} defaultValue="🐡"/></div>
})

const Destroyer = () => {
  const childRef = useRef()
  console.log(childRef.current)
  const [dead, setDead] = useState(false)
  return <>
    {dead ? null : <MessingWithTheRef ref={childRef} />}
    <button onClick={() => {
      console.log("KILL!")
      dead ? setDead(false) : setDead(true)
      }
    }>
      {dead ? 'REVIVE' : 'KILL'}
    </button>
    <button onClick={() => console.log(childRef.current)}>Print Ref</button>
  </>
}

export default Destroyer