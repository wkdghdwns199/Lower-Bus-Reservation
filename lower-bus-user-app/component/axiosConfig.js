// axios-config.js 파일 생성

import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://ws.bus.go.kr', // API의 기본 URL
    timeout: 2000, // 요청이 타임아웃되기까지의 시간 (밀리초)
});

export default instance;
