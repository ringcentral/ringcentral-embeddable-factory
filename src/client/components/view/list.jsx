
import {
  Table,
  Tooltip,
  Popconfirm,
  Spin,
  Button
} from 'antd'
import {
  DeleteFilled,
  EditFilled
} from '@ant-design/icons'
import copyTextToClipboard from '../../common/copy'

export default function List (props) {
  const { list, loadingRecs } = props
  if (!list.length) {
    return (
      <div>No Scripts yet</div>
    )
  }
  const data = list.map((d, i) => {
    return {
      ...d,
      index: i + 1
    }
  })
  const commonRender = (text) => {
    return (
      <Tooltip title={text}>
        <div>{text}</div>
      </Tooltip>
    )
  }
  const cols = [
    {
      title: 'I',
      dataIndex: 'index',
      key: 'index',
      width: 30
    },
    {
      title: commonRender('Script'),
      dataIndex: 'script',
      render: (txt) => {
        return (
          <div className='pd2'>
            <pre>
              <code>{txt}</code>
            </pre>
            <div className='pd1y'>
              <Button
                type='ghost'
                onClick={() => copyTextToClipboard(txt)}
              >
                Copy to clipboard
              </Button>
            </div>
          </div>
        )
      },
      ellipsis: {
        showTitle: false
      },
      key: 'script'
    },
    {
      title: 'Action',
      dataIndex: 'op',
      width: 60,
      // ellipsis: {
      //   showTitle: false
      // },
      key: 'op',
      render: (text, item) => {
        const loading = loadingRecs[item.id] || false
        return (
          <Spin spinning={loading}>
            <EditFilled
              onClick={() => props.edit(item)}
              className='pointer'
            />
            <Popconfirm
              title='Delete it? Are you sure?'
              onConfirm={() => props.del(item)}
            >
              <DeleteFilled
                className='pointer mg1l'
              />
            </Popconfirm>
          </Spin>
        )
      }
    }
  ]
  return (
    <Table
      columns={cols}
      dataSource={data}
      bordered
    />
  )
}
