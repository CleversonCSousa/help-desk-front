export function getInitialsName(name: string) {
  if (!name.trim()) {
    return { firstLetter: "", lastLetter: "" };
  }

  const splitName = name.trim().split(/\s+/);

  const firstLetter = splitName[0][0];

  if (splitName.length === 1) {
    return {
      firstLetter,
      lastLetter: "",
    };
  }

  return {
    firstLetter,
    lastLetter: splitName[splitName.length - 1][0],
  };
}
