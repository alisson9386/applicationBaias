declare module 'chalk' {
  interface Chalk {
    red: ChalkFunction;
    yellow: ChalkFunction;
    green: ChalkFunction;
    // Adicione outras cores ou estilos que você queira usar
    // Consulte a documentação do chalk para ver todas as opções disponíveis: https://www.npmjs.com/package/chalk
  }

  interface ChalkFunction {
    (text: string): string;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ChalkChain extends ChalkFunction {
    (text: TemplateStringsArray, ...placeholders: any[]): string;
  }

  interface ChalkConstructor extends Chalk {
    new (): Chalk;
  }

  const chalk: ChalkConstructor;

  export = chalk;
}
