function solution(number, k) {
  var answer = '';
  let stack = []
  for(let num of number){
      if(stack.length === 0){
          stack.push(num)
      } else if(k && stack[stack.length - 1] < num) {
          while(k && stack.length && stack[stack.length - 1] < num){
              stack.pop()
              k -= 1
          }
          stack.push(num)
      } else{
          stack.push(num)
      }
  }
  if(k){
      stack = stack.slice(0, number.length - k)
  }
  answer = stack.join('')
  
  return answer;
}