const { v4: uuidv4 } = require('uuid');
const {sendRes, sendErrMsg} = require('./resHandler');

const todo = [];
const requestListener = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk });

    if (req.method == 'OPTIONS') {
        sendRes(res, 200);
    } else if (req.url == '/todo') {
        switch(req.method){
            case 'GET':
                sendRes(res, 200, todo);
                break;
            case 'POST':
                req.on('end', () => {
                    try {
                        let title = JSON.parse(body)?.title;
                        if (title) {
                            todo.push({
                                title,
                                'id': uuidv4()
                            })
                            sendRes(res, 200, todo);
                        } else {
                            sendErrMsg(res, 400);
                        }
                    } catch (error) {
                        sendErrMsg(res, 400);
                    }
                })
                break;
            case 'DELETE':
                todo.length = 0;
                sendRes(res, 200, todo);
                break;
            default:
                sendErrMsg(res, 405);
        }
    } else if(req.url.startsWith('/todo/')) {
        let id = req.url.split('/').pop();
        let index = todo.findIndex(el => el.id == id);
        if (req.method == 'PATCH' && index > -1) {
            req.on('end', () => {
                try {
                    let title = JSON.parse(body)?.title;
                    if (title) {
                        todo[index].title = title,
                        sendRes(res, 200, todo);
                    } else {
                        sendErrMsg(res, 400);
                    }
                } catch (error) {
                    sendErrMsg(res, 400);
                }
            })
        } else if (req.method == 'DELETE' && index > -1) {
            todo.splice(index, 1);
            sendRes(res, 200, todo);
        } else {
            sendErrMsg(res, 405);
        }
    } else {
        sendErrMsg(res, 404);
    }   
};

module.exports = requestListener;