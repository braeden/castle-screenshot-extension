{
    (async () => {
        const fake = await fetch(chrome.extension.getURL('/data/fakeInfo.json')).then(response => response.json())

        let randElem = array => array[Math.floor(Math.random() * array.length)]
        let randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        let randomEmailObject = {}

        //names, nouns, animals, adjectives, slugs, suffix
        let createRandomEmail = () => {
            return `${randElem(fake.adjectives)}\
${randElem(fake.slugs)}\
${randElem(fake.animals)}\
${randInt(0,1) ? '' : randInt(0,99)}@\
${randElem(fake.suffix)}`.toLowerCase()
        }

        let emailRegex = /[\w-+.]+@[\w\.]+/;

        let hasEmail = text => emailRegex.test(text);

        let walk = nodes => {
            nodes.forEach(node => {
                if (node.hasChildNodes()) walk(node.childNodes);
                if (node.nodeValue && hasEmail(node.nodeValue)) {
                    if (!randomEmailObject[node.nodeValue]) {
                        randomEmailObject[node.nodeValue] = createRandomEmail()
                    }
                    node.nodeValue = node.nodeValue.replace(
                        emailRegex,
                        randomEmailObject[node.nodeValue]
                    );
                }
            });
        };


        walk(document.body.childNodes);
    })();
}