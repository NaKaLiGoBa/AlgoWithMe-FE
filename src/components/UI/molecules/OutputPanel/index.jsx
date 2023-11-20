import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../atoms/Input/Button';
import postCodeTest from '../../../../utils/api/v1/code/postCodeTest';
import postCodeSubmit from '../../../../utils/api/v1/code/postCodeSubmit';
import { setTestcases } from '../../../../store/problemSlice';

const getButtonText = (hasRun, testcase) => {
  if (!hasRun) {
    return `Case ${testcase.number}`;
  }

  return testcase.answer
    ? `✅ Case ${testcase.number}`
    : `❌ Case ${testcase.number}`;
};

const getButtonBorder = (hasRun, testcase) => {
  if (!hasRun) {
    return ``;
  }

  return testcase.answer
    ? `ring ring-green-600`
    : `ring ring-rose-600`;
};

function TestCasesForm({ testcases, hasRun = false }) {
  // 첫 번째 테스트 케이스를 기본적으로 활성화합니다.
  const [activeCaseNumber, setActiveCaseNumber] = useState(
    testcases[0]?.number,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {testcases.map((testcase) => (
          <div>
            <button
              type="button"
              key={testcase.number}
              className={`py-1 px-2 text-sm rounded-md ${
                activeCaseNumber === testcase.number
                  ? 'bg-slate-300'
                  : 'bg-slate-200'
              } ${getButtonBorder(hasRun, testcase)}`}
              onClick={() => setActiveCaseNumber(testcase.number)}
            >
              {getButtonText(hasRun, testcase)}
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-2">
        {testcases
          .filter((testcase) => testcase.number === activeCaseNumber)
          .map((testcase) => (
            <div key={testcase.number}>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-sm text-gray-400">입력값</h3>
                  {testcase.inputs.map((input) => (
                    <div className="p-2 m-2 bg-slate-100 rounded-md text-gray-500">
                      {input.name}= {input.value}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">예상값</h3>
                  <div className="p-2 m-2 bg-slate-100 rounded-md text-gray-500">
                    {testcase.expected}
                  </div>
                </div>
                {hasRun && (
                  <divc>
                    <h3 className="text-sm text-gray-400">출력값</h3>
                    <div
                      className={`p-2 m-2 bg-slate-100 rounded-md ${
                        testcase.answer ? 'text-green-600' : 'text-rose-600'
                      }`}
                    >
                      {testcase.output}
                    </div>
                  </divc>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function Index() {
  const { problemId } = useParams();
  const dispatch = useDispatch();
  const testcases = useSelector((state) => state.problem.testcases);
  const [hasRun, setHasRun] = useState(false);

  const handleClickRunButton = () => {
    const editorState = JSON.parse(
      localStorage.getItem(`editorState_${problemId}`),
    );
    const request = {
      language: editorState.currentLanguage,
      code: editorState[editorState.currentLanguage],
    };

    postCodeTest(problemId, request)
      .then((response) => response.data)
      .then((data) => {
        dispatch(setTestcases(data));
        setHasRun(true);
      });
  };

  const handleClickSubmitButton = () => {
    const editorState = JSON.parse(
      localStorage.getItem(`editorState_${problemId}`),
    );
    const request = {
      language: editorState.currentLanguage,
      code: editorState[editorState.currentLanguage],
    };
    postCodeSubmit(problemId, request).then((response) => {
      alert(`정답인가요? ${response.data.answer}`);
    });
  };

  return (
    <div className="p-2 m-1 bg-white rounded-xl flex flex-col justify-between">
      <div className="overflow-y-auto mb-2" />
      <TestCasesForm hasRun={hasRun} testcases={testcases} />
      <div className="flex flex-row justify-between items-center">
        <h2>Console</h2>
        <div className="flex flex-row justify-end gap-4">
          <Button
            className="rounded-xl px-4 py-2"
            onClick={handleClickRunButton}
          >
            실행
          </Button>
          <Button
            className="rounded-xl px-4 py-2 bg-green-500 hover:bg-green-600"
            onClick={handleClickSubmitButton}
          >
            제출
          </Button>
        </div>
      </div>
    </div>
  );
}
