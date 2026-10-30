import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const docs=path.join(root,'docs');
const failures=[];
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
for(const file of walk(docs).filter(f=>/\.(?:js|mjs)$/.test(f))){const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status!==0)failures.push(path.relative(root,file)+': '+r.stderr)}
const html=fs.readFileSync(path.join(docs,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="(\/portl\/[^"?#]+)(?:\?[^"#]*)?"/g)){const rel=match[1].slice('/portl/'.length);if(!fs.existsSync(path.join(docs,rel)))failures.push('Missing resource: '+rel)}
const layout=fs.readFileSync(path.join(docs,'_next/static/chunks/app/layout-6d0f10cc5e82d4d4.js'),'utf8');
if(layout.includes('api.hsforms.com')||layout.includes('api.ipify.org'))failures.push('Original form service remains');
if(!layout.includes('mailto:1810438404@qq.com'))failures.push('Public contact email missing');
if(!html.includes('Lu Kehao — Portfolio'))failures.push('Portfolio title missing');
const detail=fs.readFileSync(path.join(docs,'projects/lookie/index.html'),'utf8');
if(/__PROJECT_[A-Z]+__/.test(detail)||!detail.includes('<video controls playsinline'))failures.push('LOOKIE video page is incomplete');
for(const match of detail.matchAll(/(?:src|poster)="(\/portl\/[^"?#]+)"/g))if(!fs.existsSync(path.join(docs,match[1].slice('/portl/'.length))))failures.push('Missing video page resource: '+match[1]);
const pdfDetail=fs.readFileSync(path.join(docs,'projects/yadea/index.html'),'utf8');
if(/__(?:PROJECT_[A-Z]+|PDF_PAGES)__/.test(pdfDetail)||(pdfDetail.match(/class="pdf-page"/g)||[]).length!==3)failures.push('Yadea PDF preview is incomplete');
for(const match of pdfDetail.matchAll(/(?:src|href)="(\/portl\/assets\/[^"?#]+)"/g))if(!fs.existsSync(path.join(docs,match[1].slice('/portl/'.length))))failures.push('Missing PDF page resource: '+match[1]);
const tomatoDetail=fs.readFileSync(path.join(docs,'projects/tomato/index.html'),'utf8');
if(/__(?:PROJECT_[A-Z]+|PDF_PAGES)__/.test(tomatoDetail)||(tomatoDetail.match(/class="pdf-page"/g)||[]).length!==2)failures.push('Tomato PDF preview is incomplete');
for(const match of tomatoDetail.matchAll(/(?:src|href)="(\/portl\/assets\/[^"?#]+)"/g))if(!fs.existsSync(path.join(docs,match[1].slice('/portl/'.length))))failures.push('Missing Tomato PDF resource: '+match[1]);
const uxDetail=fs.readFileSync(path.join(docs,'projects/zouqi-go/index.html'),'utf8');
if(/__(?:PROJECT_[A-Z]+|PDF_PAGES)__/.test(uxDetail)||(uxDetail.match(/class="pdf-page"/g)||[]).length!==20)failures.push('Zouqi GO PDF preview is incomplete');
for(const match of uxDetail.matchAll(/(?:src|href)="(\/portl\/assets\/[^"?#]+)"/g))if(!fs.existsSync(path.join(docs,match[1].slice('/portl/'.length))))failures.push('Missing UX PDF resource: '+match[1]);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log('Checks passed: JavaScript syntax, static resource paths, personal title and contact handler.');
