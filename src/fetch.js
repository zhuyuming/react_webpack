import 'whatwg-fetch';
import $ from 'jquery'

const domain = '';
export default function requireData(url, data, success, method='GET'){
    let param = { method:method };
    if(data){
        param.body = JSON.stringify(data);
    }
    fetch(`${domain}${url}`, param)
        .then(checkStatus)
        .then(parseJSON)
        .then((json) => {
            if(typeof success == 'function'){
                success(json);
            }
        })
        .catch((error) => {
            console.log('error', error);
        })
}
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json()
}

export function ajaxData(url, data, success, method='GET'){
    data = data ? JSON.stringify(data) : '';
    $.ajax(`${domain}${url}`, {
        method: method,
        dataType: 'JSON',
        data: data
    }).done((data) => {
        if(typeof success == 'function'){
            success(data);
        }
    }).fail((error) => {
        console.log('error', error);
    })
}
