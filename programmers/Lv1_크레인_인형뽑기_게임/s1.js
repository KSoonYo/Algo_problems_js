function solution(board, moves) {
  var answer = 0;
  const stackTable = {};
  const resultStack = [];
  for(let i = 0; i < board.length; i++){
    stackTable[i + 1] = [];
    for(let j = 0; j < board.length; j++){
      if(board[j][i] !== 0){
        stackTable[i + 1].push(board[j][i]);
      }
    }
  }

  moves.forEach(move => {
    if(stackTable[move.toString()].length !== 0){
      doll = stackTable[move.toString()].shift();
      if(resultStack.length === 0){
        resultStack.push(doll);
      } else if(resultStack[resultStack.length - 1] === doll){
        resultStack.pop();
        answer += 2;
      } else{
        resultStack.push(doll);
      }
    }
  })

  return answer;
}
