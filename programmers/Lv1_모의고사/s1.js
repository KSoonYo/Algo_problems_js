function solution(answers) {
  var answer = [];
  pattern1 = [1, 2, 3, 4, 5];
  pattern2 = [2, 1, 2, 3, 2, 4, 2, 5];
  pattern3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const scores = {
    1 : 0,
    2 : 0,
    3 : 0
  }

  for(let i = 0; i < answers.length; i++){
    if(answers[i] === pattern1[i % pattern1.length]){
      scores[1] += 1;
    }

    if(answers[i] === pattern2[i % pattern2.length]){
      scores[2] += 1;
    }
    
    if(answers[i] === pattern3[i % pattern3.length]){
      scores[3] += 1;
    }
    
  }

  let maxV = 0;
  for(let idx in scores){
    maxV = Math.max(maxV, scores[idx]);
  }

  for(let idx in scores){
    if(maxV === scores[idx]){
      answer.push(parseInt(idx));
    }
  }

  return answer;
}

solution([1, 3, 2, 4, 2]);


/**
 * best solution
 * filter 배열 메서드 이용
 
 function solution(answers) {
    var answer = [];
    var a1 = [1, 2, 3, 4, 5];
    var a2 = [2, 1, 2, 3, 2, 4, 2, 5]
    var a3 = [ 3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    var a1c = answers.filter((a,i)=> a === a1[i%a1.length]).length;
    var a2c = answers.filter((a,i)=> a === a2[i%a2.length]).length;
    var a3c = answers.filter((a,i)=> a === a3[i%a3.length]).length;
    var max = Math.max(a1c,a2c,a3c);

    if (a1c === max) {answer.push(1)};
    if (a2c === max) {answer.push(2)};
    if (a3c === max) {answer.push(3)};


    return answer;
}
 */

