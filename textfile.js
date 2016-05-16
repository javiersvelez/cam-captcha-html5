(function() {
    var textFile = null, makeTextFile = function(text) {
        var data = new Blob([text], {
            type : 'text/plain'
        });

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        return textFile;
    };

    var textbox = $("#textbox");

    $("#buttonData").click(function() {
        console.log("Data button");
        var link = $("#buttonDownload")[0];
        link.href = makeTextFile(_DATA);
        link.style.display = 'inline';
    });
})();
