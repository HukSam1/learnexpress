import { prisma } from "../lib/prisma.js";
import { faker } from '@faker-js/faker';

for(let i=0; i < 10; i++) {
const cat = await prisma.cat.create({
    data: {
        name: faker.animal.petName(),
        birthyear: faker.number.int({ min: 1980, max: 2026 }),
        gender: faker.person.sex(),
        color: faker.color.human(),
        eyes: faker.color.human(),
        spayed: Math.round(Math.random()) === 1
    },
});
}
//node bin/seed.js