export default interface Contact {
  id: string,
  name: string,
  email: string,
  birth: Date,
  occupation: 'Médico' | 'Professor' | 'Analista Sistemas';
}
