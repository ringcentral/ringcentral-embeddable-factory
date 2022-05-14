const link1 = 'https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/disable-features.md'
const link2 = 'https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/config-client-id-and-secret.md'
const link3 = 'https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/new-adapter-ui.md'
const link4 = 'https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/add-analytics.md'
const link5 = 'https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/popup-window.md'
const link6 = 'https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/customize-redirect-uri.md'
export const features = [
  {
    name: 'clientId',
    formType: 'input',
    title: 'client ID',
    helpLink: link2
  },
  {
    name: 'clientSecret',
    formType: 'input',
    title: 'client secret',
    defaultValue: '',
    helpLink: link2
  },
  {
    name: 'appServer',
    formType: 'input',
    title: 'client secret',
    defaultValue: 'https://platform.ringcentral.com',
    helpLink: link2
  },
  {
    name: 'redirectUri',
    formType: 'input',
    title: 'redirectUri',
    defaultValue: 'https://ringcentral.github.io/ringcentral-embeddable/redirect.html',
    helpLink: link6
  },
  {
    name: 'disableMessages',
    formType: 'switch',
    title: 'Disable messages features',
    defaultValue: false,
    helpLink: link1
  },
  {
    name: 'disableReadText',
    formType: 'switch',
    title: 'Disable SMS/Text read features',
    defaultValue: false,
    helpLink: link1
  },
  {
    name: 'disableCall',
    formType: 'switch',
    title: 'Disable call related features',
    defaultValue: false,
    helpLink: link1
  },
  {
    name: 'disableMeeting',
    formType: 'switch',
    title: 'Disable Meeting feature',
    defaultValue: false,
    helpLink: link1
  },
  {
    name: 'disableGlip',
    formType: 'switch',
    title: 'Enable Team messaging(Glip) feature',
    defaultValue: true,
    helpLink: link1
  },
  {
    name: 'enableRingtoneSettings',
    formType: 'switch',
    title: 'Enable Ringtone Settings feature',
    defaultValue: false,
    helpLink: link1
  },
  {
    name: 'disableMinimize',
    formType: 'switch',
    title: 'Disable the widget minimized',
    defaultValue: false,
    helpLink: link1
  },
  {
    name: 'newAdapterUI',
    formType: 'switch',
    title: 'Use new dock UI',
    defaultValue: true,
    helpLink: link3
  },
  {
    name: 'analyticsKey',
    formType: 'input',
    title: 'mixpanel key',
    defaultValue: '',
    helpLink: link4
  },
  {
    name: 'enablePopup',
    formType: 'switch',
    title: 'Popup the widget in a standalone window',
    defaultValue: false,
    helpLink: link5
  },
  {
    name: 'disconnectInactiveWebphone',
    formType: 'switch',
    title: 'Disconnect inactive web phone',
    defaultValue: true,
    hide: true
  }
]
