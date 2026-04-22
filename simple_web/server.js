const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

const app = express();
const port = 3000;

// 정적 파일 제공 (public 폴더)
app.use(express.static('public'));
app.use(express.json());

// Multer 설정: 메모리에 파일 임시 저장 (필드명 'file' 대응)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * 분석 요청 프록시 엔드포인트
 * 클라이언트로부터 'file'(이미지)과 'question'을 받아 localhost:8000/analyze로 전달합니다.
 */
app.post('/analyze', upload.single('file'), async (req, res) => {
    try {
        const { question } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ error: '이미지가 업로드되지 않았습니다.' });
        }

        // 8000번 포트의 분석 서버로 보낼 FormData 구성
        const formData = new FormData();
        // 분석 서버가 기대하는 필드명에 맞춰 이미지 전달 (여기서는 'image'로 전달)
        formData.append('file', imageFile.buffer, {
            filename: imageFile.originalname,
            contentType: imageFile.mimetype,
        });
        formData.append('question', question || '');

        // 외부 분석 서버로 요청 전달
        const response = await axios.post('http://localhost:8000/analyze', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // 분석 결과 반환
        res.json(response.data);
    } catch (error) {
        console.error('분석 요청 중 오류 발생:', error.message);
        res.status(500).json({ 
            error: '분석 서버 연결에 실패했습니다.',
            details: error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
