
const audio = await Service.import('audio')

/** @param {'speaker' | 'microphone'} type */
const VolumeSlider = (type: 'speaker' | 'microphone' = 'speaker') => Widget.Slider({
    hexpand: true,
    drawValue: false,
    css: "min-width: 80px",
    onChange: ({ value }) => audio[type].volume = value,
    value: audio[type].bind('volume'),
})

const speakerSlider = VolumeSlider('speaker')
const micSlider = VolumeSlider('microphone')

const volumeChange = 2/100

const VolumeIndicator = () => Widget.EventBox({
    attribute: VolumeControl,
    on_primary_click: () => audio.speaker.is_muted = !audio.speaker.is_muted,
    on_hover: (self) => self.attribute.child.child.child.revealChild = true,
    on_hover_lost: (self) => self.attribute.child.child.child.revealChild = false,
    on_secondary_click: (self) => {
        self.attribute.child.child.child.revealChild = !self.attribute.child.child.child.revealChild
    },
    on_scroll_up: () => {audio["speaker"].volume += volumeChange},
    on_scroll_down: () => {audio["speaker"].volume -= volumeChange},
    child: Widget.Icon().hook(audio.speaker, self => {
        const vol = audio.speaker.volume * 100;
        const icon = [
            [101, 'overamplified'],
            [67, 'high'],
            [34, 'medium'],
            [1, 'low'],
            [0, 'muted'],
        ].find(([threshold]) => threshold <= vol)?.[1];

        self.icon = `audio-volume-${icon}-symbolic`;
        self.tooltip_text = `Volume ${Math.floor(vol)}%`;
    }),
    // setup: (self) => {
    //     App.add_window(self.attribute)
    // }
})

const VolumeControl =  Widget.Window({
    name: `volume-menu`,
    anchor: ["top"],
    child: Widget.Box({
        css: "padding: 1px",
        child: Widget.EventBox({
            on_hover_lost: (self) => self.child.revealChild = false,
            child: Widget.Revealer({
                transition: "slide_down",
                transitionDuration: 1,
                revealChild: false,
                child: Widget.Box({
                    children: [
                        speakerSlider,
                        micSlider
                    ],
                }),
            }),
        }),
    }),
})


export default () => Widget.Box({
    children: [VolumeIndicator(),],
    setup: () => App.add_window(VolumeControl)
})
