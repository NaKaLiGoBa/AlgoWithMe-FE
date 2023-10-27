import React from 'react';
import Header from '../../UI/molecules/Navigation/Header';
import ProblemList from '../../UI/molecules/Problem/ProblemList';
import Footer from '../../UI/molecules/Navigation/Footer';

const index = () => (
  <div className="min-h-screen w-full flex flex-col">
    <Header />
    {/* <div className="flex-grow flex flex-col  justify-center"> */}
    <div className="flex justify-center my-[150px]">
      <ProblemList />
    </div>
    <Footer />
  </div>
);

export default index;
