---
layout: post
comments: true
title:  "New version of CodeHighlight is released"

image:
    url: /img/blog/CodeHighlight_1_3_is_released.jpg
    alt: "Hightlight.js Integtation Sample"
meta:
    description:

categories: blog
---
The first version of CodeHighlight extension was released a long time ago. We've paused active development of the project
and switched to the higher priority projects. But all this time we had been discussing details of the project with our
users. So, finally we made a decision to resume the project.

Today we're releasing the next version of CodeHighlight extension for Chrome. It contains two significant features:
1. Tight integration with TinyMCE WYSIWYG HTML Editor.
2. Automatic code highlighting.

## TinyMCE Integration
You might find it strange that a such powerful and well known tool like TinyMCE still don't has a such necessary feature.
The answer is simple. It has. But it is not included into Community Edition which is installed on a vast majority of web
sites. You need to purchase the monthly Premium or Pro subscription in order to get an ability to install
Advanced Code Editor plugin on your web site. With new CodeHighlight extension you can get the power of advanced code
editor everywhere you need.

In addition, we've added a such useful feature like source code formatting. It has a number of various configuration options.
So please refer to the **Settings&rarr;Integration&rarr;TinyMCE** section of the extension's Options page to get the details.

## Automatic code highlighting
We've add an ability to **save syntax highlighting settings** for any editor on any web page. It might be very helpful when
you need to work frequently with some code editor on a particular page. At the moment after a web page reloading you need
to add source code highlighting manually. Now you can just press Save button at the right bottom corner for the editor.
CodeHighlight extension will save your settings and they should be restored after the page reloading:

<figure>
  <img src='{{site.url}}/img/blog/CodeHighlight_Save_Button.png' alt='Save Button Inside Code Editor'>
  <figcaption>Save Button Inside a Code Editor</figcaption>
</figure>

When you click on the Save button, the prompt dialog will appear and ask you to confirm URL of the page or enter some
pattern instead of the exact URL:

<figure>
  <img src='{{site.url}}/img/blog/CodeHighlight_Pattern_Confirmation.png' alt='URL or Pattern Prompt Dialog'>
  <figcaption>URL or Pattern Prompt Dialog</figcaption>
</figure>

The **pattern specification** feature can be very helpful if you need to work with the same editor on the different pages of a
single web site. Let's assume that you need to edit some articles on the next pages:

* http://somesite.com/article/article-1-slug?action=edit
* http://somesite.com/article/article-2-slug?action=edit
{:.urls-list}

Instead of enabling code highlighting on the each and every page of this web site you can do that only once using the next pattern:
* http://somesite.com/article/\*
{:.urls-list}

**Note:** the saved settings are permanent. Changing of the global options of the extension will not affect on the saved
configuration. You need to remove the saved editor and add it again in order to update it's settings.
[Let us know]({{site.support_page}} "Open Support Page"){:target="_blank"} if you'll find a such behaviour inconvenient and we will add the necessary changes.