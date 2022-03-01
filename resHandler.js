const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}

const errorCodes = {
    '400': '資料格式不正確',
    '401': '需要訪問權限',
    '403': '沒有訪問權限',
    '404': '網址不正確',
    '405': '無效的請求'
}

const sendRes = (res, status, data) => {
    res.writeHead(status, headers);
    res.write(JSON.stringify({
        'status': 'success',
        'data': data
    }));
    res.end();
};

const sendErrMsg = (res, status) => {
    res.writeHead(status, headers);
    res.write(JSON.stringify({
        'status': 'false',
        'data': errorCodes[status]
    }));
    res.end();
}

module.exports = {
    'sendRes': sendRes,
    'sendErrMsg': sendErrMsg
};