// 프림

function Prim(s, n, graph, answer){
  let totalCosts = 0

  const costMap = Array(n).fill(Infinity)
  const visited = Array(n).fill(false)

  costMap[s] = 0
  
  for(let _ = 0; _ < n; _++){
      let minV = Infinity
      let minIdx = 0


      for(let idx = 0; idx < n; idx++){
        if(!visited[idx] && costMap[idx] < minV){
          minV = costMap[idx]
          minIdx = idx
        }
      }

      visited[minIdx] = true
      totalCosts += costMap[minIdx]
      if(answer <= totalCosts){
        return answer
      }

      for(let [dest, cost] of graph[minIdx]){
        if(costMap[dest] > cost ){
          costMap[dest] = cost
        }
      }
  }

  return totalCosts

}


function solution(n, costs) {
  var answer = Infinity;
  const graph = Array.from(new Array(n), () => [])

  for(let cost of costs){
    graph[cost[0]].push([cost[1], cost[2]])   // [도착지점, cost]
    graph[cost[1]].push([cost[0], cost[2]])
}


  for(let s = 0; s < n; s++){
    answer = Prim(0, n, graph, answer) 
  }
  return answer;
}


//////// union-find, 크루스칼

// union-find
function find(parent, x){
  if(parent[x] === x){
    return x;
  }

  // 경로 압축 최적화(부모 원소 찾기)
  return parent[x] = find(parent, parent[x])
}

function union(parent, a, b){
  a = find(parent, a)
  b = find(parent, b)
  if(a < b){
    parent[b] = a
  } else{
    parent[a] = b
  }
}


function compare(parent, a, b){
  a = find(parent, a)
  b = find(parent, b)
  return a === b
}

// 크루스칼
function solution(n, costs){
  let answer = 0

  // 크루스칼 알고리즘을 위한 cost 오름차순 정렬
  const sortedCosts = costs.sort((a, b) => a[2] - b[2])

  // 각각의 인덱스가 곧 부모 노드를 가리킴
  const parent = Array.from({length: n}, (_, i) => i)

  // 간선 정리
  for(const [a, b, cost] of sortedCosts){
    // 두 원소가 같은 집합에 속해 있는지 check(같은 집합에 속해 있다면 cycle)
    // 같은 원소에 속해 있다면 넘어감
    if(!compare(parent, a, b)){
      answer += cost
      union(parent, a, b)
    }
  }
  return answer
}
