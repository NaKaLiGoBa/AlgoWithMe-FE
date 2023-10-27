const problem = {
  number: 0,
  status: '성공',
  title: '구슬 탈출 2',
  acceptance: '66.6',
  difficulty: '쉬움',
  description:
    '스타트링크에서 판매하는 어린이용 장난감 중에서 가장 인기가 많은 제품은 구슬 탈출이다. 구슬 탈출은 직사각형 보드에 빨간 구슬과 파란 구슬을 하나씩 넣은 다음, 빨간 구슬을 구멍을 통해 빼내는 게임이다.\n보드의 세로 크기는 N, 가로 크기는 M이고, 편의상 1×1크기의 칸으로 나누어져 있다. 가장 바깥 행과 열은 모두 막혀져 있고, 보드에는 구멍이 하나 있다. 빨간 구슬과 파란 구슬의 크기는 보드에서 1×1크기의 칸을 가득 채우는 사이즈이고, 각각 하나씩 들어가 있다. 게임의 목표는 빨간 구슬을 구멍을 통해서 빼내는 것이다. 이때, 파란 구슬이 구멍에 들어가면 안 된다.\n이때, 구슬을 손으로 건드릴 수는 없고, 중력을 이용해서 이리 저리 굴려야 한다. 왼쪽으로 기울이기, 오른쪽으로 기울이기, 위쪽으로 기울이기, 아래쪽으로 기울이기와 같은 네 가지 동작이 가능하다.\n각각의 동작에서 공은 동시에 움직인다. 빨간 구슬이 구멍에 빠지면 성공이지만, 파란 구슬이 구멍에 빠지면 실패이다. 빨간 구슬과 파란 구슬이 동시에 구멍에 빠져도 실패이다. 빨간 구슬과 파란 구슬은 동시에 같은 칸에 있을 수 없다. 또, 빨간 구슬과 파란 구슬의 크기는 한 칸을 모두 차지한다. 기울이는 동작을 그만하는 것은 더 이상 구슬이 움직이지 않을 때 까지이다.',
  templates: {
    java: 'public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}',
    python:
      'def hello_world():\n\tprint("Hello, World!")\n\nif __name__ == "__main__":\n\thello_world()',
    javascript: 'console.log("Hello, World!");',
  },
  testcases: [
    {
      number: 0,
      inputs: [
        {
          name: 'test name',
          value: 'test value',
        },
      ],
      expected: 'test expected',
    },
    {
      number: 1,
      inputs: [
        {
          name: 'test1 name',
          value: 'test1 value',
        },
      ],
      expected: 'test1 expected',
    },
    {
      number: 2,
      inputs: [
        {
          name: 'test2 name',
          value: 'test2 value',
        },
      ],
      expected: 'test2 expected',
    },
  ],
  tags: ['DFS', 'BFS', 'Backtracking'],
};

export default problem;
