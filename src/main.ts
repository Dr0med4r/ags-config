import Gtk from "types/@girs/gtk-3.0/gtk-3.0"
import Bar from "./Bar"
import { VolumeControl } from "./bar/Volume"
import NetworkConfig from "./bar/windows/NetworkConfig"
const hyprland = await Service.import("hyprland")

Utils.monitorFile(`${App.configDir}`, () => {
    const css = `${App.configDir}/style.css`
    App.resetCss()
    App.applyCss(css)
})

function forAllMonitors(widget: (i: number) => Gtk.Window) {
    return Array.from({ length: hyprland.monitors.length }, (_, i) => widget(i))
}

App.config({
    style: "./style.css",
    windows: [
        ...forAllMonitors(Bar),
        NetworkConfig(),
        VolumeControl(),
    ],
})
