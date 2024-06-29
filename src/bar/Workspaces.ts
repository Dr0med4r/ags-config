const hyprland = await Service.import('hyprland')

const dispatch = (ws: string | number) => hyprland.messageAsync(`dispatch workspace ${ws}`);


function workspacesOnMonitor(monitorId: number) {
    return Array.
        from({ length: 10 }, (_, i) => i + 1)
        .map((i) => Widget.Button({
            className: "WorkspaceButton",
            attribute: { monitor: monitorId, workspace: i },
            label: `${i}`,
            onClicked: () => dispatch(i),
        }).hook(hyprland.active.workspace, self => {
            if (self.attribute.workspace === hyprland.active.workspace.id) {
                self.toggleClassName("active", true);
            }
            else {
                self.toggleClassName("active", false);
            }
        }))
}

const Monitors = () => Array.
    from({ length: hyprland.monitors.length }, (_, i) => i)
    .map(i => Widget.Box({
        className: `Workspaces monitor${i}`,
        css: 'margin-right: 1em;',
        children: workspacesOnMonitor(i),
        setup: (self) => self.hook(hyprland, () => self.children.forEach((btn) => {
            btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute.workspace && ws.monitorID === btn.attribute.monitor);
        })),
    }))

const Workspaces = () => Widget.EventBox({
    className: "Workspaces",
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    child: Widget.Box({
        children: Monitors(),
    }),
})


export default Workspaces 
