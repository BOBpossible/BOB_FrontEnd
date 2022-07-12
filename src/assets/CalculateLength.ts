export const calWidth = (width: number) => {
  const calculatedWidth = (width / 375) * 100;
  return calculatedWidth;
};

export const calHeight = (height: number, ios?: boolean) => {
  if (ios !== undefined && ios) {
    return (height / 812) * 100;
  } else {
    return (height / 734) * 100;
  }
};
