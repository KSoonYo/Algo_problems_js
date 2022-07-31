// best solution
// filter를 이용한 풀이
function best_solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];

  let minCount = lottos.filter(v => win_nums.includes(v)).length;
  let zeroCount = lottos.filter(v => !v).length;

  const maxCount = minCount + zeroCount;

  return [rank[maxCount], rank[minCount]];
}

/////////
// 나의 풀이
function solution(lottos, win_nums) {
  var answer = [];
  const table = {
    winCount : 0,
    possibleCount : 0
  };

  const rank = {
    2 : 5,
    3 : 4,
    4 : 3,
    5 : 2,
    6 : 1
  }
  
  lottos.forEach((elem) => {
    if(win_nums.includes(elem)){
      table.winCount++;
    }

    if(elem === 0){
      table.possibleCount++;
    }
  });


  const best = table.winCount + table.possibleCount;
  const worst = table.winCount

  if(best < 2){
    answer.push(6);
  } else{
    answer.push(rank[`${best}`]);
  }

  if(worst< 2){
    answer.push(6);
  } else{
    answer.push(rank[`${worst}`]);
  }

  return answer;
}

solution([45, 4, 35, 20, 3, 9], [21, 10, 5, 46, 7, 34]);
