// Utility function to get first N words
export const getFirstWords = (text: string, wordCount: number = 15): string => {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordCount) {
    return text;
  }
  return words.slice(0, wordCount).join(' ') + '...';
};

// Utility function to strip HTML and get plain text
export const stripHtmlTags = (html: string): string => {
  // Create a temporary div element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

// Combined utility for HTML content
export const getHtmlPreview = (html: string, wordCount: number = 15): string => {
  const plainText = stripHtmlTags(html);
  return getFirstWords(plainText, wordCount);
};