export const tool = {
  "id": "E017",
  "title": "전선 직류저항 계산기",
  "inputs_text": "해당 온도의 비저항 ρ_e [Ω·m], 길이 L [m], 단면적 A [m²]",
  "formula": "R = ρ_e L / A",
  "output_text": "전선 저항 R [Ω]",
  "assumptions": "ρ_e,L,A>0. 균일 재질·단면의 직류 도체에 한정하고 접촉저항·교류 표피효과는 제외한다. mm² 입력을 m²로 정확히 변환한다.",
  "purpose": "전선 길이 저항 계산 / 배선·저항선 실험",
  "sources": [
    {
      "label": "OpenStax · Resistivity and Resistance",
      "url": "https://openstax.org/books/university-physics-volume-2/pages/9-3-resistivity-and-resistance"
    }
  ],
  "slug": "eng-wire-resistance",
  "category": "전기",
  "result_label": "도체 직류저항 R",
  "result_dimension": "resistance",
  "fields": [
    {
      "key": "rho",
      "label": "해당 온도의 비저항 ρ_e",
      "dimension": "resistivity",
      "example": 1.68e-08,
      "constraint": "positive",
      "display_unit": "ohmmm2m",
      "display_value": "0.0168"
    },
    {
      "key": "l",
      "label": "도체 길이 L",
      "dimension": "length",
      "example": 10,
      "constraint": "positive",
      "display_unit": "m",
      "display_value": "10"
    },
    {
      "key": "a",
      "label": "도체 단면적 A",
      "dimension": "area",
      "example": 1e-06,
      "constraint": "positive",
      "display_unit": "mm2",
      "display_value": "1"
    }
  ],
  "site": "https://nanalab.kr/eng-wire-resistance/",
  "repository": "https://github.com/NaNaCompany/eng-wire-resistance",
  "condition": "",
  "output_unit": "ohm"
};
