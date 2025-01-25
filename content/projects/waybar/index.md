# Waybar

Waybar is a bar with a list of open applications, widgets, clock, tray and system statuses. It is highly configurable and popular among the Wayland community.

When a user opens an application, its icon is displayed in Waybar. Wayland will announce the application id, `app_id`, to Waybar, and this ID is used to look up the corresponding icon from a .desktop file. However, this can fail in two instances:

1. The icon given in the .desktop file for that application cannot be found.
2. Waybar is not given an `app_id`, so lookup is impossible.

When an icon could not be loaded, the previous default behaviour of Waybar was to display nothing. There would thus not be a visual indicator that there was in fact an application open, so it was in some sense "hiding" in plain sight.

I made [a Pull Request](https://github.com/Alexays/Waybar/pull/2677) to Waybar where I fixed this behaviour, so that a default fallback icon would be used.


{{thumbnails |text=A screenshot of what Waybar might look like, and a before and after screenshot of the icon missing vs it instead using a fallback.}}
{{thumbnail |title=Waybar |small=waybar_small.png |large=waybar.png}}
{{thumbnail |title=Waybar with no fallback icon |small=waybar_before_small.png |large=waybar_before.png}}
{{thumbnail |title=Waybar with a fallback icon  |small=waybar_after_small.png  |large=waybar_after.png}}
