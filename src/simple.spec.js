const fs = require('fs');
const path = require('path');
const dust = require('dustjs-linkedin');

describe('Simple', () => {
    it('shows the correct text', done => {
        const template = fs.readFileSync(path.resolve(__dirname, 'simple.dust'), 'utf8');
        const complied = dust.compile(template, 'simple');
        dust.loadSource(complied);

        dust.render('simple', {}, (err, output) => {
            expect(output).toContain('Bob');
            done();
        })
    });
});