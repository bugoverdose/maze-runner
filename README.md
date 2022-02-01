# Maze Runner

- 임의로 생성되는 미로에서 탈출하는 게임 사이트
- canvas에 그려지는 미로의 패턴은 BFS 알고리즘을 통해 임의로 결정
- 5x5 ~ 25x25 크기의 정사각형 미로 생성
- 화면의 버튼 혹은 키보드 조작을 통해 빨간원을 상하좌우로 조작
- 빨간원이 우측 하단의 파란칸에 도달할 때까지의 경과시간 및 이동한 횟수를 기록

## TODO

- [ ] reset position 기능 추가 여부 고려 : 미로 전체를 다시 만들지 말고, 사용자 위치, 시간, 이동거리만 리셋
- [ ] 미로 크기별 최고점수 기록

## 참고사항

- listener belongs to the initial render and is not updated on subsequent rerenders.
  - useRef : 이벤트리스너 내부에서는 useRef에 업데이트된 현재 state값을 저장하여 접근
  - 데이터를 호출하는 custom getter 함수를 사용하는 경우 구현방식에 따라 lagging 문제 존재.
