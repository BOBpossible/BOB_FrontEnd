export const calWidth = (width: number) => {
  const calculatedWidth = (width / 375) * 100;
  return calculatedWidth;
};

export const calHeight = (height: number) => {
  const calculatedWidth = (height / 734) * 100;
  return calculatedWidth;
};
