function downloadImage() {
    html2canvas(document.getElementById('capture'), {
        useCORS: true,
        allowTaint: false,  
        logging: true,
        scrollX: 0,
        scrollY: 0,
        width: document.getElementById('capture').offsetWidth,
        height: document.getElementById('capture').offsetHeight
    }).then(function (canvas) {
        canvas.toBlob(function (blob) {
            saveAs(blob, 'comportamento_das_dezenas.png');
        });
    });
}