/* Original scalar models; no external calculation package or property dataset. */
import {toSI} from './units.js';
export const constants=Object.freeze({R:8.31446261815324,kB:1.380649e-23,h:6.62607015e-34,c:299792458,e:1.602176634e-19,epsilon0:8.8541878188e-12,mu0:1.25663706127e-6,sigma:5.670374419e-8});
function check(value,rule,label){
 const good=rule==='positive'?value>0:rule==='nonnegative'?value>=0:rule==='nonzero'?value!==0:rule==='integer'?Number.isSafeInteger(value)&&value>0:rule==='unitInterval'?value>=0&&value<=1:rule==='openInterval'?value>0&&value<1:rule==='incidentAngle'?value>=0&&value<=Math.PI/2:true;
 if(!good){const hints={positive:'0보다 커야 합니다.',nonnegative:'0 이상이어야 합니다.',nonzero:'0일 수 없습니다.',integer:'양의 안전한 정수여야 합니다.',unitInterval:'0~1 범위여야 합니다.',openInterval:'0보다 크고 1보다 작아야 합니다.',incidentAngle:'법선 기준 0~90° 범위여야 합니다.'};throw Error(label+': '+hints[rule]);}
}
export function evaluate(tool,raw,confirmed=false){
 const x={};for(const f of tool.fields){const value=raw[f.key];if(!value)throw Error(f.label+': 값이 필요합니다.');try{x[f.key]=toSI(value.value,f.dimension,value.unit);check(x[f.key],f.constraint,f.label);}catch(e){throw Error(e.message.startsWith(f.label)?e.message:f.label+': '+e.message);}}
 if(tool.condition&&!confirmed)throw Error('적용 조건 확인란에 체크하세요.');
 const {R,kB,h,c,epsilon0,mu0,sigma}=constants;
 let value;let exactZero=false;
 switch(tool.id){
 case 'E001':value=x.rho*x.v*x.l/x.mu;exactZero=x.v===0;break;
 case 'E002':value=x.v/x.a;exactZero=x.v===0;break;
 case 'E003':value=x.rho*x.v*x.v/2;exactZero=x.v===0;break;
 case 'E004':value=x.a*x.v;exactZero=x.v===0;break;
 case 'E005':value=x.rho*x.q;exactZero=x.q===0;break;
 case 'E006':value=x.rho*x.g*x.h;exactZero=x.h===0;break;
 case 'E007':value=128*x.mu*x.l*x.q/(Math.PI*x.d**4);exactZero=x.q===0;break;
 case 'E008':value=x.dp*x.q;exactZero=x.dp===0||x.q===0;break;
 case 'E009':value=x.mu/x.rho;break;
 case 'E010':value=x.cd*x.rho*x.v*x.v*x.a/2;exactZero=x.cd===0||x.v===0;break;
 case 'E011':value=x.k*x.a*x.dt/x.l;exactZero=x.dt===0;break;
 case 'E012':value=x.h*x.a*(x.ts-x.tf);exactZero=x.ts===x.tf;break;
 case 'E013':exactZero=x.epsilon===0||x.ts===x.te;value=exactZero?0:x.epsilon*sigma*x.a*(x.ts-x.te)*(x.ts+x.te)*(x.ts*x.ts+x.te*x.te);break;
 case 'E014':value=x.alpha*x.l*x.dt;exactZero=x.alpha===0||x.dt===0;break;
 case 'E015':if(x.th<=x.tc)throw Error('고온 열원 온도가 저온 열원 온도보다 높아야 합니다.');value=(x.th-x.tc)/x.th;break;
 case 'E016':if(x.th<=x.tc)throw Error('고온 열원 온도가 저온 열원 온도보다 높아야 합니다.');value=x.tc/(x.th-x.tc);break;
 case 'E017':value=x.rho*x.l/x.a;break;
 case 'E018':value=epsilon0*x.er*x.a/x.d;break;
 case 'E019':value=mu0*x.n*x.n*x.a/x.l;break;
 case 'E020':value=x.r*x.c;break;
 case 'E021':value=x.l/x.r;break;
 case 'E022':value=1/(2*Math.PI*x.f*x.c);break;
 case 'E023':value=2*Math.PI*x.f*x.l;break;
 case 'E024':value=1/(2*Math.PI*Math.sqrt(x.l*x.c));break;
 case 'E025':value=x.vin*(x.r2/(x.r1+x.r2));exactZero=x.vin===0;break;
 case 'E026':value=10*(Math.log10(x.pout)-Math.log10(x.pin));exactZero=x.pout===x.pin;break;
 case 'E027':value=x.i*x.omega*x.omega/2;exactZero=x.omega===0;break;
 case 'E028':value=x.t*x.omega;exactZero=x.t===0||x.omega===0;break;
 case 'E029':value=x.v*x.v/x.r;exactZero=x.v===0;break;
 case 'E030':value=Math.sqrt(x.k/x.m)/(2*Math.PI);break;
 case 'E031':value=2*Math.PI*Math.sqrt(x.l/x.g);break;
 case 'E032':value=x.f/x.a;exactZero=x.f===0;break;
 case 'E033':value=16*x.t/(Math.PI*x.d**3);exactZero=x.t===0;break;
 case 'E034':value=x.f*x.l/(x.a*x.e);exactZero=x.f===0;break;
 case 'E035':value=-x.e*x.alpha*x.dt;exactZero=x.alpha===0||x.dt===0;break;
 case 'E036':value=x.m*x.c/x.i;exactZero=x.m===0;break;
 case 'E037':value=x.t*x.l/(x.g*x.j);exactZero=x.t===0;break;
 case 'E038':value=Math.PI**2*x.e*x.i/x.l**2;break;
 case 'E039':value=x.p*x.m/(R*x.t);break;
 case 'E040':value=kB*x.t/(Math.SQRT2*Math.PI*x.d**2*x.p);break;
 case 'E041':value=x.a*Math.exp(-x.ea/(R*x.t));break;
 case 'E042':value=Math.LN2/x.k;break;
 case 'E043':value=x.i*x.c*R*x.t;exactZero=x.c===0;break;
 case 'E044':value=h*c/x.lambda;break;
 case 'E045':if(Math.abs(x.do-x.f)<=Number.EPSILON*8*Math.max(Math.abs(x.do),Math.abs(x.f)))return {kind:'unbounded',message:'물체가 초점면에 있어 유한한 상거리가 없습니다.'};value=1/(1/x.f-1/x.do);break;
 case 'E046':if(x.d/x.lambda<10)throw Error('작은 각도 근사를 위해 이 앱은 개구 지름 D ≥ 10λ에서만 계산합니다.');value=1.22*x.lambda/x.d;break;
 case 'E047':{const sine=(x.n1/x.n2)*Math.sin(x.theta);if(sine>1+16*Number.EPSILON)return {kind:'total-reflection',message:'전반사 조건입니다. 진행하는 굴절광의 각도는 없습니다.'};value=Math.asin(Math.min(1,sine));exactZero=x.theta===0;break;}
 case 'E048':if(x.core<=x.clad)throw Error('코어 굴절률이 클래딩 굴절률보다 커야 합니다.');value=Math.sqrt((x.core-x.clad)*(x.core+x.clad));break;
 case 'E049':value=-x.tau*Math.log(x.epsilon);break;
 case 'E050':value=x.c/(2*Math.sqrt(x.m*x.k));exactZero=x.c===0;break;
 default:throw Error('계산 모델을 찾을 수 없습니다.');
 }
 if(!Number.isFinite(value))throw Error('계산값이 브라우저 수치 표현 범위를 벗어났습니다. 입력 크기와 단위를 확인하세요.');
 if(value===0&&!exactZero)throw Error('계산 중 언더플로 또는 정밀도 손실이 발생했습니다. 입력 크기를 확인하세요.');
 return {kind:'number',value:Object.is(value,-0)?0:value};
}
