import React from 'react';
import '../App.css';

const Child = ({inheritance, name}) => {
  console.log(`${name} child: ${inheritance}`)
  return <p>{Array.from(new Array(inheritance)).map(() => '🍺')}</p>
}
const Parent = ({lifeSavings}) => {
  console.log(`Parent: ${lifeSavings}`)
  return <>
    <Child name="favorite" inheritance={lifeSavings - 1} />
    <Child name="idiot" inheritance={1} />
  </>
}

export default Parent
