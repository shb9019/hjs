function resolveAfterKSeconds(k) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, k * 1000);
  });
}

const asyncCall = async function (a, b, c) {
  console.log('calling');
  const waitTime = a + b + c;
  const result = await resolveAfterKSeconds(waitTime);
  console.log(result);
}
