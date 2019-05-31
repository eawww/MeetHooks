import React from 'react';
import '../App.css';

/** Example00: Life Without Hooks
 *  Demonstrates what happens when a functional component
 *  mutates a variable defined in its function.
 */

const LifeWithoutHooks = () => {
  console.log("Render")
  let numba = 0
  const makeNumbaGoUp = () => {
    numba += 1
    console.log(`Numba was incremented to ${numba}`)
  }
  return <button onClick={makeNumbaGoUp} >{numba}</button>
}

/** This only exists as an easy way to rerender the child
 *  I didn't want to use hooks in an example yet because
 *  spoilers so enjoy this class component for now.
 */
class Rerenderer extends React.Component {
  constructor() {
    // heck yeah, boilerplate!
    super()
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    this.forceUpdate()
  }
  render() {
    return <>
      <button onClick={this.onClick} >Rerender</button>
      <LifeWithoutHooks />
    </>
  }
}

export default Rerenderer