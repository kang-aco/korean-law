# 법률 정보 검색

법령 및 관련 판례 통합 검색 웹 앱

## 사용 방법

1. `index.html`을 브라우저에서 열기
2. 상단 **API 설정** 클릭
3. Anthropic API 키 입력 ([console.anthropic.com](https://console.anthropic.com))
4. 법제처 OC 인증키 입력 ([open.law.go.kr](https://open.law.go.kr))
5. 검색창에 법령명 입력 후 검색

## 기술 스택

- React 18 (CDN)
- Tailwind CSS (CDN)
- Anthropic Messages API + MCP
- MCP 서버: `korean-law-mcp` (https://korean-law-mcp.fly.dev/mcp)

## 지원 기능

- 법령명·조문번호 검색 (`search_law`)
- 조문 원문 조회 (`get_law_text`)
- 관련 판례 검색 (`search_precedents`)
- 모바일 반응형 레이아웃
- 30초 타임아웃 + 에러 처리

## 주의사항

프로덕션 환경에서는 API 키 노출 방지를 위해 백엔드 프록시 서버 경유를 권장합니다.
