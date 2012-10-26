Window Search (A GNOME Shell extension)
=======================================

This extension allows you to quickly switch between your open windows by searching
the window titles directly from the Overview.

So far not much is implemented, but here's what I have planned:

- There will be a separate shortcut for invoking Window Search. It will still display
  the same Overview, but the search will work for windows instead of applications.
- If you start typing, the windows will be reduced to your matches and pressing
  Enter or clicking on a preview will switch to that window.
- You'll be able to move through the result windows with the arrow keys.
- Use a sophisticated matching algorithm such as the one used by Command-T (TextMate,
  Vim, etc.).
- (Maybe) Improve the search by matching other text besides the titles, such as
  window contents or tab titles if available.

Let me know your suggestions in the Issues.
