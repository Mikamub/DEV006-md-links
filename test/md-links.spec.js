const { mdLinks } = require("../src/index.js");

const path = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';
const options = { validate: true };

describe("mdLinks", () => {
  it("Deberia retornar una promesa que se devuelve con array de objetos", (done) => {
    const result = mdLinks(path, options);
    expect(result).resolves.toEqual([
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md',
        status: 200,
        ok: 'OK'
      }
    ]).then(done);
  });
});
