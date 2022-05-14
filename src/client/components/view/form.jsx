
import {
  Spin,
  Form,
  Input,
  Switch,
  Button
} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import FormItem from 'antd/lib/form/FormItem'
import { features } from '../../common/features'

const { Item } = Form

export default function FormVote (props) {
  const [form] = Form.useForm()
  const initialValues = features.reduce((p, item) => {
    return {
      ...p,
      [item.name]: item.defaultValue
    }
  }, {})
  async function preview () {
    const res = await form.validateFields()
      .catch(err => {
        console.log(err)
      })
    if (res) {
      props.preview(res)
    }
  }
  function renderLabel (title, helpLink) {
    return (
      <div>
        <span className='mg1r'>{title}</span>
        <a
          href={helpLink}
          target='_blank'
          rel='external nofollow noreferrer'
        >
          <QuestionCircleOutlined />
        </a>
      </div>
    )
  }
  function renderItem (item) {
    const formMapper = {
      input: Input,
      switch: Switch
    }
    const {
      name,
      formType,
      title,
      helpLink,
      hide
    } = item
    const FormElem = formMapper[formType]
    const elemProps = {}
    if (formType === 'input') {
      elemProps.valuePropName = 'checked'
    }
    return (
      <FormItem
        name={name}
        label={renderLabel(title, helpLink)}
        hidden={hide || false}
      >
        <FormElem {...elemProps} />
      </FormItem>
    )
  }
  async function submit (res) {
    const r = await props.handleSubmit(res)
    if (r) {
      form.resetFields()
    }
  }
  return (
    <Spin spinning={props.loading}>
      <Form
        form={form}
        layout='vertical'
        onFinish={submit}
        initialValues={initialValues}
      >
        {
          features.map(renderItem)
        }
        <Item
          noStyle
        >
          <Button
            htmlType='submit'
            type='primary'
          >
            Create
          </Button>
          <Button
            type='ghost'
            className='mg1l'
            onClick={preview}
          >
            Preview
          </Button>
        </Item>
      </Form>
    </Spin>
  )
}
