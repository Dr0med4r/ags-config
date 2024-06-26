import { TrayItem } from "resource:///com/github/Aylur/ags/service/systemtray.js";

const systemtray = await Service.import('systemtray')

const SysTrayItem = (item: TrayItem) => Widget.Button({
    child: Widget.Icon().bind('icon', item, 'icon'),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
});

export default () => Widget.Box({
    children: systemtray.bind('items').as(i => i.map(SysTrayItem))
})
