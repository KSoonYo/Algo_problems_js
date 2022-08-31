function check(numLists, target){
  for(let value of numLists){
    if(value === target){
      return true 
    }
  }
  return false
}

function solution(N, number) {
  var answer = -1;

  const dp = [0, [N], [10 * N + N, N + N, N - N, parseInt(N / N)]]
  // dp 3부터 8까지
  // 1) (dp[1], dp[i - 1]), (dp[2], dp[i - 2]) ... (dp[i - 1], dp[1])의 순서쌍으로 
  // 2) 하나의 순서쌍에서 왼쪽 집합의 수를 피연산자로 하여 오른쪽 집합의 각각의 수로 +, -, *, / 모든 사칙연산을 한 결과가
  // 3) dp[i]의 요소가 된다. (이때 나누기 연산에서는 오른쪽 집합의 수가 0이 되어서는 안되며 나머지는 모두 버린다.)
  // 1)의 모든 순서쌍에서 2)의 과정을 거친 후 dp[i] 요소로 추가한다.

  if(dp[1][0] === number){
    return 1
  } else if(check(dp[2], number)){
    return 2
  }

  for(let i = 3; i < 9; i++){
    const temp = new Set()

    temp.add(String(N).repeat(i))

    let p1 = 1;
    let p2 = i - p1
    while(p1 < i && p2 > 0){
      dp[p1].forEach(v1 => {
        dp[p2].forEach(v2 => {
          temp.add(v1 + v2)
          temp.add(v1 - v2)
          temp.add(v1 * v2)
          if(v2 !== 0){
            temp.add(parseInt(v1 / v2))
          }
        })
      })
      
      p1 += 1
      p2 -= 1
    }

    if(check(temp, number)){
      return i
    } 
    dp.push(temp)
  }
    
    
  return answer;
}