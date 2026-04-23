const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ── 이미지 분석 (gemma → 8000) ──
app.post('/analyze', upload.single('file'), async (req, res) => {
    try {
        const { question } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ error: '이미지가 업로드되지 않았습니다.' });
        }

        const formData = new FormData();
        formData.append('file', imageFile.buffer, {
            filename: imageFile.originalname,
            contentType: imageFile.mimetype,
        });
        formData.append('question', question || '');

        const response = await axios.post('http://localhost:8000/analyze', formData, {
            headers: { ...formData.getHeaders() },
            timeout: 120000,
        });

        res.json(response.data);
    } catch (error) {
        console.error('분석 요청 중 오류 발생:', error.message);
        res.status(500).json({ error: '분석 서버 연결에 실패했습니다.', details: error.message });
    }
});

// ── OCR (chandra-ocr-2 → 8001) ──
app.post('/ocr', upload.single('file'), async (req, res) => {
    try {
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ error: '이미지가 업로드되지 않았습니다.' });
        }

        const formData = new FormData();
        formData.append('image', imageFile.buffer, {
            filename: imageFile.originalname,
            contentType: imageFile.mimetype,
        });

        const response = await axios.post('http://localhost:8001/ocr', formData, {
            headers: { ...formData.getHeaders() },
            timeout: 120000,
        });

        res.json(response.data);
    } catch (error) {
        console.error('OCR 요청 중 오류 발생:', error.message);
        res.status(500).json({ error: 'OCR 서버 연결에 실패했습니다.', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});