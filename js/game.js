
let feiji = document.getElementById('feiji')
let contHei = $('#cont').height()
let contWth = $('#cont').width()
// let fylFlag = false
let keyFlag = true
let timeout = ''

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

let move = (event) => {
    //- $(feiji).outerWidth() ) + 6
    var e = event.key
    if (e == 'w' || e == 'W') {
        // 上
        if (keyFlag) {
            timeout = setInterval(() => {
                let { top1 } = testHei()
                if ((top1 - 10) < 0) {
                    return
                }
                feiji.style.top = top1 - 10 + 'px'
            }, 50)
        }
    } else if (e == 's' || e == 'S') {
        // 下
        if (keyFlag) {
            timeout = setInterval(() => {
                let { top1 } = testHei()
                if ((top1 + 10) > (contHei - $(feiji).height())) {
                    return
                }
                feiji.style.top = top1 + 10 + 'px'
            }, 50)
        }
    } else if (e == 'a' || e == 'A') {
        // 左
        // console.log( $(feiji).position() )   
        if (keyFlag) {
            imgChange(e) // 修改图片
            timeout = setInterval(() => {
                let { left } = testHei()
                if (left - 6 < 0) {
                    return
                }
                feiji.style.left = left - 6 + 'px'
            }, 50)
        }
    } else if (e == 'd' || e == 'D') {
        // 右
        if (keyFlag) {
            imgChange(e)
            timeout = setInterval(() => {
                let { left } = testHei()
                if (left + 6 > contWth - $(feiji).width()) {
                    return
                }
                feiji.style.left = left + 6 + 'px'
            }, 50)
        }
    }
}

document.onkeydown = (event) => {
    move(event)
    keyFlag = false
}

document.onkeyup = (event) => {
    imgChange('center')
    if (event.key == 'd' || event.key == 'D') {
        let { left } = testHei()
        if ((left + $(feiji).width()) > contWth) {
            // console.log('我竟来了')
            feiji.style.left = contWth - $(feiji).width() + 'px'
        }
    }
    clearInterval(timeout)
    keyFlag = true
}