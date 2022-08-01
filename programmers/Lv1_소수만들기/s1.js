function solution(nums) {
  var answer = -1;
  let total;
  let cnt = 0;
  for(let i = 0; i < nums.length; i++){
    for(let j = i + 1; j < nums.length; j++){
      for(let k = j + 1; k < nums.length; k++){
        total = nums[i] + nums[j] + nums[k];
        let isPrime = true;
        for(let h = 2; h < parseInt(Math.sqrt(total)) + 1; h++){
          if(total % h === 0){
            isPrime = false;
            break;
          }
        }
        if(isPrime){
          cnt += 1;
        } 
      }
    }
  }
  answer = cnt;
  return answer;
}

solution([1,2,3,4]);