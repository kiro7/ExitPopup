# Ynteractive Exit Popup

Exit popups are a means displaying something to a user who is ready to close or navigate away from your page. Statistics show that using an exit popup increases the conversion rate of sales pages considerably ([http://blog.crazyegg.com/2014/08/18/opt-pop-ups/](http://blog.crazyegg.com/2014/08/18/opt-pop-ups/)).

This is a lightweight JS library with no dependencies that helps you implement your own, here's how it looks:

![How it looks](http://i.imgsafe.org/a1b0093.png)

## How to use it

1. Include the CSS file (css/exit-popup.css) or merge its contents into one of your own CSS files.
2. Add the HTML markup for your popup inside the body element of the page:

  ```HTML
  <div class="ynteractive-exit-popup" id="ynteractive-exit-popup">
      <div class="ynteractive-exit-popup-inner">
          <a class="ynteractive-exit-popup-close" href="#">x</a>
          <div class="ynteractive-exit-popup-content">
              <!-- Put your content here -->
          </div>
      </div>
  </div>
  ```
3. When the page is ready initialize the popup:

  ```js
  var popup = ynteractiveExitPopup({
      debug: true
  });
  ```

The popup object will now contain a public interface to interact with the popup.

## Options for the `ynteractiveExitPopup` function

Option | Description | Default
-------|-------------|--------
`target`|CSS selector for the root element of the popup|#ynteractive-exit-popup
`width`|Width of the popup in px or percent|40%
`height`|Height of the popup in px or percent|30%
`cookieIdentifier`|Name of the cookie to store whether the popup has been closed once. If this cookie is 1, the popup will not appear again|ynteractiveExitPopup
`cookieValidity`|Number of days to remember if the popup was closed|7
`closeOnOutsideClick`|If true the popup will close when clicked outside|true
`delay`|Delay in ms until the popup is registered|0
`debug`|If true, no cookie will be set to allow quick testing|false

## Public interface

The return value of the `ynteractiveExitPopup` function is an object with a public interface to further manipulate the created popup. Here are its methods:

- `open()`: Opens the popup programmatically.
- `destroy()`: If invoked, all events will be unbound and the DOM structure of the popup removed.
- `getElement()`: Returns the root element containing the popup.

## Get in touch

For any questions regarding this repository, email me at dragos (at) ynteractive (dot) com.
