import React from 'react';
import Header from '../../molecules/Navigation/Header';
import ProblemList from '../../molecules/Problem/ProblemList';
import Footer from '../../molecules/Navigation/Footer';

const index = () => (
  <div className="min-h-screen w-full flex flex-col">
    <Header className="bg-white" />
    <main className="flex flex-col justify-center items-center flex-grow p-10 ">
      <ProblemList />
    </main>
    <Footer />
  </div>
);

export default index;
