
// grid 접근법으로 풀이
function best_solution(numbers, hand) {
  let answer = '';
  // imagine a grid, and assign each number coordinates
  // by taking 5 being 0,0.
  // If needed, this can also be done programmatically.
  const grid = [[0,-2], [-1,1], [0,1],
                [1,1], [-1,0], [0,0],
                [1,0], [-1,-1], [0,-1],
                [1,-1], [-1,-2], [1,-2]];
  let L = 10; // 10th element of the grid are * and # of the keypad
  let R = 11; // 11th
  let L_steps, R_steps; 
  hand = hand[0].toUpperCase();
  numbers.forEach(el => {
      switch (grid[el][0]){
          case -1:
              answer += "L";
              L = el;
              break;
          case 1:
              answer += "R";
              R = el;
              break;
          case 0:
              L_steps = Math.abs(grid[L][0] - grid[el][0]) + Math.abs(grid[L][1] - grid[el][1]);
              R_steps = Math.abs(grid[R][0] - grid[el][0]) + Math.abs(grid[R][1] - grid[el][1]);
              if(L_steps > R_steps){
                  answer += "R";
                  R = el;
              } else if (L_steps < R_steps){
                  answer += "L";
                  L = el;
              } else {
                  answer += hand;
                  eval(`${hand} = el`); //may affect performance?
              }
      }
  });
  return answer;
}



/// 나의 풀이 ///
function solution(numbers, hand) {
  var answer = '';
  const keyPads = [
      [1, 2, 3], 
      [4, 5, 6],
      [7, 8, 9],
      ['*', 0, '#']
  ];
  let leftKeys = [1, 4, 7]
  let rightKeys = [3, 6, 9]
  
  let leftHand = [3, 0];
  let rightHand = [3, 2];
  
  numbers.forEach((elem) => {
      for(let i = 0; i < keyPads.length; i++){
          for(let j = 0; j < keyPads[i].length; j++){
              if(keyPads[i][j] === elem){
                  if(leftKeys.includes(elem)){
                      leftHand = [i, j];
                      answer += 'L';
                  } else if(rightKeys.includes(elem)){
                      rightHand = [i, j];
                      answer += 'R';
                  } else{
                      let [leftDistI, leftDistJ] = [Math.abs(leftHand[0] - i), Math.abs(leftHand[1] - j)];
                      let [rightDistI, rightDistJ] = [Math.abs(rightHand[0] - i), Math.abs(rightHand[1] - j)];
                      
                      // 상 하 좌 우로만 이동하므로 피타고라스 정리를 이용한 유클리드 거리 대신 맨해튼 거리 공식 사용!
                      // x 좌표 차이의 절대값과 y좌표 차이의 절대값의 합
                      let leftDistance = Math.sqrt(leftDistI + leftDistJ );
                      let rightDistance = Math.sqrt(rightDistI  + rightDistJ);
                      if(leftDistance < rightDistance){
                          answer += 'L';
                          leftHand = [i, j];
                      } else if(leftDistance > rightDistance){
                          answer += 'R';
                          rightHand = [i, j];
                      } else{
                          if(hand === 'left'){
                              answer+= 'L';
                              leftHand = [i, j];
                          } else{
                              answer += 'R';
                              rightHand = [i, j];
                          }
                      }
                  }
              }
          }
      }
  })
  return answer;
}