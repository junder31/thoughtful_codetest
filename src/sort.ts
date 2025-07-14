export type Stack = 'STANDARD' | 'SPECIAL' | 'REJECTED';

function checkPositive(num: number) {
  if (num <= 0) {
    throw new Error('All measurements must be positive');
  }
}

export function sort(width: number, height: number, length: number, mass: number): Stack {
  [width, height, length, mass].map(checkPositive);
  const isBulky = checkBulky(width, height, length);
  const isHeavy = checkHeavy(mass);

  if (isBulky && isHeavy) {
    return 'REJECTED';
  } else if (isBulky || isHeavy) {
    return 'SPECIAL';
  } else {
    return 'STANDARD';
  }
}

function calcVolume(width: number, height: number, length: number): number {
  return width * height * length;
}

function checkBulky(width: number, height: number, length: number): boolean {
  if (Math.max(width, height, length) >= 150) {
    return true;
  } else if (calcVolume(width, height, length) >= 1000000) {
    return true;
  } else {
    return false;
  }
}

function checkHeavy(mass: number): boolean {
  return mass >= 20;
}
