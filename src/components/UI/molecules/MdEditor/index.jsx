import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const index = ({ content, setContent }) => (
  <div className="w-[1200px]">
    <MDEditor value={content} onChange={setContent} height={500}/>
  </div>
);

export default index;
