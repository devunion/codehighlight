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
text theme and plugin editor. If you don't have a time to read whole article, simply jump at the 
<a href="#summary">Summary</a> section to find out the best plugin.
</p>

## Why it worth to read comparison articles  
 You know, it is quite annoying to install a dozens of the similar plugins trying to find the best of them. But in the 
 most of cases we've more important tasks rather than reviewing the different plugins. That is why we can choose not 
 the best of available solutions, but just *suitable enough* for us at the moment. The worst thing is that we can use 
 it for years because it do it's work and don't have an idea about much more convenient tools. Stay with us and we will 
 show you the best plugin for theme and plugin editing in WordPress.

<a name="advanced-code-editor"></a>
### 1. Advanced Code Editor
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
The first impression about the plugin is good. It do exactly what it should in accordance with the description. Plain text 
editors for themes and plugins are converted into powerful source code editors. In addition, the plugin provides some 
common actions which helps a user to work with the editor. For example, ***search***, ***replace***, ***go to line***, 
***create new file*** or ***remove already existing***. It even has an ability to ***commit*** recent changes and 
***restore*** an editing file from the previous commits. 

Unfortunately, initial good impression disappears after the first 2-3 minutes of working with the plugin. For example, 
commit/restore feature is a bit buggy. Restored version of a file is not formatted properly and don't works as expected. 
Whole user interface looks unprofessional and you've a constant feeling that it is possible to create the same things 
much more better. Take a look at the screenshot of this dialog:

<figure>
  <img src='{{site.url}}/img/blog/Advanced-Code-Editor-file-versions-dialog.png' alt='Advanced Code Editor file versions dialog'>
  <figcaption>Advanced Code Editor file versions dialog</figcaption>
</figure>

Any idea about proposal of the brown image at the bottom? No? It removes all saved revisions of the currently editing 
file. Typos in the UI also don't make this plugin better.

#### Conclusion
**Rating: 2 of 5**.
Good idea, but bad implementation. You can use this plugin only if you need to add small one-time changes. It is better
to find some other alternative solution if you're going to work with the themes/plugins code in WordPress.
  
<a name="wp-editor"></a>
### 2. WP Editor
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
We've installed WP Editor plugin with the hope that it will be much better then the previous one. And it had not 
disappointed us in this sense. Right after installation of the plugin we opened it's settings page and were impressed 
by the number of available options. First of all, **you've full control over integration of the plugin with WordPress**. 
WP Editor can be disabled for posts/pages or theme/plugins editors separately. In addition, each type of the editors 
has own settings page. It is a bit difficult to imagine why you may need to use a different themes for the different 
editors, for example, but presence of this ability makes good impression.
 
What about main features of the editor? Unfortunately, they are not so reach as in [Advanced Code Editor]({{site_url}}{{page_url}}#advanced-code-editor). 
WP Editor has minimum set of functions: 
* ***undo***/***redo***
* ***search*** 
* ***find next***/***prev*** 
* ***replace*** and ***replace all***

But take a look how the main toolbar is designed:
<figure>
  <img src='{{site.url}}/img/blog/WP-Editor-toolbar.png' alt='WP Editor Toolbar'>
  <figcaption>WP Editor Toolbar</figcaption>
</figure>

To be honest, we expected to see a bit more stylish solution in 2017. In addition, UX of some functions is not very good. 
For example, It is quite inconvenient to use ***replace***/***replace all*** functions.  

#### Conclusion
**Rating: 4 of 5**.
Of course, WP Edit is much more better than it's the first competitor. But it is still far away from ideal. Anyway, it 
has proven 4 stars for the rich set of available options.

<a name="codemirror-file-editor"></a>
### 3. CodeMirror File Editor
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
Yet another plugin for improving theme/plugin editors. We've not expected to see some new and exciting features after 
reviewing the first two plugins. It was interesting just to find a better implementation of the most common functions. 
And this plugin has not disappointed us. It is basic and minimalistic. The plugin has no options or toolbars. A user 
have the list of hot keys which allows him to find/replace content in the editor. However, implementation of 
***search***/***replace*** functions is very similar to [WP Editor]({{site_url}}{{page_url}}#wp-editor) and also can be 
improved.

Some hot keys don't work in Google Chrome as expected. So, it will be useful to have Options page with an ability to 
redefine the standard hot keys. Nevertheless, we wish to note a general positive impression from this plugin. It has 
highest rating of already reviewed plugins.

#### Conclusion
**Rating: 3.5 of 5**.
WP Editor is a good choice in you need to edit Plugins / Themes only.

### 4. Syntax Highlighter for WP Editor
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
This plugin is almost the same as the previous one. It just have a bit different set of available options. Unfortunately, 
it's implementation is far away from ideal. For example, after switching between Text/Visual tabs in the post editor 
you'll see the next glitch:

<figure>
  <img src='{{site.url}}/img/blog/Syntax-Highlighter-for-WP-Editor.png' alt='Syntax Highlighter for WP Editor'>
  <figcaption>Bad Synchronization Between Rich and Code Editors</figcaption>
</figure>

Now you can change content in the both editors and it will not be synchronized. 

#### Conclusion
**Rating:** 2 of 5.
Not recommended to use. [CodeMirror File Editor]({{site_url}}{{page_url}}#codemirror-file-editor) looks much more better.

### 5. Ace Edit
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
It does not have any options yet, but it's author has promised to improve the plugin and add a number of different 
settings to the plugin. It looks promising and even luck of features don't give us to put low rating to this plugin.

#### Conclusion
**Rating: 3.5 of 5.** There are some other more powerful plugins already exists. But it has sense to check this one again 
after a couple of months.

<a name="summary"></a>
## Summary
Its time to choose the winner of our small contest. In our opinion, [WP Editor](https://wpeditor.net/){:target="_blank"} 
worth to be named the best theme/plugin editor for WordPress in 2017. It looks more professional than the other competitors 
and have all necessary functionality for the convenient development. In addition, there are tons of options which will 
allow you to configure it as you wish. 

There is also another reason to choose this editor. It also has integration with the standard pages/post editor, thus 
you don't have to install additional plugins. We're going to write a standalone article which will be completely 
dedicated to the plugins which extend the standard page/post editors. 

Found this article helpful? **Follow us with Disqus** 
<sup><a href="https://help.disqus.com/customer/portal/articles/708520-following-other-users" target="_blank">how?</a></sup> 
or [FeedBurner](http://feeds.feedburner.com/CodeHighlight){:target="_blank"}.
