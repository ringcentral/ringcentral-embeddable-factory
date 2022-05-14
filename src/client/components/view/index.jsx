
import { Component } from 'react'
import {
  Button,
  Typography,
  Spin,
  Tabs,
  Modal
} from 'antd'
import {
  getUser,
  listRecs,
  updateRec,
  createRec,
  delRec
} from '../../common/apis'
import {
  GithubFilled,
  HighlightOutlined,
  LinkOutlined
} from '@ant-design/icons'
import copy from 'json-deep-copy'
import RecList from './list'
import Form from './form'
import Edit from './edit'
import parseScript from './parse-script'
import copyTextToClipboard from '../../common/copy'

const { Text } = Typography
const { TabPane } = Tabs

export default class View extends Component {
  state = {
    loading: false,
    loadingRecords: false,
    userLoaded: false,
    user: null,
    loadingRecs: {},
    record: {
      keywords: '',
      reply: ''
    },
    editRec: null,
    records: [],
    recordsLoaded: false,
    tab: 'newRec' // or records
  }

  componentDidMount () {
    window.particleBg('#bg', {
      color: '#08c'
    })
    this.getRcUser()
  }

  getRcUser = async () => {
    this.setState({
      loading: true
    })
    const up = {
      userLoaded: true,
      loading: false
    }
    const user = await getUser()
    if (user) {
      up.user = user
    }
    this.setState(up, user ? this.afterGetUser : undefined)
  }

  afterGetUser = () => {
    this.getRecs()
  }

  handleTab = tab => {
    this.setState({
      tab
    })
  }

  showScript = (script, title = 'Script detail') => {
    Modal.info({
      title,
      width: '95%',
      content: (
        <div>
          <pre>
            <code>{script}</code>
          </pre>
          <div className='pd1y'>
            <Button
              onClick={() => copyTextToClipboard(script)}
            >
              Copy to clipboard
            </Button>
          </div>
        </div>
      )
    })
  }

  onPreview = res => {
    const script = parseScript(res)
    this.showScript(script, 'Preview script')
  }

  onSubmit = async (res) => {
    this.setState({
      loading: true
    })
    const script = parseScript(res)
    const r = await createRec({
      script
    })
    const update = {
      loading: false
    }
    if (r) {
      this.showScript(r.script)
      const { user, records } = this.state
      update.user = {
        ...user,
        recIds: [
          ...(user.recIds || []),
          r.id
        ]
      }
      update.records = [
        ...records,
        r
      ]
    }
    this.setState(update)
    return r
  }

  getRecs = async () => {
    this.setState({
      loadingRecords: true
    })
    const up = {
      loadingRecords: false
    }
    const r = await listRecs()
    if (r) {
      up.records = r
    }
    this.setState(up)
  }

  createRec = async (res) => {
    this.setState({
      loading: true
    })
    const up = {
      loading: false
    }
    const rec = await createRec(res)
    if (rec) {
      up.records = [
        ...this.state.records,
        rec
      ]
    }
    this.setState(up)
    return rec
  }

  delRecAct = async (rec) => {
    const r = await delRec(rec.id)
    if (r) {
      this.setState(old => {
        return {
          user: {
            ...old.user,
            recIds: (old.user.recIds || []).filter(
              d => d !== rec.id
            )
          },
          records: old.records.filter(
            d => d.id !== rec.id
          )
        }
      })
    }
  }

  loadingRec = (rec, loading) => {
    this.setState(old => {
      return {
        loadingRecs: {
          ...old.loadingRecs,
          [rec.id]: loading
        }
      }
    })
  }

  delRec = async (rec) => {
    this.loadingRec(rec, true)
    await this.delRecAct(rec)
    this.loadingRec(rec, false)
  }

  doDelRec = (rec) => {
    this.delRec(rec)
  }

  editRec = rec => {
    this.setState({
      editRec: rec
    })
  }

  handleUpdateRec = async (rec, data) => {
    this.loadingRec(rec, true)
    this.setState({
      loading: true
    })
    const up = {
      editRec: null,
      loading: false
    }
    const r = await updateRec(rec.id, data)
    this.loadingRec(rec, false)
    this.setState(old => {
      if (r) {
        const recs = copy(old.records)
        const item = recs.find(r => r.id === rec.id)
        if (item) {
          Object.assign(item, data)
        }
        up.records = recs
      }
      return up
    })
  }

  handleLogout = () => {
    window.localStorage.removeItem(window.rc.jwtPrefix + ':rcpf-jwt-token')
    this.setState({
      user: null,
      records: []
    })
  }

  renderUrl = () => {
    return window.rc.loginUrl.replace(
      window.rc.defaultState,
      encodeURIComponent(window.location.href)
    )
  }

  renderLogin () {
    return (
      <div className='pd3 aligncenter'>
        <p>To start use {window.rc.title}, please authorize first.</p>
        <a
          href={this.renderUrl()}
        >
          <Button
            size='large'
            type='primary'
          >
            Authorize with RingCentral account
          </Button>
        </a>
      </div>
    )
  }

  renderLoading () {
    return (
      <div className='pd3 aligncenter'>
        Loading...
      </div>
    )
  }

  renderFooter = () => {
    return (
      <div className='pd3y'>
        <h2>
          <span className='iblock'>{window.rc.title}</span>
        </h2>
        <p>
          <a
            href={window.rc.feedbackUrl}
            target='_blank'
            rel='noreferrer'
          >
            <HighlightOutlined /> Feedback
          </a>
          <a
            className='mg1l'
            href={window.rc.repo}
            target='_blank'
            rel='noreferrer'
          >
            <GithubFilled /> GitHub repo
          </a>
          <a
            className='mg1l'
            href='https://github.com/ringcentral/ringcentral-embeddable'
            target='_blank'
            rel='noreferrer'
          >
            <LinkOutlined /> ringcentral-embeddable
          </a>
          <a
            className='mg1l'
            href='https://www.ringcentral.com/apps'
            target='_blank'
            rel='noreferrer'
          >
            <LinkOutlined /> RingCentral App gallery
          </a>
        </p>
        <div className='pd1y'>
          <Text type='secondary'>
            <div>
              <img src='//raw.githubusercontent.com/ringcentral/ringcentral-embeddable/master/src/assets/rc/icon.svg' className='iblock mg1r' alt='' />
              <span className='iblock bold pd1y'>RingCentral Labs</span>
            </div>
            <p>RingCentral Labs is a program that lets RingCentral engineers, platform product managers and other employees share RingCentral apps they've created with the customer community. RingCentral Labs apps are free to use, but are not official products, and should be considered community projects - these apps are not officially tested or documented. For help on any RingCentral Labs app please consult each project's GitHub Issues message boards - RingCentral support is not available for these applications.</p>
          </Text>
        </div>
      </div>
    )
  }

  renderHeader = () => {
    const {
      user
    } = this.state
    const {
      name
    } = user || {}
    const nameStr = name
      ? (<span>Login as <b>{name}</b></span>)
      : null
    return (
      <div className='top alignright font12'>
        <Text type='secondary'>
          <span>{nameStr}</span>
          <span
            onClick={this.handleLogout}
            className='pointer link mg1l'
          >
            Logout
          </span>
        </Text>
      </div>
    )
  }

  renderList = () => {
    const {
      loadingRecs,
      records,
      loadingRecords
    } = this.state
    return (
      <div className='pd2y'>
        <Spin spinning={loadingRecords}>
          <RecList
            list={records}
            edit={this.editRec}
            loadingRecs={loadingRecs}
            del={this.doDelRec}
          />
        </Spin>
      </div>
    )
  }

  renderDetail = () => {
    const {
      loading
    } = this.state
    return (
      <div>
        <div className='pd1b'>
          <Form
            formData={this.state.rec}
            loading={loading}
            preview={this.onPreview}
            handleSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }

  renderContent = () => {
    const {
      loadingRecs,
      editRec,
      records
    } = this.state
    const loadingCurrentRec = editRec
      ? loadingRecs[editRec.id] || false
      : false
    const listTitle = (
      <div>Script list ({records.length})</div>
    )
    const tabs = [
      {
        id: 'newRec',
        title: 'Create new script',
        func: this.renderDetail
      },
      {
        id: 'list',
        title: listTitle,
        func: this.renderList
      }
    ]
    return (
      <div className='wrap'>
        {this.renderHeader()}
        <h3 className='pd2t'>
          {window.rc.desc}
        </h3>
        <div className='pd3b pb1t'>
          <Tabs
            activeKey={this.state.tab}
            onTabClick={this.handleTab}
          >
            {
              tabs.map(t => {
                const {
                  id, title, func
                } = t
                return (
                  <TabPane key={id} tab={title}>
                    {func()}
                  </TabPane>
                )
              })
            }
          </Tabs>
          <Edit
            onSubmit={this.handleUpdateRec}
            rec={editRec}
            onCancel={this.handleCancel}
            loading={loadingCurrentRec}
          />
        </div>
        {this.renderFooter()}
      </div>
    )
  }

  render () {
    const {
      userLoaded,
      user
    } = this.state
    if (!userLoaded) {
      return this.renderLoading()
    } else if (!user) {
      return this.renderLogin()
    }
    return this.renderContent()
  }
}
