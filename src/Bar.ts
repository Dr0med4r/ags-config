import Workspaces from "./bar/Workspaces"
import VolumeIndicator from "./bar/Volume"
import SystemStat from "./bar/right/SystemStat"
import Systemtray from "./bar/right/Systemtray"
import Clock from "./bar/Clock"
import NetworkIndicator from "./bar/Network"



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
        SystemStat(),
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
