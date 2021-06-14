let host = "";
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    host = "http://localhost:3000/";
} else {
    // 生成环境
    host = "http://www.xingxinghan.cn/";
}
export default host;