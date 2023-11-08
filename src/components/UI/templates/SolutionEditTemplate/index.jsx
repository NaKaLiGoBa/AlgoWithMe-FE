import React, { useState } from 'react';
import MdEditor from '../../molecules/MdEditor';
import Button from '../../atoms/Input/Button';
import Input from '../../atoms/Input/Input';
import Header from '../../molecules/Navigation/Header';

// const
import contentTemplate from './contentTemplate';

const index = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = React.useState(contentTemplate);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <div className="flex flex-row justify-between items-baseline w-[800px] mb-4">
          <div className="w-3/5">
            <Input
              className="h-8 bg-white border-white focus:outline-none"
              placeholder="Enter your title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex flex-row gap-4">
            <Button className="bg-gray-400 px-4 rounded-lg">취소</Button>
            <Button className="bg-green-500 px-4 rounded-lg">완료</Button>
          </div>
        </div>
        <MdEditor content={content} setContent={setContent} />
      </div>
    </div>
  );
};

export default index;
