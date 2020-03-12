const fs = require('fs');
require('@testing-library/jest-dom/extend-expect');
const dust = require('dustjs-linkedin');

global.setupTemplate = function (path, name) {
    const contents = fs.readFileSync(path, 'utf8');
    const compiled = dust.compile(contents, name);
    dust.loadSource(compiled);
};

global.renderTemplate = function (template, data = {}) {
    return new Promise((resolve, reject) => {
        dust.render(template, data, (err, output) => {
            if (err) {
                reject(err);
                return;
            }

            const container = document.createElement('div');
            container.innerHTML = output;
            document.body.appendChild(container);
            resolve(container);
        })
    });
};

global.cleanup = function (container) {
    if (container) {
        container.remove();
    }
}
