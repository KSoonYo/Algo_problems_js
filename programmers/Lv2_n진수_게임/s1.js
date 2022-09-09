/** 진법 변환 함수*/
function change(n, value){
  const overTenTable = {
    10 : 'A', 11 : 'B', 12: 'C', 13: 'D', 14 : 'E', 15: 'F'
  }

  if(value < n){
    return value < 10 ? String(value) : overTenTable[value]
  }
  let result = ''
  while(value){
    result = String(value % n < 10 ? value % n : overTenTable[value % n]) + result
    value = parseInt(value / n)
  }

  return result
}

// tip) 10진수.toString(n)으로 쉽게 진법변환이 가능하다.

function solution(n, t, m, p) {
  var answer = [];

  let turn = 1
  let myTurn = p
  let nowNumber = 0
  let target = ''
  while(answer.length < t){
    target = change(n, nowNumber)
    let idx = 0
    while(idx < target.length){
      if(turn === myTurn && answer.length < t){
        answer.push(target[idx])
        myTurn += m
      }
  
      turn += 1
      idx += 1
    }
    nowNumber += 1
  }
  answer = answer.join('')
  return answer;
}


/** best solution 
 * 최대까지 n진수로 변환하여 붙인 후, p + (i * m) - 1 번째 인덱스(i++, i < t) 있는 수들만 answer 에 담는다.)
*/

// 1번
function solution(n, t, m, p) {
  const numbers = [
    ...new Array(1000000)
  ].map((n, idx) => idx)

  const numberedNumbers = numbers.reduce((p,c) => p + `${c.toString(n)}`)

  let answers = []
  for (let i = 0; i < t; i++) {
    answers.push(numberedNumbers[p + (i * m)-1])
  }

  return answers.join('').toUpperCase()
}


// 2번
function solution(n, t, m, p) {
  var tubeT = Array.apply(null,Array(t)).map((a,i)=>i*m+p-1);
  var line = '';
  var max = m*t + p;
  for (var i =0;line.length <= max; i++) {
      line += i.toString(n);
  }
  return tubeT.map(a=>line[a]).join('').toUpperCase();
}
