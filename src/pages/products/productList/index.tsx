// import { DownOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
// import React, { useState, useRef } from 'react';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

// import CreateForm from './components/CreateForm';
// import UpdateForm, { FormValueType } from './components/UpdateForm';
// import { TableListItem } from './data.d';
// import { queryRule, updateRule, addRule, removeRule } from './service';

// /**
//  * 添加节点
//  * @param fields
//  */
// const handleAdd = async (fields: TableListItem) => {
//   const hide = message.loading('Add');
//   try {
//     await addRule({ ...fields });
//     hide();
//     message.success('Successfully added');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Faild');
//     return false;
//   }
// };

// /**
//  * 更新节点
//  * @param fields
//  */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('Update');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();

//     message.success('Succesfull Updated');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Failed to update');
//     return false;
//   }
// };

// /**
//  *  删除节点
//  * @param selectedRows
//  */
// const handleRemove = async (selectedRows: TableListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('删除失败，请重试');
//     return false;
//   }
// };

// const TableList: React.FC<{}> = () => {
//   const [createModalVisible, handleModalVisible] = useState<boolean>(false);
//   const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
//   const [stepFormValues, setStepFormValues] = useState({});
//   const actionRef = useRef<ActionType>();
//   const columns: ProColumns<TableListItem>[] = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       rules: [
//         {
//           required: true,
//           message: '规则名称为必填项'
//         }
//       ],
//     },
//     {
//       title: 'Description',
//       dataIndex: 'desc',
//       valueType: 'textarea',
//     },
//     {
//       title: 'Call No',
//       dataIndex: 'callNo',
//       sorter: true,
//       hideInForm: true,
//       renderText: (val: string) => `${val} 万`,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       hideInForm: true,
//       valueEnum: {
//         0: { text: 'Default', status: 'Default' },
//         1: { text: 'Processing', status: 'Processing' },
//         2: { text: 'Online', status: 'Success' },
//         3: { text: 'Error', status: 'Error' },
//       },
//     },
//     {
//       title: 'UpdateAt',
//       dataIndex: 'updatedAt',
//       sorter: true,
//       valueType: 'dateTime',
//       hideInForm: true,
//       renderFormItem: (item, { defaultRender, ...rest }, form) => {
//         const status = form.getFieldValue('status');
//         if (`${status}` === '0') {
//           return false;
//         }
//         if (`${status}` === '3') {
//           return <Input {...rest} placeholder="请输入异常原因！" />;
//         }
//         return defaultRender(item);
//       },
//     },
//     {
//       title: 'Option',
//       dataIndex: 'option',
//       valueType: 'option',
//       render: (_, record) => (
//         <>
//           <a
//             onClick={() => {
//               handleUpdateModalVisible(true);
//               setStepFormValues(record);
//             }}
//           >
//             configaration
//           </a>
//           <Divider type="vertical" />
//           <a href="">Subscibe to alerts</a>
//         </>
//       ),
//     },
//   ];

//   return (
//     <PageHeaderWrapper>
//       <ProTable<TableListItem>
//         headerTitle="Products"
//         actionRef={actionRef}
//         rowKey="key"
//         toolBarRender={(action, { selectedRows }) => [
//           <Button type="primary" onClick={() => handleModalVisible(true)}>
//             <PlusOutlined /> Add
//           </Button>,
//           selectedRows && selectedRows.length > 0 && (
//             <Dropdown
//               overlay={
//                 <Menu
//                   onClick={async (e) => {
//                     if (e.key === 'remove') {
//                       await handleRemove(selectedRows);
//                       action.reload();
//                     }
//                   }}
//                   selectedKeys={[]}
//                 >
//                   <Menu.Item key="remove">Remove</Menu.Item>
//                   <Menu.Item key="approval">Approval</Menu.Item>
//                 </Menu>
//               }
//             >
//               <Button>
//                 批量操作 <DownOutlined />
//               </Button>
//             </Dropdown>
//           ),
//         ]}
//         tableAlertRender={({ selectedRowKeys, selectedRows }) => (
//           <div>
//             已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
//             <span>
//               服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
//             </span>
//           </div>
//         )}
//         request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
//         columns={columns}
//         rowSelection={{}}
//       />
//       <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
//         <ProTable<TableListItem, TableListItem>
//           onSubmit={async (value) => {
//             const success = await handleAdd(value);
//             if (success) {
//               handleModalVisible(false);
//               if (actionRef.current) {
//                 actionRef.current.reload();
//               }
//             }
//           }}
//           rowKey="key"
//           type="form"
//           columns={columns}
//           rowSelection={{}}
//         />
//       </CreateForm>
//       {stepFormValues && Object.keys(stepFormValues).length ? (
//         <UpdateForm
//           onSubmit={async (value) => {
//             const success = await handleUpdate(value);
//             if (success) {
//               handleUpdateModalVisible(false);
//               setStepFormValues({});
//               if (actionRef.current) {
//                 actionRef.current.reload();
//               }
//             }
//           }}
//           onCancel={() => {
//             handleUpdateModalVisible(false);
//             setStepFormValues({});
//           }}
//           updateModalVisible={updateModalVisible}
//           values={stepFormValues}
//         />
//       ) : null}
//     </PageHeaderWrapper>
//   );
// };

// export default TableList;

import React from 'react';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker ,
  ProFormSelect,
  ProFormRadio ,
  ProFormUploadButton,
  ProFormDigit ,
  ProFormTextArea ,
} from '@ant-design/pro-form';
import { BasicLayout, FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
export default () => {
  return (
    <div
      id="test-pro-layout"
      style={{
        transform: 'rotate(0)',
        overflowX: 'hidden',
      }}
    >
      <BasicLayout
        style={{
          maxHeight: '100vh',
        }}
        fixSiderbar
        navTheme="light"
        breakpoint={false}
        defaultCollapsed
        pageTitleRender={false}
        menuDataRender = { ( ) => [  
          {
            path: '/one',
            icon: <SmileOutlined />,
            name : 'First level name' , 
            children: [
              {
                path: 'two',
                name : 'Secondary name' , 
              },
            ],
          },
        ]}
        layout="mix"
        location={{
          pathname: '/one/two',
        }}
      >
        < PageContainer title = " Input Form " > 
          <Card>
            <ProForm
              submitter={{
                render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              }}
              onFinish={async (values) => console.log(values)}
            >
              <ProForm.Group>
                <ProFormText
                  name="name"
                  label = " Name of contracted customer "
                  tooltip = "The maximum length is 24 digits "
                  placeholder = " Please enter a name "
                />
                < ProFormText name = " company " label = " Our company name " placeholder = " Please enter a name " />    
              </ProForm.Group>
              <ProForm.Group>
                < ProFormText name = " contract " label = " contract name " placeholder = " Please enter a name " />    
              </ProForm.Group>   
            </ProForm>
          </Card>
        </PageContainer>
      </BasicLayout>
    </div>
  );
};