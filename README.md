Jesture
=======

Jake Seaton

Quincy-Dewolfe 20-05

Location
---
Code: github.com/jakeseaton/jesture

Product: https://www.dropbox.com/sh/jxxltyy0u6aji32/AACbTYCmUJ4KkvFLiRcOzHGFa?dl=0

Description
---
Jesture is a practical chrome extension designed to enhance the user's ability to interact with the content of the lampoon website. It allows the user to save large amounts of data from the website rapidly, access it offline, and use it in meaningful ways. 

It augments the experience of the website by injecting elements that allows saving content in different ways. Clicking on stars saves small amounts of data, like a piece or a Comix, while clicking on a hat will save an entire issue, or every piece by a particular author.

This content is then made available offline in the popup, whose sections and panels allow the information to be partitioned in various ways. The full page, accessed by clicking the hat icon in the navigation bar of the popup, provides a feed, ordered by recency, of all content saved. Here, saved content can also be deleted.

Interface Elements
---

**Popup:**

The popup is the main organizational component of the extension. The user can view content organized into four categories: pieces, issues, art, and authors. The pieces tab sorts saved pieces alphabetically. The issues tab sorts them by issue number, and the author tab by author. All art from pieces and issues the user has saved is visible under Art.

In each panel, content is presented very differently from the way it is in the magazine. This is a useful feature, particularly for compers. They can group by issue, to try to get a holistic sense of how the voice of the magazine has evolved over time, or by author, to see how styles vary or study up on their comp directors. They can also separate art from text, with the ability to view the first in high detail and the latter completely separate from the context in which it appeared in the magazine.

**Jesture Page:**
The final icon directs the user to the main page of the extension, which is a feed of everything they have favorited in order of recency. The page emulates the thumbnails style of the lampoon website, preserving the aesthetic experience that may have been lost in the popup. Authors are displayed with the image of the jester, and pieces without art are paired with the extension's logo. Each thumbnail links to its corresponding content on the lampoon website, while pieces have the additional ability to be displayed offline. By clicking the browser icon, the piece fills the screen and its title fills the banner. Click the thumbnails icon to return to the feed.

Back End
---

**Background:**
The background script does two things. It tells the content script the current URL, and it receives Url's from the content script for pieces. It uses AJAX to retrieve the text content of these pieces, and store it in local storage by the URL.

**Content Script:**
The content script is run on every page of the lampoon website. It retrieves the current URL from the background, and then runs a different main function depending on the types of content on the current page. The star icon is appended to every object that the user could favorite. The hat icon is appended to every item that allows the user to favorite large groups of objects. When clicked, they change to active, and store their content in chrome.storage.sync. If is a piece, the content script send a message to the background to store the issue's text in localStorage.

To Use
---

1) Open chrome, go to chrome://extensions
2) Drag and drop the jesture.crx file onto chrome.

Known Issues:

-- Not rigorously tested on multiple devices due to the chome store's new policy.

-- Not rigorously tested with changes made to the lampoon website since first round (infinite scroll), but was adjusted to account for the class name change.

-- Going offline and then favoriting a comic while still offline results in its title being stored improperly.

-- Pieces and Art in the popup are alphabetized by URL. As a result, the piece on the home page will always be at the top.

-- Issues saved from their thumbnail page, where their cover image is not displayed, will not store the cover image properly. The fix for this is to call to the issues page, search for the link to that particular issue, find the child image element, and store its source.