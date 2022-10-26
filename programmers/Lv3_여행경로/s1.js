function solution(tickets) {
  var answer = [];
  const routes = {}
  
  for(let [start, end] of tickets){
      if(!routes[start]){
          routes[start] = [end]
      } else{
          routes[start].push(end)        
      }
  }

  for(let start in routes){
      routes[start].sort()
      routes[start].reverse()
  }
  
  let stack = []
  stack.push('ICN')
  let visited = []
  while(stack.length > 0){
      let start = stack[stack.length - 1]
      if(!routes[start] || routes[start].length === 0){
          visited.push(stack.pop())
      } else{
          stack.push(routes[start].pop())
      }
  }
  
  answer = visited.reverse()
  return answer;
}