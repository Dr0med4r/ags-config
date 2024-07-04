import Workspaces from "./bar/Workspaces"
import VolumeIndicator from "./bar/Volume"
import Clock from "./bar/Clock"
import NetworkIndicator from "./bar/Network"
import System from "./bar/System"
import Systemtray from "./bar/Systemtray"



const Left = (monitor) => Widget.Box({
    hpack: "start",
    class_name: "Left",
    children: [
        Workspaces(),
    ],
})

const Center = (monitor: number) => Widget.Box({
    class_name: "Center",
    children: [
        VolumeIndicator(monitor),
        NetworkIndicator(monitor),
    ],
})



const Right = (monitor) => Widget.Box({
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
        start_widget: Left(monitor),
        center_widget: Center(monitor),
        end_widget: Right(monitor),
    }),
})
