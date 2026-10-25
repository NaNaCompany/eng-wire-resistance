import {tool} from './tool-config.js';
import {units,fromSI,unitFor} from './units.js';
import {evaluate} from './engine.js';
const form=document.getElementById('calculator'),result=document.getElementById('result'),valueNode=document.getElementById('result-value'),status=document.getElementById('status'),outputUnit=document.getElementById('output-unit'),outputLabel=document.getElementById('output-unit-label');
let last=null;
function numberText(value){const a=Math.abs(value);return a!==0&&(a<1e-4||a>=1e9)?value.toExponential(8).replace(/\.?0+e/,'e'):new Intl.NumberFormat('ko-KR',{maximumSignificantDigits:9}).format(value);}
function clearResult(message='입력 후 계산하기를 누르세요.'){last=null;result.removeAttribute('data-value-si');valueNode.textContent='—';outputLabel.textContent='';status.textContent=message;status.className='status';}
function show(){
 if(!last)return;
 if(last.kind!=='number'){valueNode.textContent='결과 없음';outputLabel.textContent='';status.textContent=last.message;status.className='status notice';result.removeAttribute('data-value-si');return;}
 try{
 const id=tool.id==='E041'?form.elements['unit-a'].value:outputUnit.value;
 const shown=fromSI(last.value,tool.result_dimension,id);
 valueNode.textContent=numberText(shown);outputLabel.textContent=unitFor(tool.result_dimension,id).label;
 result.dataset.valueSi=String(last.value);status.textContent='계산 완료 · '+tool.result_label;status.className='status success';
 }catch(e){valueNode.textContent='표시 범위 초과';result.removeAttribute('data-value-si');outputLabel.textContent='';status.textContent=e.message;status.className='status error';}
}
form.addEventListener('submit',event=>{
 event.preventDefault();clearResult();
 const raw=Object.fromEntries(tool.fields.map(f=>[f.key,{value:form.elements[f.key].value,unit:form.elements['unit-'+f.key].value}]));
 try{last=evaluate(tool,raw,Boolean(form.elements.conditions?.checked));show();}
 catch(e){status.textContent=e.message;status.className='status error';}
});
form.addEventListener('input',()=>clearResult('입력이 변경되었습니다. 다시 계산하세요.'));
form.addEventListener('change',()=>clearResult('입력이 변경되었습니다. 다시 계산하세요.'));
outputUnit.addEventListener('change',show);
document.getElementById('example').addEventListener('click',()=>{
 for(const f of tool.fields){form.elements[f.key].value=f.display_value;form.elements['unit-'+f.key].value=f.display_unit;}
 if(form.elements.conditions)form.elements.conditions.checked=false;
 clearResult(tool.condition?'예제를 넣었습니다. 적용 조건을 확인한 뒤 계산하세요.':'예제를 넣었습니다. 계산하기를 누르세요.');
});
document.getElementById('reset').addEventListener('click',()=>{for(const f of tool.fields)form.elements[f.key].value='';if(form.elements.conditions)form.elements.conditions.checked=false;clearResult();form.elements[tool.fields[0].key].focus();});
document.getElementById('copy-result').addEventListener('click',async()=>{if(!last||last.kind!=='number'||!result.hasAttribute('data-value-si')){status.textContent='먼저 유효한 계산을 완료하세요.';return;}try{await navigator.clipboard.writeText(tool.result_label+': '+valueNode.textContent+' '+outputLabel.textContent);status.textContent='결과를 복사했습니다.';}catch{status.textContent='복사하지 못했습니다. 표시된 결과를 선택해 복사하세요.';}});
if(tool.id==='E041')document.getElementById('output-control').hidden=true;
document.documentElement.classList.add('app-ready');
