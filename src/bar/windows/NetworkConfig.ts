import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import VPNSettings from "./NetworkConfig/VPNSettings";
import WifiSettings from "./NetworkConfig/WifiSettings";

const network = await Service.import("network")

const connectionType = Variable("wifi")

const TypeOfConnection = () => Widget.CenterBox({
    class_name: "ConnectionTypes",
    start_widget: Widget.Button({
        on_clicked: () => connectionType.value = "wifi",
        child: Widget.Label({ label: "Wifi" })
    }),
    end_widget: Widget.Button({
        on_clicked: () => connectionType.value = "vpn",
        child: Widget.Label({ label: "VPN" })
    })
})

export const Connections = (name: string, connections: () => Gtk.Widget[]) => Widget.Scrollable({
    class_name: `${name}Connections`,
    vscroll: "always",
    hscroll: "never",
    child: Widget.Box({
        vertical: true,
        children: network.wifi.bind("access_points").as(() => connections())
    })
})


const ConnectionSettings = () => Widget.Stack({
    class_name: "ConnectionSettings",
    shown: connectionType.bind().as((v) => v === "wifi" || v === "vpn"  ? v : "wifi"),
    children: {
        wifi: WifiSettings(),
        vpn: VPNSettings(),
    },

})

const NetworkConfig = () => Widget.Window({
    visible: false,
    name: `networkConfig`,
    anchor: ["top"],
    class_name: "NetworkConfig",
    child: Widget.Box({
        vertical: true,
        children: [
            TypeOfConnection(),
            ConnectionSettings(),
        ],

    })
});

export default NetworkConfig
