Jesture
=======

Jake Seaton
Quincy-Dewolfe 20-05

Location
---
Code:
Product:

Description
---
Jesture is a practical chrome extension for interacting with the Harvard Lampoon website. It is designed to allow users to save large amounts of data very rapidly, and then organize it in the ways that they would want to.

**Background**
The background script does two things. It tells the content script the current URL, and it receives Url's from the content script for pieces. It uses AJAX to retrieve the text content of these pieces, and store it in local storage by the URL.

The function clear_all() is not currently called by anything, so if the user wanted to delete all of their storage at once they could open the background page of the applicaiton and call the function.

**Content Script**
The content script is run on every page of the lampoon website. It retrieves the current URL from the background, and then runs a different main function depending on the types of content on the current page. The star icon is appended to every object that the user could favorite. The hat icon is appended to every item that allows the user to favorite large groups of objects. When clicked, they change to active, and store their content in chrome.storage.sync. If is a piece, the content script send a message to the background to store the issue's text in localStorage.

**Popup**
The popup is the main organizational component of the extension. The user can view content organized into four categories: pieces, issues, art, and authors. To view all pieces saved in order of recency, go to the pieces tab. For all pieces saved, organized by issue number, issues. For all pieces saved, organized by author, Authors. All art, including comix and piece images, is visible under art.

**Jesture Page**
The final icon directs the user to the main page of the application, which is a feed of everything they have favorited in order of recency. The page emulates the thumbnails style of the lampoon website, with the ability to visit a piece offline by clicking on the browser icon. Clicking on the actual thumbnail redirects to the piece on lampoon website.

Known Issues:
---
-- Rare use cases, such as going offline and favoriting a comic while offline, can result in the title not being stored properly.
-- I was unable to rigorously test the extension on multiple devices due to problems with the chome store. All documentation indicates that chrome.storage.sync will be pushed to all devices signed in to the same chrome account.
-- Occasional errors connecting to the extension when huge amounts of data are favorited, such as an entire issue.
-- Errors thrown in compilation of the portions of the lampoon website's css document that were borrowed to recreate the feed on the jesture page.
