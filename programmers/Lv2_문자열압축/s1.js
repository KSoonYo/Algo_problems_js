function solution(s) {
  var answer = 0;
  const MAX = parseInt(s.length / 2);
  
  if(s.length === 1){
    return 1;
  }

  const resultArray = new Array();
  for(let i = 1; i < MAX + 1; i++){
    let result = '';
    
    let comp = s.slice(0, i);
    
    let res = '';
    let temp = comp;
    let cnt = 1;

    for(let charIdx = i; charIdx < s.length; charIdx++){
      res += s[charIdx];
      if(res.length === i){
        if(res === comp){
          cnt += 1;
          temp = `${cnt}` + res;
          res = '';
        } else{
          result += temp;
          comp = res;
          
          res = '';
          temp = comp;
          cnt = 1;
        }
      }
    }

    if(temp.length > 0){
      result += temp
    }

    if(res.length > 0){
      result += res;
    }

    resultArray.push(result);
  }

  let MIN = 987654321;
  resultArray.forEach((elem) => {
      MIN = Math.min(elem.length, MIN);
  })


  answer = MIN;
  return answer;
}

solution("aabbaccc"	);

