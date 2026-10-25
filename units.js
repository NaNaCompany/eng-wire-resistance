/* Original unit definitions. Offset conversion is confined to absolute temperatures. */
const u=(id,label,scale=1,offset=0)=>({id,label,scale,offset});
export const units={
 ratio:[u('1','무차원')],fraction:[u('1','비율'),u('percent','%',0.01)],turns:[u('turn','회')],decibel:[u('db','dB')],
 density:[u('kgm3','kg/m³'),u('gcm3','g/cm³',1000),u('kgL','kg/L',1000)],
 speed:[u('ms','m/s'),u('kmh','km/h',1/3.6),u('cms','cm/s',0.01)],
 length:[u('m','m'),u('cm','cm',0.01),u('mm','mm',0.001),u('um','μm',1e-6),u('nm','nm',1e-9)],
 area:[u('m2','m²'),u('cm2','cm²',1e-4),u('mm2','mm²',1e-6)],
 viscosity:[u('Pas','Pa·s'),u('mPas','mPa·s',1e-3),u('cP','cP',1e-3)],
 flow:[u('m3s','m³/s'),u('Lmin','L/min',1e-3/60),u('Ls','L/s',1e-3),u('m3h','m³/h',1/3600)],
 massFlow:[u('kgs','kg/s'),u('kgh','kg/h',1/3600),u('gs','g/s',1e-3)],
 acceleration:[u('ms2','m/s²'),u('cms2','cm/s²',0.01)],
 pressure:[u('Pa','Pa'),u('kPa','kPa',1e3),u('MPa','MPa',1e6),u('GPa','GPa',1e9),u('bar','bar',1e5),u('atm','atm',101325)],
 power:[u('W','W'),u('kW','kW',1e3),u('MW','MW',1e6)],
 kinematic:[u('m2s','m²/s'),u('mm2s','mm²/s',1e-6),u('cSt','cSt',1e-6)],
 conductivity:[u('WmK','W/(m·K)'),u('WcmK','W/(cm·K)',100)],
 convection:[u('Wm2K','W/(m²·K)'),u('kWm2K','kW/(m²·K)',1000)],
 temperature:[u('K','K'),u('C','°C',1,273.15),u('F','°F',5/9,459.67)],
 deltaT:[u('Kdiff','K 차이'),u('Cdiff','°C 차이'),u('Fdiff','°F 차이',5/9)],
 expansion:[u('perK','1/K'),u('microK','10⁻⁶/K',1e-6)],
 resistivity:[u('ohmm','Ω·m'),u('microohmm','μΩ·m',1e-6),u('ohmmm2m','Ω·mm²/m',1e-6)],
 resistance:[u('ohm','Ω'),u('kohm','kΩ',1e3),u('Mohm','MΩ',1e6)],
 capacitance:[u('F','F'),u('mF','mF',1e-3),u('uF','μF',1e-6),u('nF','nF',1e-9),u('pF','pF',1e-12)],
 inductance:[u('H','H'),u('mH','mH',1e-3),u('uH','μH',1e-6)],
 time:[u('s','s'),u('ms','ms',1e-3),u('us','μs',1e-6),u('min','min',60),u('h','h',3600)],
 frequency:[u('Hz','Hz'),u('kHz','kHz',1e3),u('MHz','MHz',1e6),u('GHz','GHz',1e9)],
 voltage:[u('V','V'),u('mV','mV',1e-3),u('kV','kV',1e3)],
 massInertia:[u('kgm2','kg·m²'),u('gcm2','g·cm²',1e-7)],
 angularSpeed:[u('rads','rad/s'),u('rpm','rpm',Math.PI/30),u('degs','°/s',Math.PI/180)],
 rotation:[u('rpm','rpm'),u('rps','rev/s',60),u('rads','rad/s',30/Math.PI)],
 energy:[u('J','J'),u('kJ','kJ',1e3),u('eV','eV',1.602176634e-19)],
 torque:[u('Nm','N·m'),u('Nmm','N·mm',1e-3),u('kNm','kN·m',1e3)],
 force:[u('N','N'),u('kN','kN',1e3)],mass:[u('kg','kg'),u('g','g',1e-3)],
 stiffness:[u('Nm','N/m'),u('Nmm','N/mm',1e3),u('kNm','kN/m',1e3)],
 areaInertia:[u('m4','m⁴'),u('cm4','cm⁴',1e-8),u('mm4','mm⁴',1e-12)],
 angle:[u('rad','rad'),u('deg','°',Math.PI/180),u('arcmin','′',Math.PI/10800),u('arcsec','″',Math.PI/648000)],
 molarMass:[u('kgmol','kg/mol'),u('gmol','g/mol',1e-3)],
 activation:[u('Jmol','J/mol'),u('kJmol','kJ/mol',1000)],
 inverseTime:[u('pers','s⁻¹'),u('permin','min⁻¹',1/60),u('perh','h⁻¹',1/3600)],
 concentration:[u('molm3','mol/m³'),u('molL','mol/L',1000),u('mmolL','mmol/L')],
 damping:[u('Nsm','N·s/m'),u('kNsm','kN·s/m',1000)],
 rateCoefficient:[u('first','s⁻¹'),u('secondSI','m³/(mol·s)'),u('secondL','L/(mol·s)',1e-3),u('thirdSI','m⁶/(mol²·s)'),u('thirdL','L²/(mol²·s)',1e-6),u('custom','사용자 정의 A 단위')],
};
export function unitFor(dimension,id){const unit=units[dimension]?.find(u=>u.id===id);if(!unit)throw Error('지원하지 않는 단위입니다.');return unit;}
export function readNumber(value){
 const str=String(value).trim().replaceAll('−','-');
 if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(str))throw Error('숫자를 입력하세요. 지수 표기는 가능하며 쉼표는 제외합니다.');
 const num=Number(str);if(!Number.isFinite(num))throw Error('표현 가능한 유한한 숫자를 입력하세요.');
 if(num===0&&/[1-9]/.test(str.split(/e/i)[0]))throw Error('입력값이 브라우저의 수치 표현 범위보다 작습니다.');
 return num;
}
export function toSI(value,dimension,id){const n=readNumber(value),u=unitFor(dimension,id);const out=(n+u.offset)*u.scale;if(!Number.isFinite(out))throw Error('단위 변환값이 수치 표현 범위를 벗어났습니다.');if(n!==0&&u.offset===0&&out===0)throw Error('단위 변환 중 수치가 너무 작아졌습니다.');return out;}
export function fromSI(value,dimension,id){const u=unitFor(dimension,id),n=value/u.scale-u.offset;if(!Number.isFinite(n)||(value!==0&&u.offset===0&&n===0))throw Error('다른 표시 단위를 선택하세요. 이 단위에서는 수치 범위를 벗어납니다.');return n;}
