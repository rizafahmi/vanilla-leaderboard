function basic_calc$add(a, b) {
  return a + b;
}

function basic_calc$mul(a, b) {
  return a * b;
}

function advance_calc$squared(a) {
  return basic_calc$mul(a, a);
}

console.log(basic_calc$add(1, 3));
console.log(basic_calc$mul(2, 4));
console.log(advance_calc$squared(4));
