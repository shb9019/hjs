function resolveAfterKSeconds(k) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, k * 1000);
  });
}

async function asyncCall(a, b, c) {
  console.log('calling');
  const waitTime = a + b + c;
  const result = await resolveAfterKSeconds(waitTime);
  console.log(result);
}

await asyncCall(2)(4)(1);
await asyncCall(2, 4)(1);
await asyncCall(2, 4, 1);
