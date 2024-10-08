import { Stream } from "types/service/audio"

const audio = await Service.import('audio')

/** @param {'speaker' | 'microphone'} type */
const VolumeSlider = (type: 'speaker' | 'microphone' = 'speaker') => Widget.Slider({
    css: "padding:1px;",
    class_name: type,
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => audio[type].volume = value,
    value: audio[type].bind('volume'),
})

const speakerSlider = VolumeSlider('speaker')
const micSlider = VolumeSlider('microphone')

const volumeChange = 2 / 100

const AudioLabel = (type: Stream) => Widget.Label().hook(type, self => {
    self.label = `${Math.round(type.volume * 100)}%`
})

const SpeakerIcon = () => Widget.Icon().hook(audio.speaker, self => {
    const vol = audio.speaker.volume * 100 * Number(!audio.speaker.is_muted);
    const icon = [
        [101, 'overamplified'],
        [67, 'high'],
        [34, 'medium'],
        [1, 'low'],
        [0, 'muted'],
    ].find(([threshold]) => Number(threshold) <= vol)?.[1];

    self.icon = `audio-volume-${icon}-symbolic`;
})


const MicrophoneIcon = () => Widget.Icon().hook(audio.microphone, self => {
    const vol = audio.microphone.volume * 100 * Number(!audio.microphone.is_muted);
    const icon = [
        [67, 'high'],
        [34, 'medium'],
        [1, 'low'],
        [0, 'muted'],
    ].find(([threshold]) => Number(threshold) <= vol)?.[1];

    self.icon = `microphone-sensitivity-${icon}-symbolic`;
})

const SpeakerBox = () => Widget.EventBox({
    class_name: "Speaker",
    on_primary_click: () => audio.speaker.is_muted = !audio.speaker.is_muted,
    on_scroll_up: () => { audio["speaker"].volume += volumeChange },
    on_scroll_down: () => { audio["speaker"].volume -= volumeChange },
    child: Widget.Box({
        children: [
            AudioLabel(audio.speaker),
            SpeakerIcon(),
        ]
    })
})

const MicrophoneBox = () => Widget.EventBox({
    class_name: "Microphone",
    on_primary_click: () => audio.microphone.is_muted = !audio.microphone.is_muted,
    on_scroll_up: () => { audio["microphone"].volume += volumeChange },
    on_scroll_down: () => { audio["microphone"].volume -= volumeChange },
    child: Widget.Box({
        children: [
            AudioLabel(audio.microphone),
            MicrophoneIcon(),
        ]
    })
})

const VolumeIndicator = () => Widget.Box({
    child: Widget.EventBox({
        class_name: "VolumeIndicator",
        css: "padding-left: 1em; padding-right: 1em;",
        on_hover: () => App.openWindow(`volume-menu`),
        on_hover_lost: () => App.closeWindow(`volume-menu`),
        on_secondary_click: () => {
            App.toggleWindow(`volume-menu`)
        },
        child: Widget.Box({
            children: [
                SpeakerBox(),
                MicrophoneBox(),
            ]
        }),
    })
})



export const VolumeControl = () => Widget.Window({
    name: `volume-menu`,
    class_name: "VolumeControl",
    anchor: ["top"],
    visible: false,
    child: Widget.Box({
        css: "padding: 1px",
        child: Widget.EventBox({
            on_hover_lost: (self) => self.parent.parent.visible = false,
            child: Widget.Box({
                children: [
                    speakerSlider,
                    micSlider
                ],
            }),
        }),
    }),
})


export default VolumeIndicator
