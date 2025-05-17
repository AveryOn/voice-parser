#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs'

function record(duration = 5): Promise<void> {
return new Promise((resolve, reject) => {
    console.log('🎙 Запись началась...');
    exec(`arecord -f cd -c 1 -r 16000 -d ${duration} input.wav`, (err) => {
        if (err) {
            console.error('❌ Ошибка записи:', err);
            return reject(err); 
        }
        console.log('🎙 Запись завершена');
        resolve();
    });
    });
}

function transcribe() {
  return new Promise((resolve, reject) => {
    /* 
      Whisper под капотом поздает одноименный файл input.txt. (на основе input.wav)
      input.txt лежит текст извлеченный с аудио
    */
    exec('whisper input.wav --language Russian --fp16 False --model base', (error, stdout, stderr) => {
      if (error) return reject(stderr);
      console.log('📝 Распознавание завершено!_', stdout);
      /* 
        Тут важно выкинуть stdout наружу.
        Это необходимо для голосового ассистента, он перехватывает stdout с этого процесса
      */
      console.log(stdout)
      const text = fs.readFileSync('./input.txt', 'utf-8');
      resolve(text.trim());
    });
  });
}

async function main() {
  await record(15);
  const text = await transcribe();
  console.log('📣 Ты сказал:', text);
}

main();
