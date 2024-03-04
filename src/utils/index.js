export function testNumber(number) {
  const regex = /^[5-9]\d{9}$/;
  return regex.test(number);
}
