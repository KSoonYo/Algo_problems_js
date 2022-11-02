function place(N, hr, hc, queen = new Map(), cnt = 0) {
  if (hr === N - 1) {
    cnt += 1;
    return cnt;
  }

  // 현재 칸에 퀸을 둔다.
  queen.set(hr, hc);

  // 다음 후보군
  const candidates = [];

  // 다음 줄의 칸들 중 현재 칸을 포함한 이전 퀸들의 영향 범위 밖이면 다음 후보군에 포함
  for (let nc = 0; nc < N; nc++) {
    let flag = true;
    for (const [qr, qc] of queen) {
      if (qc === nc || Math.abs(qc - nc) === Math.abs(hr + 1 - qr)) {
        flag = false;
        break;
      }
    }
    if (flag) {
      candidates.push([hr + 1, nc]);
    }
  }
  for (const [nr, nc] of candidates) {
    cnt += place(N, nr, nc, queen);
  }

  queen.delete(hr);
  return cnt;
}

function solution(n) {
  var answer = 0;

  for (let s = 0; s < n; s++) {
    answer += place(n, 0, s);
  }
  return answer;
}

/**
 * best solution
 *
 * 배열의 인덱스로 queen의 위치를 저장하는 방법
 */

function check(queen, row) {
  // 이전까지 두었던 퀸의 위치를 확인한다.
  for (let i = 0; i < row; i += 1) {
    // 행의 위치와 대각선의 위치를 체크한다.
    if (
      queen[i] === queen[row] ||
      Math.abs(queen[i] - queen[row]) === row - i
    ) {
      return false; // 둘 수 없다면 false
    }
  }

  return true; // 모두 통과되면 true
}

function search(queen, row) {
  const n = queen.length;
  let count = 0;

  if (n === row) {
    // 체스판 끝에 도달했다면.. 재귀의 탈출 조건
    return 1;
  }

  for (let col = 0; col < n; col += 1) {
    // 0부터 n까지 열을 돌면 둘 수 있게 만든다.
    queen[row] = col; // 우선 퀸을 둔다
    if (check(queen, row)) {
      // 퀸을 둘 수 있다면..
      count += search(queen, row + 1); // 다음 행으로 이동!
    }
  }

  return count;
}

function solution(n) {
  // 미리 n개 만큼의 배열을 초기화한다. 0번 행부터 시작한다.
  return search(
    Array.from({ length: n }, () => 0),
    0
  );
}
