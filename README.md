# 전선 직류저항 계산기

전선 길이 저항 계산 / 배선·저항선 실험。

- 앱: https://nanalab.kr/eng-wire-resistance/
- 저장소: https://github.com/NaNaCompany/eng-wire-resistance
- 기획 ID: E017
- 공식: `R = ρ_e L / A`
- 출력: 도체 직류저항 R 한 값. 출력 단위 선택은 동일 수치의 표시 변환입니다.

## 적용 범위

ρ_e,L,A>0. 균일 재질·단면의 직류 도체에 한정하고 접촉저항·교류 표피효과는 제외한다. mm² 입력을 m²로 정확히 변환한다.

계산은 브라우저에서 수행합니다. 입력을 SI로 정규화하고 정의역, 유한값, 오버플로·언더플로를 확인합니다. 빈 값·NaN·무한값·0 분모를 임의 숫자로 대체하지 않습니다. 원자료의 불확도와 안전계수, 실제 장치 성능은 계산하지 않습니다.

## 사용 및 테스트

`index.html`을 정적 HTTP 서버에서 제공합니다. 외부 계산 패키지나 빌드 단계는 필요하지 않습니다. Node.js 22 이상에서 `npm test` 또는 `node --test tests/*.test.mjs`로 검증합니다. 테스트는 독립 고정밀 기준값, 모든 지원 입력·출력 단위, 정의역, 잘못된 입력 및 모델별 특별 상태를 확인합니다. 기준 예제의 SI 결과는 `0.168` 입니다.

`tool.json`은 도구 정의, `tool-config.js`는 브라우저에 제공하는 동일 정의입니다. 정의를 변경할 때 둘을 함께 갱신합니다. `engine.js`, `units.js`, `app.js`, `style.css`와 `index.html`은 이 저장소만으로 실행됩니다.

## 배포

GitHub Pages: `main` 브랜치의 저장소 루트(`/`). 프로젝트 CNAME 없이 NaNaCompany 조직의 `nanalab.kr` 도메인을 상속합니다. `.nojekyll`을 유지합니다. `sitemap.xml`과 canonical·OG 메타데이터는 위 앱 주소를 사용합니다.

공통 Google 태그 2종(GTM·GA4), AdSense, Cloudflare 분석 fallback과 우측 하단 `More Apps` 링크가 포함되어 있습니다. Cloudflare 자동 삽입이 있으면 추가 beacon을 만들지 않습니다.

## 제작 및 저작권

코드·설명·예제·아이콘·대표 이미지를 직접 작성했습니다. 외부 교재 본문·도판·코드는 포함하지 않습니다. 참고 자료와 물리상수의 출처·채택 버전은 [SOURCES.md](SOURCES.md)에 기록했습니다. 자체 제작물은 [MIT](LICENSE) 라이선스입니다. 공급자 분석·광고 스크립트는 해당 서비스 조건을 따릅니다.
