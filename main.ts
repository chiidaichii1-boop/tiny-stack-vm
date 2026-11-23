import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function run(p:Buffer,g:Buffer):[Buffer,number]{
const m=new Int32Array(256),s=new Int32Array(257),c=new Int32Array(65),o=Buffer.alloc(65536);
let sp=0,cp=0,ol=0,pc=0,n=0,ip=0;
const r=(e:number):[Buffer,number]=>[o.subarray(0,ol),e];
const off=()=>{const q=p[pc+1]|p[pc+2]<<8;return q>32767?q-65536:q};
for(;;){
if(n>=1e6)return r(10);
if(pc<0||pc>=p.length)return r(9);
const b=p[pc];
if(!(b<8||(b>=16&&b<=30)||(b>=32&&b<=34)||(b>=48&&b<=52)||b===64||b===65||(b>=80&&b<=83)))return r(5);
let k=0;
if(b===1)k=1;else if(b===2)k=4;else if(b>=48&&b<=51)k=2;
if(pc+1+k>p.length)return r(9);
const x=pc+1+k;
switch(b){
case 0:return r(0);
case 1:if(sp>255)return r(3);{const v=p[pc+1];s[sp++]=v>127?v-256:v;}break;
case 2:if(sp>255)return r(3);s[sp++]=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;break;
case 3:if(sp<1)return r(2);sp--;break;
case 4:if(sp<1)return r(2);if(sp>255)return r(3);s[sp]=s[sp-1];sp++;break;
case 5:if(sp<2)return r(2);{const t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t;}break;
case 6:if(sp<2)return r(2);if(sp>255)return r(3);s[sp]=s[sp-2];sp++;break;
case 7:if(sp<3)return r(2);{const t=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=t;}break;
case 16:if(sp<2)return r(2);s[sp-2]=s[sp-2]+s[sp-1]|0;sp--;break;
case 17:if(sp<2)return r(2);s[sp-2]=s[sp-2]-s[sp-1]|0;sp--;break;
case 18:if(sp<2)return r(2);s[sp-2]=Math.imul(s[sp-2],s[sp-1]);sp--;break;
case 19:if(sp<2)return r(2);{const y=s[sp-1];if(!y)return r(4);s[sp-2]=Math.trunc(s[sp-2]/y)|0;sp--;}break;
case 20:if(sp<2)return r(2);{const y=s[sp-1];if(!y)return r(4);s[sp-2]=s[sp-2]%y;sp--;}break;
case 21:if(sp<2)return r(2);{const y=s[sp-1];if(!y)return r(4);s[sp-2]=Math.trunc((s[sp-2]>>>0)/(y>>>0))|0;sp--;}break;
case 22:if(sp<2)return r(2);{const y=s[sp-1];if(!y)return r(4);s[sp-2]=(s[sp-2]>>>0)%(y>>>0)|0;sp--;}break;
case 23:if(sp<1)return r(2);s[sp-1]=-s[sp-1]|0;break;
case 24:if(sp<2)return r(2);s[sp-2]=s[sp-2]&s[sp-1];sp--;break;
case 25:if(sp<2)return r(2);s[sp-2]=s[sp-2]|s[sp-1];sp--;break;
case 26:if(sp<2)return r(2);s[sp-2]=s[sp-2]^s[sp-1];sp--;break;
case 27:if(sp<1)return r(2);s[sp-1]=~s[sp-1];break;
case 28:if(sp<2)return r(2);s[sp-2]=s[sp-2]<<s[sp-1];sp--;break;
case 29:if(sp<2)return r(2);s[sp-2]=s[sp-2]>>s[sp-1];sp--;break;
case 30:if(sp<2)return r(2);s[sp-2]=s[sp-2]>>>s[sp-1];sp--;break;
case 32:if(sp<2)return r(2);s[sp-2]=s[sp-2]===s[sp-1]?1:0;sp--;break;
case 33:if(sp<2)return r(2);s[sp-2]=s[sp-2]<s[sp-1]?1:0;sp--;break;
case 34:if(sp<2)return r(2);s[sp-2]=(s[sp-2]>>>0)<(s[sp-1]>>>0)?1:0;sp--;break;
case 48:pc=x+off();n++;continue;
case 49:if(sp<1)return r(2);{const v=s[--sp];pc=v===0?x+off():x;n++;continue;}
case 50:if(sp<1)return r(2);{const v=s[--sp];pc=v!==0?x+off():x;n++;continue;}
case 51:if(cp>63)return r(7);c[cp++]=x;pc=p[pc+1]|p[pc+2]<<8;n++;continue;
case 52:if(cp<1)return r(8);pc=c[--cp];n++;continue;
case 64:if(sp<1)return r(2);{const a=s[sp-1];if(a<0||a>255)return r(6);s[sp-1]=m[a];}break;
case 65:if(sp<2)return r(2);{const a=s[--sp],v=s[--sp];if(a<0||a>255)return r(6);m[a]=v;}break;
case 80:if(sp<1)return r(2);{const v=s[--sp],t=String(v);if(ol+t.length>65536)return r(11);o.write(t,ol);ol+=t.length;}break;
case 81:if(sp<1)return r(2);if(ol>65535)return r(11);o[ol++]=s[--sp]&255;break;
case 82:if(sp>255)return r(3);s[sp++]=ip<g.length?g[ip++]:-1;break;
case 83:if(sp<1)return r(2);return r(s[--sp]&255);
}
pc=x;n++;
}
}
for(const d of readdirSync(I).sort()){
const a=join(I,d),q=join(O,d);let u=Buffer.alloc(0),e=0;
try{let g:Buffer;try{g=readFileSync(join(a,'input.bin'))}catch{g=Buffer.alloc(0)}[u,e]=run(readFileSync(join(a,'program.bin')),g)}catch{}
mkdirSync(q,{recursive:true});
writeFileSync(join(q,'stdout.bin'),u);
writeFileSync(join(q,'exit.txt'),e+'\n');
}
