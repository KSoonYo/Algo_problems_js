// 정규표현식 정리: https://hamait.tistory.com/342

function best_solution(new_id) {
  const answer = new_id
      .toLowerCase() // 1
      .replace(/[^\w-_.]/g, '') // 2 -> 밑줄 문자(_, . 등)을 제외한 문자나 숫자, -, _, .이 아닌 모든 문자 제거
      .replace(/\.+/g, '.') // 3 -> .이 연속으로 2개 이상인 문자열을 .으로 변경
      .replace(/^\.|\.$/g, '') // 4 -> 첫 문자가 . 이거나 끝 문자가 .이면 해당 문자를 제거
      .replace(/^$/, 'a') // 5 -> 첫 문자와 끝 문자가 없는 빈 문자열이면 'a' 추가
      .slice(0, 15).replace(/\.$/, ''); // 6 -> 0부터 14번째 인덱스까지 문자열을 슬라이싱 한 후, 끝 문자가 .이면 .을 제거
  const len = answer.length;
  return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}

function solution(new_id) {
  var answer = '';
  new_id = new_id.toLowerCase();
  let filtered_id = new_id.match(/[a-z0-9\-\_\.]+/g).join('');
  let changed_id = filtered_id.replace(/[\.]+/g, '.');

  changed_id = changed_id.split('').filter((elem, idx) => {
    return idx > 0 && idx < changed_id.length - 1 || (elem !== '.')
  }).join('');
  
  if(changed_id.length === 0){
    changed_id = 'a';
  }

  if(changed_id.length >= 16){
    changed_id = changed_id.slice(0, 15);
    if(changed_id[14] === '.'){
      changed_id = changed_id.slice(0, 14);
    }
  } else if(changed_id.length <= 2){
    const lastChar = changed_id[changed_id.length - 1];
    while(changed_id.length < 3){
      changed_id += lastChar;
    }
  }

  answer = changed_id;
  return answer;
}

solution("...!@BaT#*..y.abcdefghijklm");
solution("123_.def");