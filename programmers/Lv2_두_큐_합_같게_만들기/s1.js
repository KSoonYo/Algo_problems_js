// 2 pointer 풀이

function sum(arr){
  return arr.reduce((prev, curr) => {
    return prev + curr
  }, 0)
}

function solution(queue1, queue2) {
  var answer = -1;
  const target = parseInt((sum(queue1) + sum(queue2)) / 2)  
  const queue = [...queue1, ...queue2]
  let [p1, p2] = [0, queue1.length]
  let value = sum(queue1)

  // target 값보다 현재 value가 작으면 p2 자리의 수를 더해주고 p2를 1 증가시킨다.
  // target 값보다 현재 value가 크면 p1 자리의 수를 빼주고 p1를 1 증가시킨다.
  let i = 0
  while(p1 <= p2 && p2 < queue.length ){

    if(value === target){
      return i
    }

    if(value > target){
      value -= queue[p1]
      p1 += 1
    } else{
      value += queue[p2]
      p2 += 1
    }
    i++
  }
  return answer;
}

console.log(solution([3, 2, 7, 2], [4, 6, 5, 1]))
console.log(solution([1, 1], [1, 5]))


