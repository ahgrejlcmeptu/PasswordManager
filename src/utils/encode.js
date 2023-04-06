import { v4 as uuidv4 } from 'uuid';

export const decodeWord = (word, key, visible = false) => {
  let start = 0
  return word.split('').map((i, idx) => {
    let valI = i.codePointAt(0)
    if (!key.codePointAt(start)) start = 0
    let valKey = key.codePointAt(start)
    start++
    return visible ? String.fromCodePoint(Math.abs(valI - valKey)) : String.fromCodePoint(valI + valKey)
  }).join('')
}
export const genericPassword = () => {
  return uuidv4()
}

// function copyPassword() {
//   var copyText = document.getElementById("password");
//   copyText.select();
//   document.execCommand("copy");
// }
