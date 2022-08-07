function solution(numbers) {
  var answer = -1;
  const counting = new Array(10).fill(0);

  numbers.forEach(num => {
    counting[num] += 1;
  })

  answer = counting.reduce((prev, cur, i) => {
    if(cur === 0){
      return prev + i;
    } else{
      return prev;
    }
  }, 0)
  console.log(answer);
  return answer;
} 