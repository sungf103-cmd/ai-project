# AI Project - Image Analysis Server Guide

이 문서는 AI 이미지 분석 서버의 빌드 및 실행 지침을 포함합니다.

## 1. 빌드 및 설치
- **환경:** Python 3.12.10
- **필수 패키지:**
  ```bash
  pip install fastapi uvicorn ollama openai python-multipart python-dotenv mysql-connector-python requests ipykernel
  ```

## 2. 서버 실행
- `analysis_server.ipynb` 파일을 Jupyter Notebook 또는 VS Code에서 실행하십시오.
- 실행 전 `.env` 파일의 설정을 확인하십시오 (`USE_MODEL="OLLAMA"` 또는 `"GPT"`).

## 3. 테스트 방법
- **이미지 분석 API:**
  - `POST /analyze`
  - Body: `file` (Image), `question` (String)
- **성공 응답:**
  - `{"success": true, "data": "AI 분석 결과"}`
- **실패 응답:**
  - `{"success": false, "message": "에러 내용"}`

## 4. 코딩 스타일
- 모든 프로젝트 코드는 `AI_GUIDE.md`의 엄격한 스타일(camelCase, 명시적 반복문 등)을 준수해야 합니다.
