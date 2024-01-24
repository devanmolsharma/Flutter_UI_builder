var classJson = {}

fetch("./classesList.json").then(res => res.json().then(json => {
    classJson = json;
}));


const query = (name) => {
    try {

        return classJson.filter(r => r.name == name && r.href.includes('-class'))[0].href;
    } catch (error) {
        return classJson.filter(r => r.name == name)[0].href;

    }
}