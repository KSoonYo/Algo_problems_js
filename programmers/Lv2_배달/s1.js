class Heapq{
  constructor(){
    this.heap = [null]
    this.data = [null]
  }

  push([priority, value]){
    this.heap.push(priority)
    this.data.push(value)

    let cunrrentIndex = this.heap.length - 1
    let parentIndex = Math.floor(cunrrentIndex / 2)
    while(
      cunrrentIndex > 1 && this.heap[cunrrentIndex] < this.heap[parentIndex]
    ){
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = this.heap[cunrrentIndex]
      this.heap[cunrrentIndex] = temp

      const tempData = this.data[parentIndex]
      this.data[parentIndex] = this.data[cunrrentIndex]
      this.data[cunrrentIndex] = tempData

      cunrrentIndex = parentIndex
      parentIndex = Math.floor(cunrrentIndex / 2)
    }
  }

  pop(){
    if(this.heap.length - 1 == 1){
      return [this.heap.pop(), this.data.pop()]
    }

    const returnValue = [this.heap[1], this.data[1]]

    this.heap[1] = this.heap.pop()
    this.data[1] = this.data.pop()

    let cunrrentIndex = 1
    let leftChild = 2
    let rightChild = 3
    while(
      this.heap[cunrrentIndex] > this.heap[leftChild] ||
      this.heap[cunrrentIndex] > this.heap[rightChild]
    ){
      if(this.heap[leftChild] > this.heap[rightChild]){
        const temp = this.heap[rightChild]
        this.heap[rightChild] = this.heap[cunrrentIndex]
        this.heap[cunrrentIndex] = temp

        const tempData = this.data[rightChild]
        this.data[rightChild] = this.data[cunrrentIndex]
        this.data[cunrrentIndex] = tempData

        cunrrentIndex = rightChild
      } else{
        const temp = this.heap[leftChild]
        this.heap[leftChild] = this.heap[cunrrentIndex]
        this.heap[cunrrentIndex] = temp

        
        const tempData = this.data[leftChild]
        this.data[leftChild] = this.data[cunrrentIndex]
        this.data[cunrrentIndex] = tempData

        cunrrentIndex = leftChild
      }

      leftChild = cunrrentIndex * 2
      rightChild = cunrrentIndex * 2 + 1

    }

    return returnValue
  }
}


function deliver(graph, q, dist){
  while(q.heap.length - 1 > 0){
    const [cost, s] = q.pop()
    
    if(dist[s] > cost){
      continue  
    }

    for(let edge of graph[s]){
      const [nextDest, nextCost] = edge
      if(dist[nextDest] > cost + nextCost){
        dist[nextDest] = cost + nextCost
        q.push([cost + nextCost, nextDest])
      }
    }
  }
}

function solution(N, roads, K) {
  var answer = 0;

  const graph = Array.from(new Array(N + 1), () => [])    // [[목적지, 걸리는 시간], [목적지2, 걸리는 시간] ...]
  for(let road of roads){
    const [start, end, cost] = road
    graph[start].push([end, cost])
    graph[end].push([start, cost])
  }

  const dist = Array(N + 1).fill(Infinity)
  dist[1] = 0
  const q = new Heapq()

  // 시작점 push
  q.push([0, 1])
  deliver(graph, q, dist)
  answer = dist.filter(distance => distance <= K).length

  return answer;
}


///////
// best solution
class MinHeap {
  constructor() {
      this.heap = [null];
  }

  push(value) {
      this.heap.push(value);
      let currentIndex = this.heap.length - 1;
      let parentIndex = Math.floor(currentIndex / 2);

      while (parentIndex !== 0 && this.heap[parentIndex].cost > value.cost) {
          this._swap(parentIndex, currentIndex)

          currentIndex = parentIndex;
          parentIndex = Math.floor(currentIndex / 2);
      }
  }

  pop() {
      if (this.isEmpty()) return;
      if (this.heap.length === 2) return this.heap.pop();

      const returnValue = this.heap[1];
      this.heap[1] = this.heap.pop();

      let currentIndex  = 1;
      let leftIndex = 2;
      let rightIndex = 3;
      while ((this.heap[leftIndex] && this.heap[currentIndex].cost > this.heap[leftIndex].cost) || 
             (this.heap[rightIndex] && this.heap[currentIndex].cost > this.heap[rightIndex].cost)) {
          if (this.heap[leftIndex] === undefined) { // 왼쪽 정점이 없을 경우
              this._swap(rightIndex, currentIndex)
          } else if (this.heap[rightIndex] === undefined) { // 오른쪽 정점이 없을 경우
              this._swap(leftIndex, currentIndex)
          } else if (this.heap[leftIndex].cost > this.heap[rightIndex].cost) {
              this._swap(rightIndex, currentIndex)
          } else if (this.heap[leftIndex].cost <= this.heap[rightIndex].cost) {
              this._swap(leftIndex, currentIndex)
          }
          leftIndex = currentIndex * 2;
          rightIndex = currentIndex * 2 + 1;
      }

      return returnValue;
  }

  isEmpty() {
      return this.heap.length === 1;
  }

  _swap(a, b) { // 편의를 위해 배열의 요소를 swap하는 함수 작성
      [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function dijkstra(road, N) {
  const heap = new MinHeap(); // 우선순위 큐(힙)
  heap.push({ node: 1, cost: 0 }) // 1번 마을부터 시작

  const dist = [...Array(N + 1)].map(() => Infinity); // 계산하기 편하도록 N+1 길이만큼 리스트 생성
  dist[1] = 0; // 1번 마을은 무조건 거리가 0

  while (!heap.isEmpty()) { // heap이 비어있지 않다면
      // cost가 가장 낮은 정점을 뽑는다.
      const { node: current, cost: currentCost } = heap.pop();

      for (const [src, dest, cost] of road) { // 루프를 돌며 시작점, 도착점, 비용을 꺼낸다
          const nextCost = cost + currentCost; // 비용

          // 양방향을 고려하여 작성
          if (src === current && nextCost < dist[dest]) {
              // src가 현재 선택된 정점이면서 목적지까지 더 저렴할 경우
              dist[dest] = nextCost; // 거리를 갱신한다.
              heap.push({ node: dest, cost: nextCost }); // push
          } else if (dest == current && nextCost < dist[src]) {
              // dest가 현재 선택된 정점이면서 목적지까지 더 저렴할 경우
              dist[src] = nextCost; // 거리를 갱신한다.
              heap.push({ node: src, cost: nextCost }); // push
          }
      }
  }

  return dist; // 1번 마을부터 각 마을까지의 최단 거리
}


function solution(N, road, K) {
  const dist = dijkstra(road, N);
  return dist.filter(x => x <= K).length;
}


