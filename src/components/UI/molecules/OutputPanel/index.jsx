import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../atoms/Input/Button';
import postCodeTest from '../../../../utils/api/v1/code/postCodeTest';
import postCodeSubmit from '../../../../utils/api/v1/code/postCodeSubmit';
import { setTestcases } from '../../../../store/problemSlice';

function TestCasesForm({ testcases, hasRun = false }) {
  return (
    <div>
      {testcases.map((testcase, index) => (
        <div key={testcase.number} className="bg-gray-100 flex flex-col gap-2 p-4">
          <div>
            {hasRun && (
              <div>
                <h2>
                  {testcase.isAnswer ? (
                    <span className="text-green-600 text-lg">
                      ✅ 정답입니다{' '}
                    </span>
                  ) : (
                    <span className="text-rose-600 text-lg">
                      ❌ 오답입니다{' '}
                    </span>
                  )}
                </h2>
              </div>
            )}
            <h2>테스트 케이스 {testcase.number}</h2>
          </div>
          <div>
            <h3>입력값</h3>
            {testcase.inputs.map((input) => (
              <div className="p-4">
                {input.name}: {input.value}
              </div>
            ))}
            <h3>예상값</h3>
            <div className="p-4">{testcase.expected}</div>
            {hasRun && (
              <div>
                <h3
                  className={`${
                    testcase.isAnswer ? 'text-green-600' : 'text-rose-600'
                  }`}
                >
                  출력값
                </h3>
                <div
                  className={`p-4 ${
                    testcase.isAnswer ? 'text-green-600' : 'text-rose-600'
                  }`}
                >
                  {testcase.output}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  const problemNumber = useSelector((state) => state.problem.number);
  const { problemId } = useParams();
  const dispatch = useDispatch();
  const testcases = useSelector((state) => state.problem.testcases);
  const [hasRun, setHasRun] = useState(false);

  const handleClickRunButton = () => {
    const editorState = JSON.parse(
      localStorage.getItem(`editorState_${problemNumber}`),
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
      localStorage.getItem(`editorState_${problemNumber}`),
    );
    const request = {
      language: editorState.currentLanguage,
      code: editorState[editorState.currentLanguage],
    };
    postCodeSubmit(problemId, request).then((response) => {
      alert(`정답인가요? ${response.data.isAnswer}`);
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
