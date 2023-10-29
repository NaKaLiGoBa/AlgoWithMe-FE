const problem = {
  number: 0,
  status: '성공',
  title: 'This is problem constant set',
  acceptance: 66.6,
  difficulty: '쉬움',
  description: 'string',
  defaultCodes: {
    java: 'this is from constant java',
    python: 'this is from constant python',
    javascript: 'console.log("Hello, World!");',
  },
  availableLanguage: ['Java'],
  testcases: [
    {
      number: 0,
      inputs: [
        {
          name: 'this is from constant set',
          value: 'string',
        },
      ],
      expected: 'string',
    },
  ],
  tags: ['DFS'],
};

export default problem;
