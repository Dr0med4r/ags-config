import Workspaces from "./bar/Workspaces"
import VolumeIndicator from "./bar/Volume"
import Clock from "./bar/Clock"
import NetworkIndicator from "./bar/Network"
import System from "./bar/System"
import Systemtray from "./bar/Systemtray"

const hyprland = await Service.import("hyprland")

function monitors_changed(_, name: any) {
    // do not execute on startup
    if (!name) {
        return
    }

    const current_monitors = hyprland.monitors.map((v) => String(v.id))
    const tmp = Widget.Window({
        name: "tmp",
        css: "padding: 1px; margin: 1px;",
    })
    App.addWindow(tmp)
    current_monitors.forEach((id) => {
        App.removeWindow(`bar${id}`)
        App.addWindow(Bar(Number(id)))
    })
    App.removeWindow(tmp)
}

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

const Bar = (monitor: number) => Widget.Window({
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
    .hook(hyprland, monitors_changed, "monitor-added")
    .hook(hyprland, monitors_changed, "monitor-removed")


export default Bar
