import Workspaces from "./bar/Workspaces"
import VolumeIndicator from "./bar/Volume"
import Clock from "./bar/Clock"
import NetworkIndicator from "./bar/Network"
import System from "./bar/System"
import Systemtray from "./bar/Systemtray"



const Left = () => Widget.Box({
    hpack: "start",
    class_name: "Left",
    children: [
        Workspaces(),
    ],
})

const Center = () => Widget.Box({
    class_name: "Center",
    children: [
        VolumeIndicator(),
        NetworkIndicator(),
    ],
})



const Right = () => Widget.Box({
    hpack: "end",
    class_name: "Right",
    children: [
        System(),
        Clock(),
        Systemtray(),
    ]
})

export default (monitor: number) => Widget.Window({
    monitor: monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        start_widget: Left(),
        center_widget: Center(),
        end_widget: Right(),
    }),
})
