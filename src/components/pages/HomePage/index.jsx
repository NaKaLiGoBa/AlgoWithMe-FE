import React from 'react';
import Navbar from '../../UI/molecules/Navigation/Navbar';
import ProblemList from '../../UI/molecules/Problem/ProblemList';
import Footer from '../../UI/molecules/Navigation/Footer';

const index = () => (
  <div className="min-h-screen w-full flex flex-col">
    <Navbar />
    <div className="flex-grow flex flex-col  justify-center">
      <ProblemList />
    </div>
    <Footer />
  </div>
);

export default index;
