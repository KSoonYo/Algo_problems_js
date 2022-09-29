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