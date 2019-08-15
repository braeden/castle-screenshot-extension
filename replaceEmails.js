{
    let hashCode = str => {
        var hash = 0;
        if (str.length == 0) {
            return hash;
        }
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    let emailRegex = /[\w+.]+@[\w\.]+/;

    // const randomString = (n = 5) => {
    //     let output = ''
    //     for (let i = 0; i < n; i++) {
    //         output += String.fromCharCode(97 + Math.floor(Math.random() * 26))
    //     }
    //     return output
    // }

    let hasEmail = text => emailRegex.test(text);

    let walk = nodes => {
        nodes.forEach(node => {
            if (node.hasChildNodes()) walk(node.childNodes);
            if (node.nodeValue && hasEmail(node.nodeValue)) {
                node.nodeValue = node.nodeValue.replace(
                    emailRegex,
                    `${hashCode(node.nodeValue).toString(36)}@castle.io`
                );
            }
        });
    };


    walk(document.body.childNodes);
}