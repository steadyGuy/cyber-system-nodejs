// Math describing of interpolato functions: http://paulbourke.net/miscellaneous/interpolation/

// Also example here: https://trycode.pw/c/QYFOT

const cosineInterpolate = (before: number, after: number) => {
  const AT_POINT = 0.25;
  let atPoint2 = (1 - Math.cos(AT_POINT * Math.PI)) / 2;

  return (Number(before) * (1 - atPoint2) + Number(after) * atPoint2);
}

const linearInterpolate = (before: number, after: number) => {
  const AT_POINT = 0.25;
  return Number(before) + (Number(after) - Number(before)) * AT_POINT;
};

const interpolate = (interpolator = 'linear', before: number, after: number) => {
  switch (interpolator) {
    case 'linear':
      return linearInterpolate(before, after);
    case 'cosine':
      return cosineInterpolate(before, after);
    default:
      return linearInterpolate(before, after);
  }
}

export default interpolate;