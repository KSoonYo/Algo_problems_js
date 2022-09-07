// 직접 queue 구현하는 경우
// 배열의 shift() 연산은 n이 클 경우 O(n)의 시간복잡도(n이 작으면 자바스크립트 엔진이 최적화 진행)
// 따라서 n이 클 경우에는 queue를 직접 구현하는 것이 좋다.

class Queue{
  constructor(){
    this.queue = []
    this.front = 0
    this.rear = 0
  }

  isEmpty(){
    return this.front === this.rear
  }

  enqueue(value){
    this.queue[this.rear++] = value
  }

  dequeue(){
    const value = this.queue[this.front]
    delete this.queue[this.front] // dequeue한 값의 참조 끊어내기
    this.front += 1
    return value
  }
}



function solution(n, edge) {
  var answer = 0;
  const graph = Array.from(new Array(n + 1)).map(elem => [])
  
  edge.forEach(([s, e]) => {
      graph[s].push(e)
      graph[e].push(s)
  })
  
  const dist = new Array(n + 1).fill(200001)
  dist[1] = 0
  const q = [[0, 1]]    // [dist, node]
  while(q.length > 0){
      const [distance, node] = q.shift()
      for(let next of graph[node]){
          if(dist[next] > distance + 1){
              dist[next] = distance + 1
              q.push([distance + 1, next])
          }
      }
  }
  const maxDist = Math.max(...dist.slice(1))
  answer = dist.filter(elem => elem === maxDist).length
  
  return answer;
}