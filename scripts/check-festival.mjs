import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const page=readFileSync('index.html','utf8');
for(const route of ['festival/index.html','surfaces/festival/index.html'])assert.equal(readFileSync(route,'utf8'),page);
for(const m of page.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="(\/[^"?#]+)[^"]*"/g))assert.ok(existsSync('.'+m[1]),m[1]);
for(const m of page.matchAll(/<script\b([^>]*)>([^]*?)<\/script>/gi))if(!/src=|application\//.test(m[1]))new vm.Script(m[2]);
for(const file of ['tour.js','register.js','lang.js','rails-badge.js'])new vm.Script(readFileSync('surfaces/'+file,'utf8'));
for(const css of ['surfaces/skaists.css','surfaces/fonts/eternal-fonts.css'])for(const m of readFileSync(css,'utf8').matchAll(/url\(['"]?([^)'"?]+)[^)]*\)/g))assert.ok(existsSync(css.slice(0,css.lastIndexOf('/')+1)+m[1]),m[1]);
for(const m of page.matchAll(/<a\b[^>]*href="https:[^>]*>/g)){assert.match(m[0],/target="_blank"/);assert.match(m[0],/rel="noopener noreferrer"/);}
assert.ok(!page.includes('href="../'));
assert.ok(existsSync('surfaces/lang-corpus.json'));
assert.equal(readFileSync('CNAME','utf8').trim(),'plur.earth');
console.log('PASS: three identical routes, local assets/fonts, executable script syntax, external-link policy and preserved custom domain');
