import React from 'react';
import Header from '../../molecules/Navigation/Header';
import ProblemList from '../../molecules/Problem/ProblemList';
import Footer from '../../molecules/Navigation/Footer';
import DropdownMenu from '../../atoms/Input/Dropdown';

const index = () => (
  <div className="min-h-screen w-full flex flex-col">
    <Header />
    <main className="flex flex-col justify-center items-center flex-grow">
      <div className="flex flex-row gap-4 m-10">
        <DropdownMenu title="난이도" />
        <DropdownMenu title="상태" />
        <DropdownMenu title="태그" />
      </div>
      <ProblemList />
    </main>
    <Footer />
  </div>
);

export default index;
