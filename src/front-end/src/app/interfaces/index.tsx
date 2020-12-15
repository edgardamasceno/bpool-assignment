export interface IContact {
  _id: string,
  name: string,
  email: string,
  birth: Date,
  occupation: 'Médico' | 'Professor' | 'Analista Sistemas' | 'Selecione';
}

export interface Dictionary<T> {
  [key: string]: T;
}
