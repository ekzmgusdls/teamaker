# Teamaker 🎯

팀 구성을 간편하게 도와주는 웹 애플리케이션입니다. 멤버들을 입력하고 균형 잡힌 팀을 자동으로 구성할 수 있습니다.

## ✨ 주요 기능

- **멤버 추가**: 텍스트 입력으로 여러 멤버를 한 번에 추가
- **팀 구성**: A팀과 B팀으로 균형 있게 분배
- **드래그 앤 드롭**: 직관적인 인터페이스로 멤버 이동
- **팀 섞기**: 랜덤하게 팀을 재구성
- **모바일 지원**: 터치 인터페이스 완벽 지원

## 🚀 시작하기

### 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/ekzmgusdls/teamaker.git
cd teamaker
```

2. 웹 브라우저에서 `index.html` 파일 열기
   - 로컬 서버 실행 (권장):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (http-server 패키지 필요)
   npx http-server
   ```
   - 또는 파일을 직접 브라우저에서 열기

### 사용법

1. **멤버 추가**
   - 텍스트 영역에 멤버 이름을 입력 (엔터로 구분)
   - "멤버 추가하기" 버튼 클릭

2. **팀 구성**
   - 추가된 멤버를 클릭하여 팀에 배정
   - A팀/B팀 라디오 버튼으로 배정할 팀 선택
   - 드래그 앤 드롭으로 멤버 이동 가능

3. **팀 섞기**
   - "팀 섞기" 버튼으로 랜덤하게 팀 재구성
   - 균형 잡힌 팀 구성을 자동으로 생성

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **라이브러리**: 
  - jQuery 3.6.0
  - jQuery UI 1.13.2 (드래그 앤 드롭)
  - jQuery UI Touch Punch (모바일 지원)
- **스타일링**: SCSS, CSS

## 📁 프로젝트 구조

```
teamaker/
├── index.html          # 메인 HTML 파일
├── basic.js           # 핵심 JavaScript 로직
├── css/
│   └── style.css      # 컴파일된 CSS
├── scss/
│   └── style.scss     # SCSS 소스 파일
├── src/
│   ├── loading.gif    # 로딩 애니메이션
│   └── s-*.gif        # 기타 이미지 리소스
└── README.md          # 프로젝트 문서
```

## 🎨 주요 특징

### 반응형 디자인
- 모바일 및 데스크톱 환경 모두 지원
- 터치 인터페이스 최적화

### 직관적인 UI/UX
- 간단한 2단계 프로세스
- 시각적 피드백 제공
- 애니메이션과 로딩 효과

### 유연한 팀 구성
- 수동 배정과 자동 섞기 모두 지원
- 실시간 팀 균형 확인
- 멤버 제거 및 재배치 가능

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 확인하세요.

## 👨‍💻 개발자

- **ekzmgusdls** - [GitHub](https://github.com/ekzmgusdls)

## 📞 문의

프로젝트에 대한 질문이나 제안이 있으시면 이슈를 통해 연락해 주세요.

---

⭐ 이 프로젝트가 유용하다면 Star를 눌러주세요!