let progressScroll = () => {
    let docElem = document.documentElement,
        docBody = document.body,
        scrollTop = docElem['scrollTop'] || docBody['scrollHeight'],
        scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
        scrollPercentage = scrollTop / scrollBottom * 100 + '%'
        document.querySelector('#progress-bar').style.setProperty('--scrollAmount', scrollPercentage)
}

document.addEventListener('scroll', progressScroll)
