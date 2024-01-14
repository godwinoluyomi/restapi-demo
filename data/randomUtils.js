function generateRandomName() {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
    "Katie",
    "Leo",
    "Mia",
    "Nathan",
    "Olivia",
    "Paul",
    "Quinn",
    "Ryan",
    "Sophia",
    "Tom",
  ];
  return getRandomElement(names);
}

function generateRandomAge() {
  return Math.floor(Math.random() * (99 - 18 + 1) + 18);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  generateRandomName,
  generateRandomAge,
};
