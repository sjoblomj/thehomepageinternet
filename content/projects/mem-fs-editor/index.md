# mem-fs-editor

[mem-fs-editor](https://github.com/SBoudrias/mem-fs-editor) can be used for performing file operations, such as move, delete, copy etc. It is possible to perform templating on the files using [ejs](http://ejs.co/). This allows copied files to be dynamically built up with conditionals, have parts of them replaced etc.

mem-fs-editor is used for example by the very popular scaffolding tool [Yeoman](http://yeoman.io/). Using Yeoman, one can use existing generators for creating projects, or create new generators tailored to ones own needs. The popular [JHipster](http://www.jhipster.tech/) platform, for example, uses Yeoman and thus mem-fs-editor.

Templates in ejs and mem-fs-editor are by default started with `<%` and ended with `%>`. A problem arose however, when opening and closing template tags did not match in binary files, which causes ejb to throw an exception. My addition to mem-fs-editor is to no longer perform template substitution in binary files.

{{github |repo=mem-fs-editor}} It is written in modern ECMAScript.


{{thumbnails |text=Below is the icon of Yeoman, and part of the source code that was changed.}}
{{thumbnail |title=Icon of Yeoman |small=mem-fs-editor_icon_small.png |large=mem-fs-editor_icon.png}}
{{thumbnail |title=Part of the changed code |small=mem-fs-editor_small.png |large=mem-fs-editor.png}}
