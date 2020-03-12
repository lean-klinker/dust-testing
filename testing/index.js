import fs from 'fs';
import recursive from 'recursive-readdir';
import path from 'path';
import dust from 'dustjs-linkedin';
import { template } from '@babel/core';

const srcPath = path.resolve(__dirname, '..', 'src')
const sharedPath = path.resolve(srcPath, 'shared');

function convertFilenameToPartialName(filePath) {
    return filePath.replace('.dust', '')
        .replace(srcPath, '')
        .replace(/\\/g, '/')
        .replace('/', '');
}

function isDustFile(filePath) {
    return filePath.endsWith('.dust');
}

export async function loadPartials() {
    const files = await recursive(sharedPath);

    files
        .filter(isDustFile)
        .forEach(filePath => setupTemplate(filePath, convertFilenameToPartialName(filePath)));
}

export function setupTemplate(path, name) {
    const contents = fs.readFileSync(path, 'utf8');
    const compiled = dust.compile(contents, name);
    dust.loadSource(compiled);
};

export function renderTemplate(template, data = {}) {
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

export function cleanup(container) {
    if (container) {
        container.remove();
    }
}
