# Search & Replace in data from Wiki API

This task was handed me as a part of recruitment process for Front end Developer job.

### Requirements were as follows:

- The view should contain the “search phrase” input field, “replace with” input field and three buttons: search, replace, replace all.
- Results should be displayed as a list and should include result title and snipped fields.
- Search matches within each result snippet should be highlighted.
- The request should be invoked on search button click and while typing in search field (not on every key pressed)
- Replace should replace the first currently available highlighted search match with a phrase taken from "replace with" field.
- Replace all should replace every highlighted search match.
- Allowed technologies: React

## Work journal:

Snippets delivered by Wiki API are already encoded HTML with spans that have a class, which you can later use to highlight search word. However handy, in case of 2+ search phrases, Wiki API marks all ocurrences of search phrase and each word as well. Thus, I decided to strip all HTML and highlight search phrases with a plugin I found in NPM repo. I made that decision, so I can replace compound phrases, like `"Hello World"`.

### Project can be previewed at:

[https://search-replace-wiki-api.netlify.app/](https://search-replace-wiki-api.netlify.app/)
