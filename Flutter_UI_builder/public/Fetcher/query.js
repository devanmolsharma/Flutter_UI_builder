var classJson = {}

fetch("./classesList.json").then(res => res.json().then(json => {
    classJson = json;
}));


const query = (name) => {
    name = name.split('<')[0]
    try {
        let classes = classJson.filter(r => r.name == name && r.href.includes('-class'));
        let widgetclasses = classJson.filter(r => r.name == name && r.href.includes('-class') && r.href.includes('widgets'));
        if (widgetclasses.length == 0)
            return classes[0].href;
        else
            return widgetclasses[0].href;
    } catch (error) {
        // console.log(error);
        return classJson.filter(r => r.name == name)[0].href;
    }
}