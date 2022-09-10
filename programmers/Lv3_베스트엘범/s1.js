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