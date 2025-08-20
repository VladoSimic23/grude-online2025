export function decodeHTMLEntities(text: string) {
  return text.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
}
