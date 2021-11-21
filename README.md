# Maze Runner

- 임의로 생성되는 미로에서 탈출하는 게임 사이트
- BFS 알고리즘을 canvas에 적용시켜 임의로 미로 생성

## TODO

- 플레이어 조작 UI : 키보드 입력과 화면의 버튼 마우스 클릭 이벤트 연동
- 플레이어 이동할 때마다 매번 canvas 전체를 다시 그리지 말고, 플레이어와 그 이동경로만 색칠

- 목적지 도달한 경우에 대한 처리
- 목적지는 벽이 3개인 경우만 되도록

- Header, Footer 및 디자인
- 미로 크기별 최고순위
- Deployment: ghpage &/or chrome extention

## Debugging

- [x] 첫 화면 렌더링 시점에 목적지가 보이지 않는 현상
- [x] 사이즈 변경시, 2번씩 생성해줘야 canvas 크기가 제대로 조절되는 현상
