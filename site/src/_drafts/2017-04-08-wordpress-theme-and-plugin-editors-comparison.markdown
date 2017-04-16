---
layout: post
comments: true
title:  "In Search of Excellence: Choosing The Best WordPress Theme and Plugin Editors"

image:
    url: /img/blog/WordPress-theme-and-plugin-editor-with-syntax-highlighting.png
    alt: "WordPress Theme and Plugin Editors: In Search of Excellence"
meta:
    description:

categories: blog
---
<p class="flow-text">
In this post we're going to review the most popuplar WordPress plugins which are intended to replace standard plain 
text theme and plugin editor. If you don't have a time to read whole article, just jump at the 
<a href="#summary">Summary</a> section to see the final comparison table.
</p>

## Why it worth to read comparison articles  
 You know, it is quite annoying to install a dozens of the similar plugins trying to find the best of them. But in the 
 most of cases we've more important tasks rather than reviewing the different plugins. That is why we can choose not 
 the best of available solutions, but just *suitable enough* for us at the moment. The worst thing is that we can use 
 it for years because it do it's work and don't have an idea about much more convenient tools. Stay with us and we will 
 show you the best plugin for theme and plugin editing in WordPress.

## Our goals
We want to find the most convenient plugin which will allow us to edits HTML/PHP/CSS/JavaScript code everywhere in the 
admin panel: posts and pages, widgets, theme editors, third-party plug-ins and themes and etc. In order to check how the 
selected plugins work with third party themes, it was installed wonderful eCommerce theme 
[Blaszok]({{site_url}}/visit/blaszok_theme_details){:target="_blank", :rel="nofollow"} from ThemeForest. Let's start!  


### 1. Advanced Code Editor<a name="advanced-code-editor"></a>
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>2.2.7</td></tr>
<tr><td>Active installs:</td> <td>100,000+</td></tr>
<tr><td>Last updated:</td> <td>6 months ago</td></tr>
<tr><td>Engine:</td> <td>CodeMirror</td></tr>
<tr><td>Rating:</td> <td>4.6 based on 63 reviews</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/advanced-code-editor/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
Enables syntax highlighting in the integrated themes and plugins source code editors. Supports PHP, HTML, CSS and JS.

#### Overview
The first impression about the plugin is good. It do exactly what it should in accordance with description. Plain text 
editors for themes and plugins are converted into powerful source code editors. In addition, the plugin provides some 
common actions which helps a user to work with the editor. For example, search, replace, go to line, create new file or 
remove existing. It even has an ability to commit recent changes and restore an editing file from the previous commits. 

Unfortunately, the first good impression disappears after 2-3 minutes of working with the plugin. For example, 
Commit/Restore feature is buggy. Restored versions of a file are not formatted properly and don't works. Whole user 
interface looks unprofessional and you've a constant feeling that it is possible to create the same things much more 
better. Just take a look at the screenshot of this dialog:

<figure>
  <img src='{{site.url}}/img/blog/Advanced-Code-Editor-file-versions-dialog.png' alt='Advanced Code Editor file versions dialog'>
  <figcaption>Advanced Code Editor file versions dialog</figcaption>
</figure>

Any idea about proposal of the brown image at the bottom? No? It removes all saved revisions of the currently editing 
file. Typos in the UI also don't make this plugin better.

#### Conclusion
**Rating:** 2 of 5.
Good idea, but bad implementation. You can use this plugin only if you need to add small one-time changes. It is better
to find some other alternative solution if you're going to work with the themes/plugins code in WordPress.
  

### 2. WP Editor<a name="wp-editor"></a>
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>1.2.6.3</td></tr>
<tr><td>Active installs:</td> <td>100,000+</td></tr>
<tr><td>Last updated:</td> <td>6 months ago</td></tr>
<tr><td>Engine:</td> <td>CodeMirror</td></tr>
<tr><td>Rating:</td> <td>4.7 based on 85 reviews</td></tr>
<tr><td>Home:</td> <td><a href="https://wpeditor.net/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
WP Editor is a plugin for WordPress that replaces the default plugin and theme editors as well as the page/post editor.

#### Overview
We've installed WP Editor plugin with the hope that it will be much better then previous one. And it had not 
disappointed us in this sense. Right after installation of the plugin we opened it's settings page and were impressed 
by the number of available options. First of all, you've full control over integration of the plugin with WordPress. It 
can be disabled for posts/pages or theme/plugins editors. In addition, each type of the editors has standalone settings.  
It is a bit difficult to imagine why you may need to use a different themes for the different editors, for example, but 
presence of this ability makes good impression.
 
What about main features of the editor? Unfortunately, it is not so reach as in [Advanced Code Editor]({{site_url}}{{page_url}}#advanced-code-editor). 
WP Editor has minimum set of functions: 
* `undo` and `redo`
* `search` 
* `find prev` and `find next` 
* `replace` and `replace all`

But take a look how the main toolbar looks:
<figure>
  <img src='{{site.url}}/img/blog/WP-Editor-toolbar.png' alt='WP Editor Toolbar'>
  <figcaption>WP Editor Toolbar</figcaption>
</figure>

To be honest, we expected to see a bit more stylis solution in 2017. In addition, UX of some functions is not very good. 
For example, It is quite inconvenient to use `replace / replace all` functions.  

#### Conclusion
**Rating:** 3 of 5.
It seems that WP Edit much more better it's the first competitor. But it is still far away from ideal.

### 3. CodeMirror File Editor<a name="codemirror-file-editor"></a>
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>1.2.4</td></tr>
<tr><td>Active installs:</td> <td>1,000+</td></tr>
<tr><td>Last updated:</td> <td>3 months ago</td></tr>
<tr><td>Engine:</td> <td>CodeMirror</td></tr>
<tr><td>Rating:</td> <td>4.8 based on 5 reviews</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/codemirror-file-editor/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
Replaces defaults WordPress Theme and Plugin Editors with CodeMirror with syntax highlighting and other features.

#### Overview
Yet another plugin for improving Theme / Plugin Editors. We've not expected to see some new and exciting features after 
reviewing the first two plugins. It was interesting just to find a better implementation of the most common set of 
functions. And this plugin has not disappointed us. It is basic and minimalistic. The plugin has no options or toolbars. 
A user just have the list of hot keys which allow him to find/replace content in the editor. However, implementation of 
`search`/`replace` functions is very similar to [WP Editor]({{site_url}}{{page_url}}#wp-editor) and also can be improved.

Some hot keys don't works in Google Chrome. So, it will be useful to have Options page with an ability to redefine the 
standard hot keys. Nevertheless, we wish to note the general positive impression from this plugin. It has highest 
rating of already reviewed plugins for good reason.

#### Conclusion
**Rating:** 4 of 5.
WP Editor is a good choice in you need to edit Plugins / Themes only.

### 4. HTML Editor Syntax Highlighter
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>1.7.2</td></tr>
<tr><td>Active installs:</td> <td>20,000+</td></tr>
<tr><td>Last updated:</td> <td>10 months ago</td></tr>
<tr><td>Engine:</td> <td>CodeMirror</td></tr>
<tr><td>Rating:</td> <td>4.5 based on 63 reviews</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/html-editor-syntax-highlighter/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
Add syntax highlighting in the WordPress Post & Page HTML/text editor using Codemirror.js

#### Overview
This plugin do only one thing like it is described. It a couple options only: you can choose the editor's theme and font 
size. Also it is possible to enable full screen mode. It works quite good and the most of users outline this fact in 
their comments. But this plugin has one big problem: it is incompatible with many other plugins which extend functionality 
of the standard page/post editor. That is why some part of users give it low rank. 

#### Conclusion
**Rating:** 4 of 5.
It worth to use this plugin if you don't have any compatibility problems with the other already installed plugins.

### 5. Syntax Highlighter for Post/Page HTML Editor
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>3.2</td></tr>
<tr><td>Active installs:</td> <td>1,000+</td></tr>
<tr><td>Last updated:</td> <td>5 months ago</td></tr>
<tr><td>Engine:</td> <td>CodeMirror</td></tr>
<tr><td>Rating:</td> <td>4.5 based on 2 review</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/syntax-highlighter-for-wp-editor/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
An easy to use WordPress plugin that replaces the default Theme and Plugin Source Code Editor with an enhanced editor 
by a CodeMirror library.

#### Overview
This plugin is almost the same as the previous one. It just have a bit different set of options. Unfortunately, it's 
implementation is far away from ideal. For example, after switching between Text/Visual tabs in the post editor you'll 
see the next picture:

<figure>
  <img src='{{site.url}}/img/blog/Syntax-Highlighter-for-WP-Editor.png' alt='Syntax Highlighter for WP Editor'>
  <figcaption>Bad Synchronization Between Rich and Code Editors</figcaption>
</figure>

Now you can change content in the both editors and it will not be synchronized. 

#### Conclusion
**Rating:** 2 of 5.
Not recommended to use. [CodeMirror File Editor]({{site_url}}{{page_url}}#codemirror-file-editor) looks much more better.

### 6. Syntax Highlighter for WP Editor
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>1.0</td></tr>
<tr><td>Active installs:</td> <td>100+</td></tr>
<tr><td>Last updated:</td> <td>2 months ago</td></tr>
<tr><td>Engine:</td> <td>CodeMirror</td></tr>
<tr><td>Rating:</td> <td>5 based on 1 review</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/syntax-highlighter-for-postpage-html-editor/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
An easy to use WordPress plugin that replaces the default Theme and Plugin Source Code Editor with an enhanced editor 
by a CodeMirror library.

#### Overview
Another one plugin from the previous author. Instead of improving pages/posts editor, it is focused on improving 
theme/plugin editor. It is also has some important problems. For example, by default long lines wrapping is not enabled. 
And there is no appropriate option in the plugin's options to turn it no. It is quite curious because the previous 
plugin of the same author has this setting on the options page.

#### Conclusion
**Rating:** 2 of 5.
Not recommended to use.

### 7. Ace Edit
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>1.1</td></tr>
<tr><td>Active installs:</td> <td>400+</td></tr>
<tr><td>Last updated:</td> <td>2 months ago</td></tr>
<tr><td>Engine:</td> <td>ACE</td></tr>
<tr><td>Rating:</td> <td>5 based on 2 reviews</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/ace-edit/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
This plugin will improve the build in theme and plugin editor in WordPress with typical code editor features like syntax 
highlighting.

#### Overview
Unlike all the previous plugins, this one is based on another code editor library called [ACE](https://ace.c9.io/){:target="_blank"}
It does not have any options yet, but it's author has promised to improve the plugin and add various settings to the plugin.
It looks promising and even luck of features don't give us to put low rating to this plugin.

#### Conclusion
**Rating:** 4 of 5.
There are some other more powerful plugins already exists. But it has sense to check this one in the future.

### 8. GMAce <a name="gmace"></a>
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>1.5.2</td></tr>
<tr><td>Active installs:</td> <td>1,000+</td></tr>
<tr><td>Last updated:</td> <td>5 months ago</td></tr>
<tr><td>Engine:</td> <td>ACE</td></tr>
<tr><td>Rating:</td> <td>4.9 based on 7 review</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/gmace/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
Quick code editor of any file on your WordPress site with syntax highlighting, supports editing multiple files at once 
and stylish look in any design of your console.

#### Overview
This plugin is a bit different from all the previous tools. Instead of integration with the current WordPress editors, 
this one creates standalone mini-IDE and allows you to create and edit any file under home directory of your site. 

There are a number of common features added: quick search, themes switching, hot keys for some actions and etc. Autocompletion 
feature works not so good as in the CodeMirror-based editors. 

#### Conclusion
**Rating:** 4 of 5.
Good choice if you need to add some changes in the files which are located outside of your theme/plugins folder (for 
example, you may need to add some changes in .htaccess file). Of course, it is not so convenient as the most of web-based 
IDEs and can be improved with the wide range of the different features. But it is OK to use it "as-is" because it can 
simplify your work at some points. 

### 9. WPide
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>2.4.0</td></tr>
<tr><td>Active installs:</td> <td>50,000+</td></tr>
<tr><td>Last updated:</td> <td>2 years ago</td></tr>
<tr><td>Engine:</td> <td>ACE</td></tr>
<tr><td>Rating:</td> <td>4.7 based on 49 review</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/wpide/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
WPide is a WordPress code editor with the long term goal of becoming the ultimate environment to code/develop WordPress 
themes and plugins.

#### Overview
At the first glance it looks fantastic. This plugin is much more closer to the real IDE than [GMAce]({{site_url}}{{page_url}}#gmace).
Just take a look at the screenshot with autocompletion and inlined function reference:

<figure>
  <img src='{{site.url}}/img/blog/WPide-Autocompletion-with-Functions-Reference.png' alt='WPide Screenshot'>
  <figcaption>WPide With Autocompletion And Functions Reference</figcaption>
</figure>

It has all the necessary settings which allows you to configure the IDE for your needs. All is almost excellent. But...
Why the last update was released more than 2 years ago??? Oh no, it seems that the project is on hold. It is lucky that
it still works with the latest WordPress versions. But it is sad to realize that we will not see any improvements in the 
future.

#### Conclusion
**Rating:** 4.5 of 5.
Great IDE for editing your files. You can even study WordPress API with it. Unfortunately, it is not under active 
development anymore.  


### 10. AceIDE
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>2.5.5</td></tr>
<tr><td>Active installs:</td> <td>2,000+</td></tr>
<tr><td>Last updated:</td> <td>5 days ago</td></tr>
<tr><td>Engine:</td> <td>ACE</td></tr>
<tr><td>Rating:</td> <td>5 based on 5 review</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/aceide/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
AceIDE is a code editor with the long term goal of becoming the ultimate environment to develop themes and plugins.

#### Overview
First impression can be very confusion. This plugin looks like simple clone of WPide. They even have the same screenshots.
It takes a couple of minutes to take a closer look at the both plugins and understand that AceIDE is a fork of the WPide 
project, which is no longer supported. Wow! It seems that someone decided to continue work of the perspective project.   

As for functionality, AceIDE is completely built upon the WPide and has all the same features. The developers has fixed 
some bugs and added a couple of new features and improvements in the recent releases. The last update was published 5 
days ago (at the moment of writing this article). So, we hope that the AceIDE developers will continue their work and 
add even more exciting features.    

#### Conclusion
**Rating:** 5 of 5.
The best WordPress IDE plugin at the moment. You definitely need to install it instead of the old WPide project. It seems 
that not all WordPress developers understand the difference between these two plugins. WPide is still more popular than 
AceIDE, mainly because there is no clear reference from WPide plugin to it's new fork.  

### 11. WP Editor Widget
<table class="table-striped plugin-info">
<tbody>
<tr><td>Version:</td> <td>0.5.5</td></tr>
<tr><td>Active installs:</td> <td>20,000+</td></tr>
<tr><td>Last updated:</td> <td>5 months ago</td></tr>
<tr><td>Engine:</td> <td>-</td></tr>
<tr><td>Rating:</td> <td>4.6 based on 16 review</td></tr>
<tr><td>Home:</td> <td><a href="https://wordpress.org/plugins/wp-editor-widget/" target="_blank">Plugin's home</a></td></tr>
</tbody>
</table>

#### Official Description
This plugin adds a rich text widget where the content is edited using the standard WordPress visual editor which most 
users already are familiar with.

#### Overview
Unlike all the previous plugins, this one is not about syntax highlighting. But it covers one important case. So, it 
definitely worth to be mentioned in this article.

As you see from the description, it simply adds new widget which allow you to edit your text with the same rich text 
editor as you're using normally for posts/pages editing. It seems that most of negative reviews were considered old 
version of the plugin. At least we did not find any problems mentioned by the previous reviewers.    

#### Conclusion
**Rating:** 4.5 of 5.
Great plugin. Do exactly what it should. It can be improved by adding syntax highlighting to the Text tab.


## Summary <a name="summary"></a>