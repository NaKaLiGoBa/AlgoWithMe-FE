import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const index = () => {
  const [value, setValue] = React.useState('**Hello world!!!**');
  return (
    <div className="w-[800px]">
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
};

export default index;
