# Maze Runner

- 임의로 생성되는 미로에서 탈출하는 게임 사이트
- canvas에 그려지는 미로의 패턴은 BFS 알고리즘을 통해 임의로 결정
- 5x5 ~ 25x25 크기의 정사각형 미로 생성
- 화면의 버튼 혹은 키보드 조작을 통해 빨간원을 상하좌우로 조작
- 빨간원이 우측 하단의 파란칸에 도달할 때까지의 경과시간 및 이동한 횟수를 기록

## TODO

- [ ] fix responsive design & layout
- [ ] open graph tags for sharing links
- [ ] reset position 기능 : 미로 전체를 다시 만들지 말고, 사용자 위치, 시간, 이동거리만 리셋
- [ ] 미로 크기별 최고점수 기록 기능

## 참고사항

- 핵심은 화면에 실시간으로 재렌더링되어야 하는 정보와 변하더라도 내부적인 연산에서만 사용되는 정보를 구분하는 것

- listener belongs to the initial render and is not updated on subsequent rerenders.
  - 원시 타입 vs 객체의 차이를 통해 해결해야 함.
  - 특정 객체의 속성으로 데이터를 저장하고, 객체에 대한 참조값을 함수에 전달 => 객체의 속성을 읽도록 하면 매번 업데이트된 데이터 사용 가능.
  - cf) useRef : html element에 대한 reference를 이벤트리스너 내부에 설정하여 구현 가능. 일반적인 데이터에서는 굳이 불필요.
