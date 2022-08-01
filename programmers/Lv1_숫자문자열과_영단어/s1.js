
// split과 join을 이용한 풀이
// 비슷한 메소드를 활용한 python으로도 같은 풀이가 가능하다.
function best_solution(s) {
  let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  var answer = s;

  for(let i=0; i< numbers.length; i++) {
      let arr = answer.split(numbers[i]);
      answer = arr.join(i);
  }

  return Number(answer);
}

best_solution("one4seveneight");

////////////////////
/////나의 풀이//////
function solution(s) {
  var answer = '';
  const table = {
    zero : '0', one : '1', two : '2', three : '3', four : '4',
    five : '5', six : '6', seven : '7', eight: '8', nine : '9'
  };

  let temp = '';
  for(let char of s){
    if(isNaN(char)){
        temp += char;
        if(temp in table){
          answer += table[temp];
          temp = '';
        }
    } else{
      answer += char;
    }
  }
  return parseInt(answer);
}

solution("one4seveneight");