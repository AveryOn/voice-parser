#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs'

function record(duration = 5): Promise<boolean> {
return new Promise((resolve, reject) => {
    exec(`arecord -f cd -c 1 -r 16000 -d ${duration} input.wav`, (err) => {
        if (err) {
            return reject(err); 
        }
        resolve(true);
    });
    });
}

function transcribe(): Promise<string> {
  return new Promise((resolve, reject) => {
    /* 
      Whisper под капотом поздает одноименный файл input.txt. (на основе input.wav)
      input.txt лежит текст извлеченный с аудио
    */
    exec('whisper input.wav --language Russian --fp16 False --model base', (error, _, stderr) => {
      if (error) 
        return reject(stderr);

      const text = fs.readFileSync('./input.txt', 'utf-8');
      resolve(text.trim());
    });
  });
}

async function main() {
  await record(15);
  const stdout: string = await transcribe();
  /* 
    Тут важно выкинуть stdout наружу через .log()
    Это необходимо для голосового ассистента, он перехватывает stdout с этого процесса
  */
  console.log(stdout)
}

main();
