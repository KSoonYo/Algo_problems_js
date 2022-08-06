function solution(a, b) {
  var answer = 1234567890;
  answer = a.reduce((prev, current, idx) => {
      return prev + current * b[idx]
  }, 0)
  return answer;
}