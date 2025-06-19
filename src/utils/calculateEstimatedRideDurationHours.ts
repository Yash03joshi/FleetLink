export function calculateEstimatedRideDurationHours(fromPincode: string, toPincode: string): number {
  const from = parseInt(fromPincode);
  const to = parseInt(toPincode);

//   if (isNaN(from) || isNaN(to)) return 0;
    // console.log(fromPincode,toPincode);
    
  return Math.abs(to - from) % 24;
}