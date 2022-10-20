function solution(s){
  var answer = true;

  const stack = []
  let top = -1
  for(let char of s){
      if(char === '('){
          stack.push(char)
          top += 1
      } else{
          if(stack[top] === '('){
              stack.pop()
              top -= 1
          } else if(top < 0 || stack[top] === ')'){
              answer = false
              break
          }
      }
  }
  
  if(stack.length > 0){
      answer = false
  }

  return answer;
}


/// best solution

function solution(s){
  let count = 0;

  for(let char of s){
      if(char === '('){
          count += 1
      } else if(count === 0){
          return false
      } else{
          count -= 1
      }
  }
  
  return count === 0;
}