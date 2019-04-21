// 电影院通过问前面的人的知道自己多少排
// 递归方式
// fn = f(n-1)+1
function seekHowOrderRecursional(n) {
  if (n == 1) return 1;
  return seekHowOrderRecursional(n - 1) + 1;
}
console.log("seekHowOrderRecursional", seekHowOrderRecursional(10));
// 非递归方位
function seekHowOrderLoop(n) {
  let ret = 1;
  for (let i = 2; i <= n; i++) {
    ret = ret + 1;
  }
  return ret;
}
console.log("seekHowOrderLoop", seekHowOrderLoop(10));

// 由 n 的台阶，一次可以走1步或2步，请问有多少种走法。
// 递归的方式
function getStepForLadderRecursional(n) {
  if (n == 1) return 1;
  if (n == 2) return 2;
  return getStepForLadderRecursional(n - 1) + getStepForLadderRecursional(n - 2);
}
// 循环的方式
function getStepForLadderLoop(n) {
  if (n == 1) return 1;
  if (n == 2) return 2;
  let ret = 0;
  let pre = 2;
  let prepre = 1;
  for (let i = 3; i <= n; i++) {
    ret = pre + prepre;
    prepre = pre;
    pre = ret;
  }
  return ret;
}
console.log("getStepForLadderRecursional", getStepForLadderRecursional(4));
console.log("getStepForLadderLoop", getStepForLadderLoop(4));
