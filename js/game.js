
let feiji = document.getElementById('feiji')
let contHei = $('#cont').height()
let contWth = $('#cont').width()
// let fylFlag = false
let keyFlag = { 'a': true, 'A': true, 's': true, 'S': true, 'd': true, 'w': true, 'W': true }
let timeout = {}
// let thisKeyArr = ''Arr

// 测量与父容器绝对定位的值
let testHei = (obj) => {
    var change = $(obj).position()
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
let move = (event, obj) => {
    //- $(feiji).outerWidth() ) + 6
    var e = event.key
    if (e == 'w' || e == 'W') {
        // 上
        if (keyFlag[e]) {
            // thisKey = e
            timeout[e] = setInterval(() => {
                let { top1 } = testHei(obj)
                if (!((top1 - 20) < 0)) {
                    obj.style.top = top1 - 3 + 'px'
                }
            }, 10)
        }
    } else if (e == 's' || e == 'S') {
        // 下
        if (keyFlag[e]) {
            // thisKey = e
            timeout[e] = setInterval(() => {
                let { top1 } = testHei(obj)
                if (!((top1 + 20) > (contHei - $(feiji).height()))) {
                    obj.style.top = top1 + 3 + 'px'
                }
            }, 10)
        }
    } else if (e == 'a' || e == 'A') {
        // 左
        // console.log( $(feiji).position() )   
        if (keyFlag[e]) {
            // thisKey = e
            imgChange(e) // 修改图片
            timeout[e] = setInterval(() => {
                let { left } = testHei(obj)
                if (!(left - 20 < 0)) {
                    obj.style.left = left - 3 + 'px'
                }
            }, 10)
        }
    } else if (e == 'd' || e == 'D') {
        // 右
        // thisKey = e
        if (keyFlag[e]) {
            imgChange(e)
            timeout[e] = setInterval(() => {
                let { left } = testHei(obj)
                if (!(left + 20 > contWth - $(feiji).width())) {
                    obj.style.left = left + 3 + 'px'
                }
            }, 10)
        }
    }
}

// 键盘按下
document.onkeydown = (event) => {
    console.log(event)
    move(event, feiji)
    if (event.key == ' ') {
        let { top1, left } = testHei(feiji)
        console.log(top1, left) // 586 201
        let zidan = '<img id="zidan" style="top:' + (10 + top1) + 'px;left:' + (19 + left) + 'px" class="zidan" src="/img/zidan.png">'
        let zidan2 = '<img id="zidan2" style="top:' + (10 + top1) + 'px;left:' + (54 + left) + 'px" class="zidan" src="/img/zidan.png">'
        $('#cont').prepend(zidan)
        $('#cont').prepend(zidan2)
        zidanMove(document.getElementById('zidan'))
        zidanMove(document.getElementById('zidan2'))
    }
    keyFlag[event.key] = false
}

// 子弹移动
let zidanMove = (dom) => {
    let zidanHig = $(dom).height()
    let timeout = setInterval(() => {
        let { top: top1 } = $(dom).position()
        dom.style.top = (top1 - 10) + 'px'
        if ((top1 + zidanHig) - 10 < 0) {
            clearInterval(timeout)
            $(dom).remove()
        }
    }, 10)
    // $(dom)
}

// 键盘抬起
document.onkeyup = (event) => {
    keyFlag[event.key] = true
    let changeFlag = true
    for (let key in keyFlag) {
        // if ((key == 'a' || key == 'A') || (key == 'd' || key == 'D')) {
        if (!keyFlag[key]) {
            changeFlag = false
        }
        // }
    }
    if (changeFlag) {
        imgChange('center')
    }
    if (event.key == 'd' || event.key == 'D') {
        let { left } = testHei(feiji)
        if ((left + $(feiji).width()) > contWth) {
            // console.log('我竟来了')
            feiji.style.left = contWth - $(feiji).width() + 'px'
        }
    }
    clearInterval(timeout[event.key])

}