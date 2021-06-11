let host = "";
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    host = "http://www.dianphp.com/";
}else{
    // 生成环境
    host = "http://www.dianphp.com/";
}
export default host;