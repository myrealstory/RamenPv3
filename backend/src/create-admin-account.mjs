import bcrypt from 'bcryptjs'

const hash = await bcrypt.hash('aaaaaa', 10);

console.log({hash});