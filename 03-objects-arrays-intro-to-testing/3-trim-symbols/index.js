/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */



export function trimSymbols(string, size){
  let counter = 1
  let newStr = []

  if ((size === 0)||!string) return ""
  if (!size) return string
  
  let arr = string.split('')
  
                         
  for(let i=0; i <= arr.length; i++){

  if (arr[i]==arr[i+1] && (counter<size)){
  
  newStr.push(arr[i])
  counter++
  continue 

  }else if(arr[i]!=arr[i+1]) {
  counter = 1
  newStr.push(arr[i])
  continue

  }else if(!arr[i+1]){
    newStr.push(arr[i]) 
    break
  }

  }
  
newStr.pop()
return newStr.join("")
}
