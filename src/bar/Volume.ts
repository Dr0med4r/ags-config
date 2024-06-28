
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

const volumeChange = 2 / 100

const VolumeIndicator = () => Widget.EventBox({
    // attribute: .child.child.child.revealChild,
    on_primary_click: () => audio.speaker.is_muted = !audio.speaker.is_muted,
    on_hover: (self) => self.attribute = true,
    on_hover_lost: (self) => self.attribute = false,
    on_secondary_click: (self) => {
        self.attribute = !self.attribute
    },
    on_scroll_up: () => { audio["speaker"].volume += volumeChange },
    on_scroll_down: () => { audio["speaker"].volume -= volumeChange },
    child: Widget.Box({
        children: [
            Widget.Label().hook(audio.speaker, self => {
                self.label = `${Math.round(audio.speaker.volume*100)}%`
            }),
            Widget.Icon().hook(audio.speaker, self => {
                const vol = audio.speaker.volume * 100;
                const icon = [
                    [101, 'overamplified'],
                    [67, 'high'],
                    [34, 'medium'],
                    [1, 'low'],
                    [0, 'muted'],
                ].find(([threshold]) => threshold <= vol)?.[1];

                self.icon = `audio-volume-${icon}-symbolic`;
            })
        ]
    }),
})

export const VolumeControl = (monitor: number = 0) => Widget.Window({
    monitor: monitor,
    name: `volume-menu${monitor}`,
    anchor: ["top"],
    visible: true,
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


export default VolumeIndicator
