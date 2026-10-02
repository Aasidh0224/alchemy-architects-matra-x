import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const url=process.env.MATRA_X_LIVE_URL || 'https://matra-x-vision-core.base44.app/';
await fs.mkdir('media/raw',{recursive:true});
const start=Date.now();

const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({
  viewport:{width:3840,height:2160},
  deviceScaleFactor:1,
  recordVideo:{dir:'media/raw',size:{width:3840,height:2160}}
});
const page=await context.newPage();

const sleep=ms=>page.waitForTimeout(ms);

async function clickLabel(label){
  const candidates=[
    page.getByRole('button',{name:new RegExp(label,'i')}),
    page.getByRole('link',{name:new RegExp(label,'i')}),
    page.getByText(new RegExp('^\\s*'+label+'\\s*$','i'))
  ];
  for(const loc of candidates){
    try{
      if(await loc.count()){
        await loc.first().scrollIntoViewIfNeeded();
        await loc.first().click({timeout:1800});
        return true;
      }
    }catch{}
  }
  return false;
}

await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
await sleep(5000);

const sections=[
  ['Command Center'],
  ['AI Standardization','Standardization','Standardize'],
  ['Error Detection','Errors','Error'],
  ['Biometric Auth','Biometric','Authentication','Auth'],
  ['Material Catalog','Catalog','Materials'],
  ['Cross-CPSE','Insights','Analytics'],
  ['LIORA','Liora'],
  ['Scan','Events','Activity']
];

for(const labels of sections){
  for(const label of labels){ if(await clickLabel(label)) break; }
  await sleep(3500);
}

try{
  const inputs=page.locator('textarea,input');
  const count=await inputs.count();
  for(let i=0;i<count;i++){
    const el=inputs.nth(i);
    if(await el.isVisible()){
      await el.fill('Explain how MATRA-X prevents unsafe material consolidation.');
      await el.press('Enter');
      await sleep(5000);
      break;
    }
  }
}catch{}

const elapsed=Date.now()-start;
if(elapsed<60000) await sleep(60000-elapsed);

await context.close();
await browser.close();

const names=await fs.readdir('media/raw');
const video=names.find(n=>n.endsWith('.webm'));
if(!video) throw new Error('No Playwright video was produced.');
console.log('LIVE_CAPTURE='+video);