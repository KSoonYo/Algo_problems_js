class Maxheap{
  constructor(arr=[]){
      this.heap = [null]
      if(arr.length > 0){
          this.heaplify(arr)
      }
  }
  
  empty(){
      return this.heap.length === 1 ? true : false
  }
  
  size(){
      return this.heap.length - 1
  }
  
  // 가장 마지막에 정점을 추가
  // 이후 부모 인덱스와 비교하면서 위로 올라감
  push(value){
      this.heap.push(value)
      if(this.size() <= 1){
          return
      }
      
      let currentIndex = this.size()
      let parentIndex = Math.floor(currentIndex / 2)
      while(parentIndex !== 0 && this.heap[parentIndex] < value){
          const temp = this.heap[parentIndex]
          this.heap[parentIndex] = value
          this.heap[currentIndex] = temp
          
          currentIndex = parentIndex
          parentIndex = Math.floor(currentIndex / 2)
      }
  }
  
  // 가장 첫번째 정점 원소를 pop
  // 이후 마지막 정점 원소를 root 노드에 위치
  // 이후 자식 정점들과 비교하며 정렬
  pop(){
      if(this.size() === 1){
          return this.heap.pop()
      }
      
      const returnValue = this.heap[1]
      this.heap[1] = this.heap.pop()
      
      let currentIndex = 1
      let leftIndex = 2
      let rightIndex = 3
      while(
          this.heap[currentIndex] < this.heap[leftIndex] ||
          this.heap[currentIndex] < this.heap[rightIndex]
      ){      
                  
          if(this.heap[leftIndex] < this.heap[rightIndex]){
                  const temp = this.heap[currentIndex]
                  this.heap[currentIndex] = this.heap[rightIndex]
                  this.heap[rightIndex] = temp

                  currentIndex = rightIndex
  
              } else {
                  const temp = this.heap[currentIndex]
                  this.heap[currentIndex] = this.heap[leftIndex]
                  this.heap[leftIndex] = temp

                  currentIndex = leftIndex
 
              }
          leftIndex = currentIndex * 2
          rightIndex = currentIndex * 2 + 1
      }

      return returnValue
  }
  
  heaplify(arr=[]){
      arr.forEach(elem => {
          this.push(elem)
      })
      return this.heap
  }
}



// 남은 일의 작업량이 가장 큰 것부터 진행하면서 야근 피로도를 줄인다.
// 정렬 or Maxheap
// 연습을 위해 최대힙 사용
function solution(no, works) {
  var result = 0;
  if(works.reduce((a, b) => a + b) <= no){
      return 0
  }
  
  const heap = new Maxheap(works);
  while(no){
      const value = heap.pop()
      heap.push(value - 1)
      no -= 1
  }
  
  result = heap.heap.reduce((acc, cur) => {
      return acc + (cur * cur)
  }, 0)
  
  return result;
}