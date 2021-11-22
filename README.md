# Maze Runner

- 임의로 생성되는 미로에서 탈출하는 게임 사이트
- BFS 알고리즘을 canvas에 적용시켜 임의로 미로 생성
- 빨간원을 파란칸으로 이동시키기
  - 미로크기, 경과시간, 이동한 칸의 수 기록

## TODO

- reset position 기능 추가 여부 고려 : 미로 전체를 다시 만들지 말고, 사용자 위치, 시간, 이동거리만 리셋
- 플레이어 이동할 때마다 매번 canvas 전체를 다시 그리지 말고, 플레이어와 그 이동경로만 색칠
- 미로 크기별 최고점수 기록
- Deployment: chrome extention

## Debugging

- [x] 첫 화면 렌더링 시점에 목적지가 보이지 않는 현상
  - 미로 사이즈 설정의 문제. 아래와 함께 발생한 문제로 보임.
- [x] 미로 사이즈 변경시, 2번씩 생성해줘야 canvas 크기가 제대로 조절되는 현상
  - 임시방편: 미로 사이즈 변경하고 지도 생성시, useEffect로 자동으로 1번 더 생성해주도록 설정
- [x] 키보드 조작시 moveCount 값이 수정되지 않는 현상

  - 이벤트리스너에서는 변경된 state 값에 접근할 수 없기 때문에 useRef를 활용하여 접근하도록 수정.
  - 실제로 state 값을 수정해주는 \_setState도 호출하고, ref.current 값도 업데이트해주는 setState 함수를 별도로 정의.

- [x] 키보드 조작을 통해 목적지에 도달한 경우 게임이 종료되지 않는 현상

  - mazeSize state 값도 useRef로 접근해줘야 함.

- [x] 개발자도구로 input 태그의 type: number 속성을 제거한 경우 문자열 값을 받으면 parseInt 결과가 NaN로 사이트 전체 다운되는 현상.

  - 새로운 input value가 NaN이 될 경우, 현재 mazeSizeInput state 값을 변화시키지 않음. 입력값 무시.

- [x] 개발자도구로 input 태그의 min/max를 강제로 수정하면 미로 크기의 값이 5~25 범위의 값을 벗어날 수 있는 현상.

  - input 값 자체를 5~25로 제한할 경우 키보드로 직접 입력시 문제: 십의 자리 수로 1 혹은 2를 누르는 순간 바로 5가 되어버리는 문제
  - input 값은 NaN만 아니면 지속적으로 변하되, 실제로 input 값을 토대로 미로를 생성할 때 5~25 범위에 들어오도록 state 수정하여 미로 생성
