// 트라이 자료구조 이용

class Node{
  constructor(val=''){
      this.value = val
      this.cnt = 0
      this.children = new Map()
  }
}

class Trie{
  constructor(){
      this.root =  new Node()
  }
  insert(string){
      let currentNode = this.root
      
      for(const char of string){
          if(!currentNode.children.has(char)){
              currentNode.children.set(char, new Node(currentNode.value + char))
          }
          currentNode = currentNode.children.get(char)
          currentNode.cnt += 1
      }
  }
  
  count(word){
      let returnCnt = 0
      let currentNode = this.root
      for(let letter of word){
          if(currentNode.value !== '' && currentNode.cnt <= 1){
              return returnCnt
          }
          currentNode = currentNode.children.get(letter)
          returnCnt += 1
      }
      
      return returnCnt
  }
  
}

function solution(words) {
  var answer = 0;
  const trie = new Trie()
  for(let word of words){
      trie.insert(word)
  }

  for(let word of words){
      answer += trie.count(word)
  }
  
      
  return answer;
}
