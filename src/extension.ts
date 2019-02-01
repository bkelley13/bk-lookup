// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Extension "bk-lookup" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.lookupBug', bugSearch);

	context.subscriptions.push(disposable);
}

function bugSearch(){
    var text = getSelection();
    invokeURL(text);

    async function invokeURL(word: any) {
        const configuredView = vscode.workspace.getConfiguration().get('bugdb.source');
        let url;
        switch (configuredView) {
            case 'oracle':
                {
                    let bugconfig = vscode.workspace.getConfiguration('oracleBugdb');
                    let jiraconfig = vscode.workspace.getConfiguration('oracleJIRA');
                
                    let bugurl = bugconfig.get('url');
                    let jiraurl = jiraconfig.get('url');
                    url = bugurl;
            
                    if(word.includes("JIRA"))
                        url = jiraurl;
                }                
                break;
            case 'google':
                {
                let bugconfig = vscode.workspace.getConfiguration('googleIssues');            
                let bugurl = bugconfig.get('url');
                url = bugurl;        
                }                            
                break;
            case 'mozilla':
                {
                let bugconfig = vscode.workspace.getConfiguration('bugzilla');            
                let bugurl = bugconfig.get('url');
                url = bugurl;        
                }                            
                break;
        }

        let uri = vscode.Uri.parse(url + word);
        await vscode.commands.executeCommand("vscode.open", uri);
    }

    function getSelection(){
		let editor = vscode.window.activeTextEditor;
		let doc;
		if(editor)
			doc = editor.document;
		else
			return;

        let selection = editor.selection;
        let selStart, selEnd;
        selStart = doc.offsetAt(selection.start);
        selEnd = doc.offsetAt(selection.end);

        let phrase;
        if (selStart == selEnd) {
            let range = doc.getWordRangeAtPosition(selection.start);
            phrase = doc.getText(range);
        } else {
            let text = doc.getText(new vscode.Range(selection.start, selection.end));
            if (!text) return '';

            phrase = text;
        }

        phrase = phrase.trim();

        phrase = phrase.replace(/\s\s+/g,' ');
        phrase = phrase.slice(0, 300).trim();
        return phrase;
    }

}


// this method is called when your extension is deactivated
export function deactivate() {}
