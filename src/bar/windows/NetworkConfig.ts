import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import VPNSettings from "./NetworkConfig/VPNSettings";
import WifiSettings from "./NetworkConfig/WifiSettings";


const connectionType = Variable("wifi")

const TypeOfConnection = () => Widget.CenterBox({
    className: "ConnectionTypes",
    startWidget: Widget.Button({
        on_clicked: () => connectionType.value = "wifi",
        child: Widget.Label({ label: "Wifi" })
    }),
    endWidget: Widget.Button({
        on_clicked: () => connectionType.value = "vpn",
        child: Widget.Label({ label: "VPN" })
    })
})

export const Connections = (name: string, connections: () => Gtk.Widget[]) => Widget.Scrollable({
    className: `${name}Connections`,
    vscroll: "always",
    hscroll: "never",
    child: Widget.Box({
        vertical: true,
        children: connections(),
    })
})


const ConnectionSettings = () => Widget.Stack({
    className: "ConnectionSettings",
    shown: connectionType.bind().as((v) => v === "wifi" || v === "vpn"  ? v : "wifi"),
    children: {
        wifi: WifiSettings(),
        vpn: VPNSettings(),
    },

})

const NetworkConfig = (monitor: number) => Widget.Window({
    visible: false,
    monitor,
    name: `networkConfig${monitor}`,
    anchor: ["top"],
    className: "NetworkConfig",
    child: Widget.Box({
        vertical: true,
        children: [
            TypeOfConnection(),
            ConnectionSettings(),
        ],

    })
});

export default NetworkConfig
