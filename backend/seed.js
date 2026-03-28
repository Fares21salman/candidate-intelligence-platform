import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Candidate from "./src/models/Candidate.js";

await mongoose.connect("mongodb://127.0.0.1:27017/candidates");

const skillsList = [
  "React", "Node", "MongoDB", "JavaScript",
  "Python", "SQL", "AWS", "Docker"
];

const locations = ["Chennai", "Bangalore", "Hyderabad", "Mumbai"];

const BATCH_SIZE = 5000;
const TOTAL = 50000; // you can go 100k if needed

async function seed() {
  console.log("Seeding started...");

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const batch = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      batch.push({
        name: faker.person.fullName(),
        skills: faker.helpers.arrayElements(skillsList, 3),
        experience: faker.number.int({ min: 0, max: 10 }),
        location: faker.helpers.arrayElement(locations),
        resumeText: faker.lorem.paragraph()
      });
    }

    await Candidate.insertMany(batch);
    console.log(`Inserted ${i + BATCH_SIZE}`);
  }

  console.log("✅ Done seeding");
  process.exit();
}

seed();