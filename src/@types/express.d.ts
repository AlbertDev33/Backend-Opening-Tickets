// Sobrescrever uma tipagem de dentro do express
declare namespace Express {
  // Sobrescrevendo a interface Request
  export interface Request {
    user: {
      id: string;
    };
  }
}
