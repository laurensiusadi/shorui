import * as rx from './rxdb.js'

let get = async _ => {
  return rx.get()
}

let demoDocuments = async _ => {
  const database = await rx.get()
  database.documents.find().exec().then((documents) => {
    if (documents.length === 0) {
      var one = {
        title: 'About Cats',
        created: new Date(2017, 9, 8, 9, 30, 0).toISOString(),
        updated: new Date().toISOString(),
        project: 'Inbox',
        description: 'What a fatty cat Scooter is.',
        body: '# Cats\n\n the furry little guys are the best'
      }
      var two = {
        title: 'Markdown Cheatsheet',
        created: new Date(2017, 9, 9, 9, 30, 0).toISOString(),
        updated: new Date().toISOString(),
        project: 'Examples',
        description: 'gotta be a prof some day',
        body: '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nasd\n   \nAlt-H1\n======\n\nAlt-H2\n------\n\nEmphasis, aka italics, with *asterisks* or _underscores_.\n\nStrong emphasis, aka bold, with **asterisks** or __underscores__.\n\nCombined emphasis with **asterisks and _underscores_**.\n\nStrikethrough uses two tildes. ~~Scratch this.~~\n\n1. First ordered list item\n2. Another item\n⋅⋅* Unordered sub-list. \n1. Actual numbers dont matter, just that its a number\n⋅⋅1. Ordered sub-list\n4. And another item.\n\n⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but well use three here to also align the raw Markdown).\n\n⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅\n⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅\n⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)\n\n* Unordered list can use asterisks\n- Or minuses\n+ Or pluses\n\n[Im an inline-style link](https://www.google.com)\n\n[Im an inline-style link with title](https://www.google.com "Googles Homepage")\n\n[Im a reference-style link][Arbitrary case-insensitive reference text]\n\n[Im a relative reference to a repository file](../blob/master/LICENSE)\n\n[You can use numbers for reference-style link definitions][1]\n\nOr leave it empty and use the [link text itself].\n\nURLs and URLs in angle brackets will automatically get turned into links. \nhttp://www.example.com or <http://www.example.com> and sometimes \nexample.com (but not on Github, for example).\n\nSome text to show that the reference links can follow later.\n\n[arbitrary case-insensitive reference text]: https://www.mozilla.org\n[1]: http://slashdot.org\n[link text itself]: http://www.reddit.com\n\nHeres our logo (hover to see the title text):\n\nInline-style: \n![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")\n\nReference-style: \n![alt text][logo]\n\n[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"\n\n```javascript\nvar s = "JavaScript syntax highlighting";\nalert(s);\n```\n \n```python\ns = "Python syntax highlighting"\nprint s\n```\n \n```\nNo language indicated, so no syntax highlighting. \nBut lets throw in a <b>tag</b>.\n```\n\nColons can be used to align columns.\n\n| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |\n\nThere must be at least 3 dashes separating each header cell.\nThe outer pipes (|) are optional, and you dont need to make the \nraw Markdown line up prettily. You can also use inline Markdown.\n\nMarkdown | Less | Pretty\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3'
      }
      database.documents.insert(one)
      database.documents.insert(two)
    } else {

    }
  })
}

export {
  demoDocuments,
  get
}
