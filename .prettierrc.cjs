module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],

  // 한 줄 최대 길이
  printWidth: 100,

  // 들여쓰기 크기
  tabWidth: 2,

  // 탭 대신 스페이스 사용 여부
  useTabs: false,

  // 문장 끝에 세미콜론 붙일지 여부 (true 권장: TypeScript와 호환 안정성 ↑)
  semi: true,

  // 문자열에 작은따옴표(') 사용 (JS/TS 커뮤니티 표준)
  singleQuote: true,

  // 마지막 요소 뒤에도 콤마 붙이기 (Git diff 깔끔)
  trailingComma: 'all',

  // 중괄호 안쪽에 공백 넣기
  bracketSpacing: true,

  // 화살표 함수 매개변수 괄호 항상 사용
  arrowParens: 'always',

  // 줄바꿈 스타일(LF 강제 → Windows/Mac/Linux 협업 문제 방지)
  endOfLine: 'lf',

  // JSX 안에서는 큰따옴표(") 사용 → <div className="box" />
  jsxSingleQuote: false,
};
