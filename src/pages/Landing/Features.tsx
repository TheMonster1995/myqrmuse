import React from 'react';
import SectionWrapper from './SectionWrapper';
import Feature from './Feature';

const Features: React.FC = () => {
  return (
    <SectionWrapper className="flex flex-wrap justify-between bg-[#06d6a0]">
      <Feature imgUrl="./abst1.png" title="Colorful Patterns" desc="Create QR codes with wacky designs" />
      <Feature imgUrl="./abst2.png" title="Smooth Scanning" desc="Scan codes with ease from any device" />
      <Feature imgUrl="./abst1.png" title="Share Your Creations" desc="Bring others into your fanciful world" />
      <Feature imgUrl="./abst2.png" title="Versatile Users" desc="From personal to business, the sky's the limit" />
      <Feature imgUrl="./abst1.png" title="Urban Adventures" desc="Navigate the city's fun with QR codes" />
      <Feature imgUrl="./abst2.png" title="Nature's Wonders" desc="Discover hidden gems and scenic landscapes" />
    </SectionWrapper>
  )
};

export default Features;
