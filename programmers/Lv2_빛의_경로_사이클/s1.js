function dfs(grid, bound, visited, start, here, dirs, turn, cycleLength = 0){
  const [R, C] = bound
  
  const stack = [here]
  while(stack.length > 0){
    let [r, c, direction] = stack.pop()

    if(cycleLength > 0 && r === start[0] && c === start[1] && direction === start[2]){
      return cycleLength
    }
    if(visited[r][c][direction]){
      // 현재 노드를 이미 방문했고, 앞으로 가려는 방향대로 이전에 사이클을 돈 적이 있다면, 
      // 현재 탐색하는 경로는 이전에 사이클을 체크했을 때 이미 포함된 경로일 것이므로 더이상 사이클을 탐색하지 않는다.
      // 방향과 방문 순서만 다를 뿐 전혀 새로운 곳에서 사이클을 시작할 수 없기 때문에 이미 방문했던 사이클을 돌아도 경로의 거리는 달라지지 않는다.
      return null
    }
    
    visited[r][c][direction] = 1
    cycleLength += 1
    
    nr = (r + dirs[direction][0]) < 0 ? R - 1 : (r + dirs[direction][0]) % R 
    nc = (c + dirs[direction][1]) < 0 ? C - 1 : (c + dirs[direction][1]) % C
    
    if(grid[nr][nc] === 'L'){
      direction = turn['L'].get(direction)
    } else if(grid[nr][nc] === 'R') {
      direction = turn['R'].get(direction)
    }

    stack.push([nr, nc, direction])
  }

}

function solution(grid) {
  var answer = [];
  // 상 하 좌 우
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]

  const turn = {
    'L' : new Map([
      [0, 2], [1, 3], [2, 1], [3, 0]
    ]),
    
    'R' : new Map([
      [0, 3], [1, 2], [2, 0], [3, 1]
    ])
  }

  const [R, C] = [grid.length, grid[0].length]

  /**
   * visit 배열을 만드는 더 나은 방법
   *     const visit = grid.map(s => Array.from(s).map(() => Array(4).fill(0)));
   * 
   */

  const visited = Array.from(Array(R), () => Array(C))
  for(let k = 0; k < R; k++){
    for(let c = 0; c < C; c++){
      visited[k][c] = [0, 0, 0, 0]
    }
  }

  for(let r = 0; r < R; r++){
    for(let c = 0; c < C; c++){
      for(let i = 0; i < 4; i++){
        const value = dfs(grid, [R, C], visited, [r, c, i], [r, c, i], dirs, turn)
        if(value){
          answer.push(value)
        }
      }
    }
  }
  
  answer.sort((a, b) => {
    return a - b
  })
  return answer;
}


solution(['SL', 'LR'])
solution(['R', 'R'])

