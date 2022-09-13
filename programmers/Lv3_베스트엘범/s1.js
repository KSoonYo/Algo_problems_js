function solution(genres, plays) {
  var answer = [];
  const table = Array.from(new Array(genres.length)).map((_, i) => {
    return [ i, genres[i], plays[i] ]
  })


  // 장르 정렬
  const getGenresInfo = [...new Set(genres)].map(genre => {
    const temp = table.filter(info => {
      return info[1] === genre
    }).reduce((acc, cur) => {
      return acc + cur[2]
    }, 0)
    return [genre, temp]
  })

  const sortedGenres = getGenresInfo.sort((a, b) => b[1] - a[1])

  // 정렬된 장르대로 최대 2개 곡 선별
  const getSelectedAlbums = sortedGenres.map(([genre, _]) => {
    const temp = table.filter(elem => {
      return elem[1] === genre
    }).sort((a, b) => {
      return b[2] - a[2]
    })
    return temp
  })

  const selectedAlbums = getSelectedAlbums.map(elem => {
    const sorted = elem.sort((a, b) => {
      if(b[2] > a[2] || (b[2] === a[2] && b[0] < a[0])){
        return 1
      } else{
        return -1
      }
    })
    return sorted
  })

  selectedAlbums.forEach(elem => {
    const result = elem.slice(0, 2)
    result.forEach(([id, , ]) => {
      answer.push(id)
    })
  })

  return answer;
}


// best solution by 자바스크립트 코테 강의
/*
문제 해결 전략
1. 같은 장르끼리 묶기
2. 묶인 노래들을 재생 순으로 정렬
3. 노래를 2개까지 자르는 작업
*/

// 해시 테이블 사용 + 고차 함수
function solution(genres, plays) {
  var answer = [];
  const genreMap = new Map();

  genres
  .map((genre, index) => [genre, plays[index]])
  .forEach(([genre, play], index) => {
    const data = genreMap.get(genre) || { total: 0, songs: [] } // 기본값 설정
    
    genreMap.set(genre, {
      total: data.total + play,
      songs: [...data.songs, {play, index}].sort((a, b) => b.play - a.play).slice(0, 2)
    })
  })

  return [...genreMap.entries()]
    .sort((a, b) => b[1].total - a[1].total) 
    .flatMap(item => item[1].songs)   // flatMap(): 전체 배열에 대해 Map함수 실행 후 일차원 배열로 평탄화
    .map(song => song.index)  
}



