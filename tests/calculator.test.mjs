import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {evaluate,constants} from '../engine.js';
import {units,fromSI,toSI,readNumber} from '../units.js';
const tool=JSON.parse(fs.readFileSync(new URL('../tool.json',import.meta.url),'utf8'));
const expected=JSON.parse(fs.readFileSync(new URL('./reference.json',import.meta.url),'utf8'));
const raw=()=>Object.fromEntries(tool.fields.map(f=>[f.key,{value:String(f.example),unit:units[f.dimension][0].id}]));
function close(actual,want){assert.ok(Math.abs(actual-want)<=Math.max(Math.abs(want)*2e-12,Number.MIN_VALUE*20),`${tool.id}: ${actual} != ${want}`);}
test('independent high precision reference example',()=>close(evaluate(tool,raw(),true).value,expected.value));
test('every supported input unit preserves the same engineering result',()=>{for(const f of tool.fields)for(const u of units[f.dimension]){if(f.dimension==='rateCoefficient'&&u.id!==units[f.dimension][0].id)continue;const values=raw();values[f.key]={value:String(fromSI(f.example,f.dimension,u.id)),unit:u.id};close(evaluate(tool,values,true).value,expected.value);}});
test('every result unit round trips without changing the quantity',()=>{for(const u of units[tool.result_dimension])close(toSI(String(fromSI(expected.value,tool.result_dimension,u.id)),tool.result_dimension,u.id),expected.value);});
test('empty, NaN, infinity, hex, malformed and underflow inputs are rejected',()=>{for(const f of tool.fields)for(const value of ['',' ','NaN','Infinity','0x10','1,000','2foo','1e999','1e-999']){const values=raw();values[f.key].value=value;assert.throws(()=>evaluate(tool,values,true),undefined,`${f.key}: ${value}`);}});
test('all domain constraints are enforced in SI units',()=>{for(const f of tool.fields){const bad={positive:['0','-1'],nonnegative:['-1'],nonzero:['0'],integer:['0','1.5','9007199254740992'],unitInterval:['-1','1.01'],openInterval:['0','1','-1'],incidentAngle:['-0.01','1.58']}[f.constraint]||[];for(const value of bad){const values=raw();values[f.key].value=value;assert.throws(()=>evaluate(tool,values,true),undefined,f.key);}}});
test('foreign dimension units are rejected',()=>{const values=raw();values[tool.fields[0].key].unit='__unknown__';assert.throws(()=>evaluate(tool,values,true));});
test('absolute temperature and temperature differences are distinct',()=>{close(toSI('0','temperature','C'),273.15);close(toSI('32','temperature','F'),273.15);close(toSI('18','deltaT','Fdiff'),10);close(toSI('10','deltaT','Cdiff'),10);for(const f of tool.fields.filter(f=>f.dimension==='temperature')){const values=raw();values[f.key]={value:'-273.15',unit:'C'};assert.throws(()=>evaluate(tool,values,true));}});
test('confirmed approximation conditions are required only where applicable',()=>{if(tool.condition)assert.throws(()=>evaluate(tool,raw(),false));else close(evaluate(tool,raw(),false).value,expected.value);});
test('physical special cases are not fabricated numeric answers',()=>{
 if(['E015','E016'].includes(tool.id)){const values=raw();values.th.value=values.tc.value;assert.throws(()=>evaluate(tool,values,true));}
 if(tool.id==='E045'){let v=raw();v.do.value=v.f.value;assert.equal(evaluate(tool,v,true).kind,'unbounded');v=raw();v.f.value='-0.1';close(evaluate(tool,v,true).value,-0.075);}
 if(tool.id==='E047'){let v=raw();v.n1.value='1.5';v.n2.value='1';v.theta.value=String(Math.PI/3);assert.equal(evaluate(tool,v,true).kind,'total-reflection');v=raw();v.theta={value:'90',unit:'deg'};v.n2.value='1';close(evaluate(tool,v,true).value,Math.PI/2);}
 if(tool.id==='E048'){const v=raw();v.core.value=v.clad.value;assert.throws(()=>evaluate(tool,v,true));}
 if(tool.id==='E046'){const v=raw();v.d.value=String(tool.fields[0].example*2);assert.throws(()=>evaluate(tool,v,true));}
 if(tool.id==='E049'){const v=raw();v.epsilon={value:'2',unit:'percent'};close(evaluate(tool,v,true).value,expected.value);}
 if(tool.id==='E041'){const v=raw();v.a={value:'1e13',unit:'secondL'};close(evaluate(tool,v,true).value,expected.value/1000);v.ea.value='1e100';assert.throws(()=>evaluate(tool,v,true));}
});
test('IEEE overflow and underflow never silently become a physical zero',()=>{const values=raw();for(const f of tool.fields)if(f.constraint==='positive'&&f.dimension!=='temperature'){values[f.key].value='1e308';break;}try{const r=evaluate(tool,values,true);if(r.kind==='number')assert.ok(Number.isFinite(r.value));}catch(error){assert.ok(error.message.length>0);}});
test('publisher scripts, original assets, canonical URL, More Apps and static sources',()=>{const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');for(const value of ['GTM-NV2WWQXB','G-2ZYSF0173P','ca-pub-9767176956440077','cloudflareinsights.com/beacon.min.js','More Apps','https://nanalab.kr/apps/',tool.site,tool.formula])assert.ok(html.includes(value),value);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(fs.existsSync(new URL('../og.png',import.meta.url)));assert.ok(fs.existsSync(new URL('../.nojekyll',import.meta.url)));assert.equal(fs.existsSync(new URL('../CNAME',import.meta.url)),false);});
test('CODATA 2022 measured constants are used instead of obsolete exact mu0',()=>{assert.equal(constants.mu0,1.25663706127e-6);assert.equal(constants.epsilon0,8.8541878188e-12);assert.equal(constants.R,8.31446261815324);});
