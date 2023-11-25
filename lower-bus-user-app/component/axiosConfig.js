// axios-config.js 파일 생성

import axios from 'axios';

const instance = axios.create({
    baseURL: '', // API의 기본 URL
    timeout: 10000, // 요청이 타임아웃되기까지의 시간 (밀리초)
    headers: {
        'Content-Type': 'application/json', // 요청 헤더 설정
        // 다른 필요한 헤더 추가
    },
});

export default instance;
