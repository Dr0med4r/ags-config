import { VpnConnection } from "types/service/network"
import { Connections } from "../NetworkConfig"

const network = await Service.import("network")

const VPNConnection = (connection: VpnConnection) => Widget.Box({
    className: "VPNConnection",
    children: [
        Widget.ToggleButton({
            className: "VPNSwitch",
            onToggled: (self) => connection.setConnection(self.active)
        }).hook(connection,
            self => self.active = (connection.state === "connected" || connection.state === "connecting"),
            "changed"),
        Widget.Label({ label: connection.id })

    ]
})


function connections() {
    return network.vpn.connections.map((e) => VPNConnection(e))
}


const VPNSettings = () => Widget.Box({
    vertical: true,
    children: [
        Connections("VPN", connections)
    ],

})


export default VPNSettings
