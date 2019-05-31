import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import LifeWithoutHooks from './Examples/LifeWithoutHooks';
import Thingamabob from './Examples/Example01';
import Parent from './Examples/Example02';
import Highlander from './Examples/Highlander'
import GraduallyScreamierButton from './Examples/GraduallyScreamierButton'
import ThousandsOfScreamingCats from './Examples/ThousandsOfScreamingCats'
import TheEverlastingComponent from './Examples/TheEverlastingComponent' 
import RealExamplesHaveCurds from './Examples/RealExamplesHaveCurds'
import EffectUser from './Examples/Example05'
import EffectUser2 from './Examples/Example06'

import './App.css';

const App = () => {
  return (
    <Router>
        <Link to="/LifeWithoutHooks">😢</Link>
        <Link to="/Highlander">⚡️</Link>
        <Link to="/GraduallyScreamierButton">😱</Link>
        <Link to="/ThousandsOfScreamingCats">🙀</Link>
        <Link to="/TheEverlastingComponent">🌌</Link>
        <Link to="/RealExamplesHaveCurds">🧀</Link>
        <hr />
        <Route exact path="/" component={null} />
        <Route path="/LifeWithoutHooks" component={LifeWithoutHooks} />
        <Route path="/Highlander" component={Highlander} />
        <Route path="/GraduallyScreamierButton" component={GraduallyScreamierButton} />
        <Route path="/ThousandsOfScreamingCats" component={ThousandsOfScreamingCats} />
        <Route path="/TheEverlastingComponent" component={TheEverlastingComponent} />
        <Route path="/RealExamplesHaveCurds" component={RealExamplesHaveCurds} />
    </Router>
  );
}

export default App;
