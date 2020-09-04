/* eslint-disable */
import fileSaver from 'file-saver'
import { Message } from 'element-ui'

export function import_json() {
    return new Promise((resolve, reject) => {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = "application/JSON"
            // 绑定onchange事件
        input.onchange = (event) => {
            let files = event.target.files
            if (!files || !files.length) {
                input = null
                Message.error('请选择json文件')
                return reject()
            }
            if (files[0].type !== 'application/json') {
                Message.error('请选择json文件')
                return reject()
            }
            // 当选择文件后，使用FileReader API读取文件，返回数据
            let reader = new FileReader()
            reader.onload = (event) => {
                input = null
                try {
                    let config = JSON.parse(event.target.result)
                    resolve(config)
                } catch (e) {
                    Message.error('json文件解析错误')
                    reject()
                }
            }
            reader.readAsText(files[0])
        }
        input.click()
    })
}


export function export_txt_to_json(fileName, data) {
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "" });
    fileSaver.saveAs(blob, `${fileName}.json`);
}