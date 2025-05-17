#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs'

/**
 * Полный путь к корню проекта voice-assistant
 * путь до файла `input.wav`, который создается внутри ассистента
 */
const inputPath = process.argv[2];

function transcribe(): Promise<string> {
  return new Promise((resolve, reject) => {
    /* 
      Whisper под капотом поздает одноименный файл input.txt. (на основе input.wav)
      input.txt лежит текст извлеченный с аудио
    */
    if (!inputPath) {
      return void process.exit(1)
    }
    exec(`whisper ${inputPath} --language Russian --fp16 False --model base`, (error, _, stderr) => {
      if (error)
        return reject(stderr);

      const text = fs.readFileSync('./input.txt', 'utf-8');
      resolve(text.trim());
    });
  });
}

async function main() {
  const stdout: string = await transcribe();
  /* 
    Тут важно выкинуть stdout наружу через .log()
    Это необходимо для голосового ассистента, он перехватывает stdout с этого процесса
  */
  console.log(stdout)
}

main();
