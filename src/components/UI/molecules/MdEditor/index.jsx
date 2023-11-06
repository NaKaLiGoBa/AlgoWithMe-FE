import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const index = ({ content, setContent }) => (
  <div className="w-[800px]">
    <MDEditor value={content} onChange={setContent} />
  </div>
);

export default index;
