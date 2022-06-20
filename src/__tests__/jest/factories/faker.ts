function getRandomInt(min = 1, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class faker {
  get internet() {
    return {
      email: () => `test${getRandomInt()}@gmail.com`,
      userName: () => `test${getRandomInt()}`,
      password: () => `12345${getRandomInt()}`,
    };
  }
}
export const fakerData = new faker();
