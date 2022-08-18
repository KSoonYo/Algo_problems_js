function solution(absolutes, signs) {
  var answer = 123456789;
  answer = absolutes.reduce((prev, cur, i) => {
      return signs[i] ? prev + cur : prev - cur
  }, 0)
  return answer;
}