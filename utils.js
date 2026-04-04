export function normalizeText(str = "") {
  return str.toLowerCase().trim().replace(/\s+/g, " ");
}

export function isMatch(input, answer) {
  return normalizeText(input) === normalizeText(answer);
}
