import React, {useState} from 'react';

import LifeWithoutHooks from './Examples/Example00';
import Thingamabob from './Examples/Example01';
import Parent from './Examples/Example02';
import Highlander from './Examples/Example03'
import GraduallyScreamierButton from './Examples/Example04'
import EffectUser from './Examples/Example05'
import EffectUser2 from './Examples/Example06'

import './App.css';

const App = () => {
  const [lifeSavings, setLifeSavings] = useState(10)
  const toil = () => setLifeSavings(lifeSavings + 1)
  return [
    <LifeWithoutHooks />,
    // <Thingamabob a="🥄" b="🍴"/>,
    // <hr />,

    // <Parent lifeSavings={lifeSavings} />,
    // <button onClick={toil}>Toil</button>,
    // <hr />,

    // <Highlander />,
    // <hr />,

    // <GraduallyScreamierButton />,
    // <hr />,
    
    // <EffectUser />,
    // <EffectUser2 />,
  ]
}

export default App;
