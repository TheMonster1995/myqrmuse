import React from 'react';
import Features from './Features';
import Intro from './Intro';
import KnowMore from './KnowMore';
import MainLanding from './MainLanding';
import Stats from './Stats';

const Landing: React.FC = () => {
  return (
    <>
      <MainLanding />
      <Intro />
      <Stats />
      <Features />
      <KnowMore />
    </>
  )
}

export default Landing;
