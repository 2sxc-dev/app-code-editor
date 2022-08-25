import type * as Monaco from 'monaco-editor';

function initMonaco(data) {
    window.require.config({
        paths: {
            vs: ['https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs'],
        },
    });

    window.require(['vs/editor/editor.main'], (monaco: typeof Monaco) => {

        // @ts-ignore
        self.MonacoEnvironment = {
            getWorkerUrl: function (moduleId, label) {
                if (label === 'json') {
                    return data.appPath + '/dist/json.worker.bundle.js';
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                    return data.appPath + '/dist/css.worker.bundle.js';
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return data.appPath + '/dist/html.worker.bundle.js';
                }
                if (label === 'typescript' || label === 'javascript') {
                    return data.appPath + '/dist/ts.worker.bundle.js';
                }
                return data.appPath + '/dist/editor.worker.bundle.js';
            }
        };
        monaco.editor.create(document.querySelector(`[${data.uniqueDomAttribute}]`)!, data.confMe);
    });
}

var winAny = window as any;
winAny.codeSample ??= {};
winAny.codeSample.initMonaco ??= initMonaco;

