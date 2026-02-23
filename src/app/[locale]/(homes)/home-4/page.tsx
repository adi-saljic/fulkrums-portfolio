import React from 'react';
import { Metadata } from 'next';
import HomeFourMain from '@/components/pages/homes/home-4';

export const metadata: Metadata = {
  title: "Fulkrums - Digital Agency",
};

const HomePageFour = () => {
  return (
    <HomeFourMain/>
  );
};

export default HomePageFour;