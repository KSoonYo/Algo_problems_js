// 대표적인 결정 문제(파라메트릭 서치)
// 1분부터 max분까지의 시간 중 가장 처음 n명의 입국 심사가 모두 완료되는 시간을 찾는 문제

function solution(n, times) {
  var answer = 0;
  let left = 0
  let right = Math.max(...times) * n + 1
  times.sort((a, b) => a - b)

  while(left <= right){
      let people = 0

      // 전체 입국 심사 처리 시간 : mid
      mid = Math.floor((left + right) / 2)

      // 전체 입국 심사 처리 시간에서 면접관 당 처리 가능한 사람 수를 계산하여 누적
      // 목표했던 n명을 넘는다면 지금 mid 시간에 n명 모두 입국심사를 받을 수 있는 것이므로 break 
      for(let time of times){
          people += Math.floor(mid / time)
          if(people >= n){
              break
          }
      }
      
      if(people >= n){
          answer = mid
          right = mid - 1
      } else if(people < n){
          left = mid + 1
      }
  }
  
  
  return answer;
}