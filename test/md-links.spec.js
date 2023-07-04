const fs = require('fs');
const path = require('path');
const axios = require('axios');
const {
  checkPath,
  itsAbsolute,
  convertAbsolute,
  verifyRouteType,
  extensionCheck,
  readMD,
  extractLinks,
  validateLinks } = require('../src/functions.js');

describe('Test de las funciones', () => {
  describe('checkPath', () => {
    test('debería resolver con la ruta si existe', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';
      return expect(checkPath(route)).resolves.toBe(route);
    });

    test('debería rechazar con un mensaje de error si la ruta no existe', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\noexiste.md';
      return expect(checkPath(route)).rejects.toMatch('La ruta no existe');
    });
  });

  describe('itsAbsolute', () => {
    test('debería resolver con la ruta convertida a absoluta si no es absoluta', () => {
      const route = 'test\\hola.md';
      const expected = path.resolve(route);
      return expect(itsAbsolute(route)).resolves.toBe(expected);
    });

    test('debería resolver con la ruta sin cambios si ya es absoluta', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';
      return expect(itsAbsolute(route)).resolves.toBe(route);
    });
  });

  describe('convertAbsolute', () => {
    test('debería resolver con la ruta convertida a absoluta', () => {
      const route = 'test\\hola.md';
      const expected = path.resolve(route);
      return expect(convertAbsolute(route)).resolves.toBe(expected);
    });
  });

  describe('verifyRouteType', () => {
    test('debería resolver con "archivo" si la ruta es un archivo', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';
      return expect(verifyRouteType(route)).resolves.toBe('archivo');
    });

    test('debería resolver con "directorio" si la ruta es un directorio', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test';
      return expect(verifyRouteType(route)).resolves.toBe('directorio');
    });

    test('debería rechazar con un mensaje de error si la ruta no es un archivo ni un directorio', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\noexiste';
      return expect(verifyRouteType(route)).rejects.toThrowError('La ruta no es ni un archivo ni un directorio');
    });
  });

  describe('extensionCheck', () => {
    test('debería resolver con true si la extensión es .md', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';
      return expect(extensionCheck(route)).resolves.toBe(true);
    });

    test('debería resolver con false si la extensión no es .md', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.txt';
      return expect(extensionCheck(route)).resolves.toBe(false);
    });
  });

  describe('readMD', () => {
    test('debería resolver con los datos del archivo si se lee correctamente', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';
      const expected = '[Markdown](https://es.wikipedia.org/wiki/Markdown), [Node.js](https://nodejs.org/)';

      return readMD(route).then(data => {
        expect(data).toBe(expected);
      });
    });

    test('debería rechazar con un mensaje de error si ocurre algún error al leer el archivo', () => {
      const route = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';

      return readMD(route).catch(error => {
        expect(error).toMatch('error');
      });
    });
  });

  describe('extractLinks', () => {
    test('debería devolver un array de objetos con los enlaces extraídos del contenido', () => {
      const content = 'El contenido del archivo con un [Markdown](https://es.wikipedia.org/wiki/Markdown).';
      const filePath = 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md';
      const expected = [{
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\mikam\\DEV006-md-links\\test\\hola.md'
      }];

      const result = extractLinks(content, filePath);
      expect(result).toEqual(expected);
    });
  });

  describe('validateLinks', () => {
    test('debería devolver un array de objetos con los enlaces validados', () => {
      const links = [
        {
          href: 'https://nodejs.org/',
          text: 'Node',
          file: 'C:\\Users\\mikam\\DEV006-md-links\\test\\holaRoto.md'
        },
        {
          href: 'https:developers.google./v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'C:\\Users\\mikam\\DEV006-md-links\\test\\holaRoto.md'
        }
      ];
      // Aquí puedes simular las respuestas de los enlaces utilizando una biblioteca como nock o jest-fetch-mock
      const expected = [
        {
          href: 'https://nodejs.org/',
          text: 'Node',
          file: 'C:\\Users\\mikam\\DEV006-md-links\\test\\holaRoto.md',
          status: 200,
          ok: 'OK'
        },
        {
          href: 'https:developers.google./v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'C:\\Users\\mikam\\DEV006-md-links\\test\\holaRoto.md',
          status: null,
          ok: 'fail'
        }
      ];

      return validateLinks(links).then(result => {
        expect(result).toEqual(expected);
      });
    });
  });
});