import {readFileSync,writeFileSync,mkdirSync,cpSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {execFileSync} from 'node:child_process';
const src=resolve(process.argv[2]||'../wt-codex-genealogy-eternalization');
const sourceCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:src,encoding:'utf8'}).trim();
const put=(p,s)=>{mkdirSync(dirname(p),{recursive:true});writeFileSync(p,s);};
for(const name of ['skaists.css','tour.js','register.js','lang.js','lang-corpus.json','rails-badge.js']){
 let text=readFileSync(resolve(src,'surfaces',name),'utf8');
 if(name==='tour.js'){
  text=text.replace(/var R=location.protocol==='file:'[^]*?;\n/,"var R='https://skaists.dev/surfaces/';\n");
  text=text.replace("var L=[['⌂',''],", "var L=[['⌂',''],");
 }
 if(name==='register.js')text=text.replace("new URL('index.html',script&&script.src||location.href)","new URL('../',script&&script.src||location.href)");
 if(name==='rails-badge.js')text=text.replace("var B = (location.pathname.indexOf('/beehive-nature/') === 0 ? '/beehive-nature/' : '/');", "var B = 'https://skaists.dev/';");
 put('surfaces/'+name,text);
}
cpSync(resolve(src,'surfaces/fonts'),'surfaces/fonts',{recursive:true});
cpSync(resolve(src,'LICENSE'),'LICENSE');cpSync(resolve(src,'NOTICE'),'NOTICE');
let html=readFileSync(resolve(src,'surfaces/festival/index.html'),'utf8');
html=html.replace('<title>the festival — the attendee experience</title>', '<title>PLUR · the festival — the attendee experience</title>\n<link rel="canonical" href="https://plur.earth/">');
html=html.replace(/(<(?:script|link)\b[^>]*(?:src|href)=")\.\.\//g,'$1/surfaces/');
html=html.replace(/<a\b([^>]*?)href="\.\.\/([^"]+)"([^>]*)>/g,(_,pre,path,post)=>`<a${pre}href="https://skaists.dev/surfaces/${path}"${post} target="_blank" rel="noopener noreferrer">`);
html=html.replace(/<a\b([^>]*?)href="(https:[^"]+)"([^>]*)>/g,(_,pre,url,post)=>`<a${pre}href="${url}"${post.replace(/\s+(?:target|rel)="[^"]*"/g,'')} target="_blank" rel="noopener noreferrer">`);
html=html.replace('<body>','<body><p style="text-align:center;margin:12px"><a href="/">PLUR home</a> · Festival experience · Links to other estate apps open a new tab.</p>');
put('index.html',html);put('festival/index.html',html);put('surfaces/festival/index.html',html);
put('.nojekyll','');
put('SOURCE.json',JSON.stringify({repository:'https://github.com/beehive-nature/beehive-nature',commit:sourceCommit,surface:'surfaces/festival/index.html',localAssets:'styles, fonts, language corpus and view controls',externalApps:'https://skaists.dev/surfaces/',customDomain:'plur.earth'},null,2)+'\n');
console.log('Published festival source '+sourceCommit+' with local shared assets');
