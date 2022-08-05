function best_solution(record) {
    const userInfo = {};
    const action = [];
    const stateMapping = {
        'Enter': '님이 들어왔습니다.',
        'Leave': '님이 나갔습니다.'
    }

    record.forEach((v) => {
        const [state, id, nick] = v.split(' ');

        if(state !== "Change") {
            action.push([state, id]);
        }

        if(nick) {
            userInfo[id] = nick;
        }
    })

    return action.map(([state, uid]) => {
        return `${userInfo[uid]}${stateMapping[state]}`;    
    })
}

////////나의 풀이/////////

function solution(record) {
  var answer = [];
  const userInfo = {};
  const histories = [];
  
  for(let reco of record){
      const [command, userId, userName] = reco.split(' ');
      let action = '';
      if(command === 'Enter'){
          action = '들어왔습니다.'
          userInfo[userId] = userName;
          histories.push([userId, action]);
      } else if(command === 'Leave'){
          action = '나갔습니다.';
          histories.push([userId, action]);
      } else{
          userInfo[userId] = userName;
      }
  }
  for(let history of histories){
      const [Id, action] = history;
      answer.push(userInfo[Id] + '님이 ' + action);
  }
  return answer;
}