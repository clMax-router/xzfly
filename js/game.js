
let feiji = document.getElementById('feiji')
let contHei = $('#cont').height()
let contWth = $('#cont').width()
// let fylFlag = false
let keyFlag = { 'a': true, 'A': true, 's': true, 'S': true, 'd': true, 'w': true, 'W': true }
let timeout = {}
// let thisKeyArr = ''Arr

// 测量与父容器绝对定位的值
let testHei = () => {
    var change = $('#feiji').position()
    var top1 = change.top
    var left = change.left
    return { top1, left }
}

// 修改图片
let imgChange = (e) => {
    if (e == 'a' || e == 'A') {
        // 左转
        $(feiji).attr('src', '/img/feijir1.png')
    } else if (e == 'center') {
        // 归正
        $(feiji).attr('src', '/img/feijic.png')
    } else if (e == 'd' || e == 'D') {
        // 右转
        $(feiji).attr('src', '/img/feijiy2.png')
    }

}

// 飞机移动
let move = (event) => {
    //- $(feiji).outerWidth() ) + 6
    var e = event.key
    if (e == 'w' || e == 'W') {
        // 上
        if (keyFlag[e]) {
            // thisKey = e
            timeout[e] = setInterval(() => {
                let { top1 } = testHei()
                if (!((top1 - 6) < 0)) {
                    feiji.style.top = top1 - 6 + 'px'
                }
            }, 50)
        }
    } else if (e == 's' || e == 'S') {
        // 下
        if (keyFlag[e]) {
            // thisKey = e
            timeout[e] = setInterval(() => {
                let { top1 } = testHei()
                if (!((top1 + 6) > (contHei - $(feiji).height()))) {
                    feiji.style.top = top1 + 6 + 'px'
                }
            }, 50)
        }
    } else if (e == 'a' || e == 'A') {
        // 左
        // console.log( $(feiji).position() )   
        if (keyFlag[e]) {
            // thisKey = e
            imgChange(e) // 修改图片
            timeout[e] = setInterval(() => {
                let { left } = testHei()
                if (!(left - 6 < 0)) {
                    feiji.style.left = left - 6 + 'px'
                }
            }, 50)
        }
    } else if (e == 'd' || e == 'D') {
        // 右
        // thisKey = e
        if (keyFlag[e]) {
            imgChange(e)
            timeout[e] = setInterval(() => {
                let { left } = testHei()
                if (!(left + 6 > contWth - $(feiji).width())) {
                    feiji.style.left = left + 6 + 'px'
                }
            }, 50)
        }
    }
}

// 键盘按下
document.onkeydown = (event) => {
    console.log(event)
    move(event)
    keyFlag[event.key] = false
}

// 键盘抬起
document.onkeyup = (event) => {
    keyFlag[event.key] = true
    let changeFlag = true
    for (let key in keyFlag) {
        if (!keyFlag[key]) {    
            console.log(!keyFlag[key])
            changeFlag = false
        }
    }
    if (changeFlag) {
        imgChange('center')
    }
    if (event.key == 'd' || event.key == 'D') {
        let { left } = testHei()
        if ((left + $(feiji).width()) > contWth) {
            // console.log('我竟来了')
            feiji.style.left = contWth - $(feiji).width() + 'px'
        }
    }
    clearInterval(timeout[event.key])
    
}