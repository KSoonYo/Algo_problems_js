function solution(id_list, report, k) {
  var answer = [];

  for(let i = 0; i < id_list.length; i++){
    answer.push(0);
  }

  const userInfo = {};
  const badUser = {}
  for(let id of id_list){
    userInfo[id] = new Set();
    badUser[id] = 0;
  }

  for(let rep of report){
    const [user1, user2] = rep.split(' ');
    userInfo[user1].add(user2);
  }

  for(let info in userInfo){
    userInfo[info].forEach((elem) => {
        badUser[elem] += 1;
    })
  }

  for(let picked in badUser){
    if(badUser[picked] >= k){
      for(let user of id_list){
        if(userInfo[user].has(picked)){
          answer[id_list.indexOf(user)] += 1;
        }
      }
    }
  }

  return answer;
}

solution(["muzi", "frodo", "apeach", "neo"], ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"], 2);
solution(["con", "ryan"], ["ryan con", "ryan con", "ryan con", "ryan con"], 3);


// best solition
/**
 function solution(id_list, report, k) {
    let reports = [...new Set(report)].map(a=>{return a.split(' ')});
    let counts = new Map();
    for (const bad of reports){
        counts.set(bad[1],counts.get(bad[1])+1||1)
    }
    let good = new Map();
    for(const report of reports){
        if(counts.get(report[1])>=k){
            good.set(report[0],good.get(report[0])+1||1)
        }
    }
    let answer = id_list.map(a=>good.get(a)||0)
    return answer;
}
 */
