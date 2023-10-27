import React, { useState } from 'react';
import IDETemplate from '../../UI/templates/IDETemplate';

import constantProblem from './constant';

const index = () => {
  const [problem, setProblem] = useState(constantProblem);

  return <IDETemplate problem={problem} />;
};

export default index;
