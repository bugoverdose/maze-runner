# Maze Runner

- 임의로 생성되는 미로에서 탈출하는 게임 사이트
- BFS 알고리즘을 canvas에 적용시켜 임의로 미로 생성

## TODO

- 플레이어 이동할 때마다 매번 canvas 전체를 다시 그리지 말고, 플레이어와 그 이동경로만 색칠
- 미로 크기별 최고점수 기록
- Deployment: ghpage &/or chrome extention

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
