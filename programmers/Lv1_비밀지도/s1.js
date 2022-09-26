function solution(n, arr1, arr2) {
  var answer = [];
  for(let i = 0; i < n; i++){
      const status = arr1[i] | arr2[i]
      let temp = ''
      for(let j = n - 1; j >= 0; j--){
         if((1 << j) & status){
              temp += '#'
          } else{
              temp += ' '
          }
     }
     answer.push(temp)
  }
  return answer;
}