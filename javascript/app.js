((window, document, drawModule, undefined) => {

    const start = document.getElementById('start');
    start.addEventListener("click", () => {
        drawModule.init();
    });

    document.onkeydown = (event) => {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch (keyCode) {

            case 37:
                if (direction != 'right') {
                    direction = 'left';
                }
                console.log('left');
                break;

            case 39:
                if (direction != 'left') {
                    direction = 'right';
                    console.log('right');
                }
                break;

            case 38:
                if (direction != 'down') {
                    direction = 'up';
                    console.log('up');
                }
                break;

            case 40:
                if (direction != 'up') {
                    direction = 'down';
                    console.log('down');
                }
                break;
        }
    }


})(window, document, drawModule);