export const copy = (text) => {
  let tmp   = document.createElement('INPUT');
  tmp.value = text;
  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
}
