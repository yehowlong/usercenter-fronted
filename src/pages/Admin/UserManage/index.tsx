import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef } from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 10000) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'index',//对应返回数据对象的属性
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',//对应返回数据对象的属性
    copyable: true,
  },
  {
    title: '账户',
    dataIndex: 'userAccount',//对应返回数据对象的属性
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',//对应返回数据对象的属性
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100} height={100}/>
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',//对应返回数据对象的属性
    copyable: true,
  },
  {
    title: '电话',
    dataIndex: 'phone',//对应返回数据对象的属性
    copyable: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',//对应返回数据对象的属性
    copyable: true,
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',//对应返回数据对象的属性
    copyable: true,
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',//对应返回数据对象的属性
    copyable: true,
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',//对应返回数据对象的属性
    copyable: true,
      valueType: 'select',
      valueEnum: {
        0: {text: '普通用户',status: 'Default'},
        1: {
          text: '管理员',
          status: 'Success',
        },
      }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',//对应返回数据对象的属性
    valueType: 'date',
    copyable: true,
  },

  // {
  //   title: '标题',//表格列明
  //   dataIndex: 'username',
  //   copyable: true,
  //   ellipsis: true,//是否云讯缩略
  //   tip: '标题过长会自动收缩',
  // },
  // {
  //   disable: true,
  //   title: '状态',
  //   dataIndex: 'state',
  //   filters: true,
  //   onFilter: true,
  //   ellipsis: true,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '超长'.repeat(50) },
  //     open: {
  //       text: '未解决',
  //       status: 'Error',
  //     },
  //     closed: {
  //       text: '已解决',
  //       status: 'Success',
  //       disabled: true,
  //     },
  //     processing: {
  //       text: '解决中',
  //       status: 'Processing',
  //     },
  //   },
  // },
  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList =await searchUsers();
        return {
          data: userList
        }
        // await waitTime(2000);
        // return request<{
        //   data: CurrentUser[];
        // }>('https://proapi.azurewebsites.net/github/issues', {
        //   params,
        // });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
