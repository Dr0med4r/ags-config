import Bar from "./Bar"
import { VolumeControl } from "./bar/Volume"
import NetworkConfig from "./bar/windows/NetworkConfig"

Utils.monitorFile(`${App.configDir}`, () => {
    const css = `${App.configDir}/style.css`
    App.resetCss()
    App.applyCss(css)
})

App.config({
    style: "./style.css",
    windows: [
        Bar(0),
        VolumeControl(0),
        NetworkConfig(0),
    ],
})
