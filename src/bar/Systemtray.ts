import { TrayItem } from "resource:///com/github/Aylur/ags/service/systemtray.js";

const systemtray = await Service.import('systemtray')

const SysTrayItem = (item: TrayItem) => Widget.Button({
    class_name: "SystemTrayItem",
    child: Widget.Icon().bind('icon', item, 'icon'),
    tooltip_markup: item.bind('tooltip_markup'),
    on_primary_click: (_, event) => item.activate(event),
    on_secondary_click: (_, event) => item.openMenu(event),
});

export default () => Widget.Box({
    class_name: "SystemTray",
    children: systemtray.bind('items').as(i => i.map(SysTrayItem))
})
