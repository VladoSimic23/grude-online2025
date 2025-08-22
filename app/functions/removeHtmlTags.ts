export function removeHtmlTags(htmlString: string) {
  // Use a regular expression to remove HTML tags
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}
