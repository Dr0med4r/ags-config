import Bar from "./Bar"
import { VolumeControl } from "./bar/Volume"


App.config({
    style: "./style.css",
    windows: [
        Bar(1),
        Bar(0),
        VolumeControl(1),
        VolumeControl(0),
    ],
})
