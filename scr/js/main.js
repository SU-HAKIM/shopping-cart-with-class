
import "../scss/main.scss";
let url = 'http://jsonplaceholder.typicode.com/users';

let myApi = function (url, cb) {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url)

    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.response)
                cb(null, response)
            } else {
                cb(xhr.status, null)
            }
        }
    }
    xhr.send()
}

myApi(url, function (err, res) {
    if (err) {
        console.log(err)
    } else {
        res.forEach(sin => {
            console.log(sin.name)
        });
    }
})