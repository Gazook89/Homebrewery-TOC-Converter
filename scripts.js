function convertLegacytoV3() {
    let legacyText = document.getElementById("legacyText").value.length ? document.getElementById("legacyText").value : "No Content";
    let v3Text;
    // const regexFirstLine = /^(\s*<div\s)(.*)(>)$/gm;
    const regexTOC = /.*class=['"].*?toc.*?['"].*/gm;
    const regexTitle = /^##### (.*)/gm;
    const regexHeading = /^( *).*\d (.*)\].*(\d+).*/gm;
    const regexClose = /<\/div>/gm;
    if(legacyText.match(regexTOC)){
        v3Text = legacyText.replace(regexTOC, `{{toc,wide`);
        v3Text = v3Text.replace(regexTitle, `# $1\n`);
        v3Text = v3Text.replace(regexHeading, `$1- ### [{{ $2 }}{{ $3}}](#p$3)`);
        v3Text = v3Text.replace(regexClose, `}}`);
        document.getElementById("outputText").value = v3Text;
        document.getElementById("outputStyle").value = '';
    } else {
        alert('Please check formatting');
    }
    
}

function convertLegacytoFancyLegacy() {
    let legacyText = document.getElementById("legacyText").value.length ? document.getElementById("legacyText").value : "No Content";
    let v3Text;
    // const regexFirstLine = /^(\s*<div\s)(.*)(>)$/gm;
    const regexTOC = /.*class=['"].*?toc.*?['"].*/gm;
    const regexTitle = /^##### (.*)/gm;
    const regexHeading1 = /^-.*\d (.*)\].*(\d+).*/gm;
    const regexHeading2 = /^(?: {2}|\t)-.*\d (.*)\].*(\d+).*/gm;
    const regexHeading3 = /^(?: {4}|\t{2})-.*\d (.*)\].*(\d+).*/gm;
    const regexClose = /<\/div>/gm;
    if(legacyText.match(regexTOC)){
        v3Text = legacyText.replace(regexTOC, `<div class="toc wide">\n`);
        v3Text = v3Text.replace(regexTitle, `# $1\n`);
        v3Text = v3Text.replace(regexHeading1, `- ### [<span>$1</span><span>$2</span>](#p$2)`);
        v3Text = v3Text.replace(regexHeading2, `  - #### [<span>$1</span><span>$2</span>](#p$2)`);
        v3Text = v3Text.replace(regexHeading3, `    - [<span>$1</span><span>$2</span>](#p$2)`);
        v3Text = v3Text.replace(regexClose, `\n</div>`);
        document.getElementById("outputText").value = v3Text;
        document.getElementById("outputStyle").value = provideStyle('legacy');
    } else {
        alert('Please check formatting');
    }
}

function provideStyle() {
    return `/* ToC Styling */\n
.page .toc {
    -webkit-column-break-inside:avoid;
    page-break-inside:avoid;
    break-inside:avoid
}

.page .toc h1 {
    text-align:center;
    margin-bottom:0cm
}

.page .toc a {
    display:table;
    color:inherit;
    text-decoration:none
}

.page .toc a:hover {
    text-decoration:underline
}

.page .toc h4 {
    margin-top:.14cm
}

.page .toc h4+ul li {
    line-height:1.2em
}

.page .toc>ul {
    margin-top:.52cm
}

.page .toc ul {
    padding-left:0;
    list-style-type:none
}

.page .toc ul li+li h3 {
    margin-top:.26cm;
    line-height:1em
}

.page .toc ul h3 span:first-child::after {
    border:none
}

.page .toc ul span {
    display:table-cell
}

.page .toc ul span:first-child {
    position:relative;
    overflow:hidden
}

.page .toc ul span:first-child::after {
    content:"";
    position:absolute;
    bottom:.08cm;
    margin-left:.06cm;
    width:100%;
    border-bottom:.05cm dotted #000
}

.page .toc ul span:last-child {
    font-family:BookInsanityRemake;
    font-size:.34cm;
    font-weight:normal;
    color:black;
    text-align:right;
    vertical-align:bottom;
    width:1%;
    padding-left:.06cm
}

.page .toc ul ul {
    margin-left:1em
}

.page .toc.wide {
    column-count:2;
    column-fill:balance;
    column-gap:.9cm;
    column-width:7.68cm;
    -webkit-column-count:2;
    -moz-column-count:2;
    -webkit-column-width:7.68cm;
    -moz-column-width:7.68cm;
    -webkit-column-gap:.9cm;
    -moz-column-gap:.9cm
}`
}