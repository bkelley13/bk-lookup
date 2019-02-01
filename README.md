# bk-lookup README

This extension is useful in invoking a browser to lookup a bug or issue in seen in code.  You can configure the search string to correspond to whatever project you are working, and the appropriate url for your bug tracking system.

## Features

There are 3 search bug engines installed:  oracle, google, mozilla.
The google and mozilla ones are publically available.  The oracle one is internal only and default.
You can select which to use by user setting json on top level: "bugdb.source": "oracle" or "google" or "mozilla" .
If you want to user your own internal company db, you can set "oracleBugdb.url": "your internal url search".

The oracle one also shows how to use 2 internal sites, if the selected string starts with JIRA, it invokes
the JIRA oracle site, otherwise the bugdb site.

## Requirements

For the oracle search engine, you must be inside oracle corporations network.  For google and mozilla, no restrictions.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

This extension contributes the following settings:

* `bugdb.source`: select which bugdb to use, 'oracle','google', 'mozilla'

## Known Issues

## Release Notes


### 1.0.0

Initial release of bk-lookup.

