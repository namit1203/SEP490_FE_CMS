import UploadComponent from '@/components/upload';
import { HttpStatusCode } from '@/constants/httpStatusCode.enum';
import { useLoading } from '@/context/LoadingContext';
import { useQueryDriverWithoutVehicle } from '@/queries/driver';
import { useAddVehiclesMutation, useQueryTypeOfVehicles, useQueryTypeVehiclesOwner } from '@/queries/vehicle';
import { DataTypeVehicle } from '@/types/DataType';
import { useLocalStorage } from '@/utils/localStorage/localStorageService';
import { Button, Col, Form, Input, InputNumber, message, Row, Select, Switch, Table, TableColumnsType } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';

interface TableData {
  key: string;
  label: JSX.Element | string;
  value: JSX.Element | string | undefined;
}

const AddVehiclePage: React.FC = () => {
  const [form] = Form.useForm();

  const { data: dataTypeDriver } = useQueryDriverWithoutVehicle({ id: null });
  const { data: dataTypeOfVehicles } = useQueryTypeOfVehicles();
  const { data: dataTypeOfVehiclesOwner } = useQueryTypeVehiclesOwner();

  const addMutation = useAddVehiclesMutation();

  const navigate = useNavigate();

  const { isLoadingGlobal } = useLoading();

  const role = useLocalStorage.getLocalStorageData('role');
  const id = useLocalStorage.getLocalStorageData('id');
  const userName = useLocalStorage.getLocalStorageData('userName');

  const initialValues = {
    description: '',
    driverId: '',
    image: '',
    numberSeat: null,
    licensePlate: null,
    vehicleTypeId: null,
    vehicleOwner: role === 'VehicleOwner' ? userName : '',
    status: true
  };

  const tableData: TableData[] = [
    {
      key: 'description',
      label: (
        <span>
          Mô tả
        </span>
      ),
      value: (
        <Form.Item name="description">
          <TextArea placeholder="Nhập Mô tả" style={{ width: '30%' }} rows={2} />
        </Form.Item>
      )
    },
    {
      key: 'driverId',
      label: (
        <span>
         Tài xế
        </span>
      ),
      value: (
        <Form.Item name="driverId">
          <Select placeholder="Chọn tài xế" style={{ width: '30%' }}>
            {dataTypeDriver?.length > 0 &&
              dataTypeDriver?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.userName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'image',
      label: (
        <span>
           Link ảnh
        </span>
      ),
      value: <UploadComponent fieldName="image" form={form} />
    },
    {
      key: 'numberSeat',
      label: (
        <span>
          <span style={{ color: 'red' }}>*</span> Số ghế ngồi
        </span>
      ),
      value: (
        <Form.Item name="numberSeat" rules={[{ required: true, message: 'Vui lòng nhập số chỗ ngồi!' }]}>
          <InputNumber style={{ width: '30%' }} placeholder="Nhập số chỗ ngồi" />
        </Form.Item>
      )
    },
    {
      key: 'licensePlate',
      label: (
        <span>
          <span style={{ color: 'red' }}>*</span> Biển số xe
        </span>
      ),
      value: (
        <Form.Item name="licensePlate" rules={[{ required: true, message: 'Vui lòng nhập Biển số xe!' }]}>
          <Input placeholder="Biển số xe" style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'vehicleTypeId',
      label: (
        <span>
          <span style={{ color: 'red' }}>*</span> Loại xe
        </span>
      ),
      value: (
        <Form.Item name="vehicleTypeId" rules={[{ required: true, message: 'Vui lòng chọn loại xe!' }]}>
          <Select placeholder="Chọn loại xe" style={{ width: '30%' }}>
            {dataTypeOfVehicles?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'vehicleOwner',
      label: (
        <span>
          <span style={{ color: 'red' }}>*</span> Chủ nhà xe
        </span>
      ),
      value: (
        <Form.Item name="vehicleOwner" rules={[{ required: true, message: 'Vui lòng chọn chủ nhà xe!' }]}>
          {role === 'VehicleOwner' ? (
            <Input value={userName} />
          ) : (
            <Select placeholder="Chọn chủ nhà xe" style={{ width: '30%' }}>
              {dataTypeOfVehiclesOwner?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.username}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      )
    },
    {
      key: 'status',
      label: (
        <span>
           Trạng thái
        </span>
      ),
      value: (
        <Form.Item name="status" valuePropName="checked">
          <Switch checkedChildren="Khả dụng" unCheckedChildren="Không khả dụng" />
        </Form.Item>
      )
    }
  ];

  const columns: TableColumnsType<TableData> = [
    {
      title: 'Key',
      dataIndex: 'label',
      key: 'label',
      width: '30%'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
      render: (_, record) => <>{record.value}</>
    }
  ];

  const handleFormSubmit = async (values: DataTypeVehicle) => {
    try {
      const newData = {
        ...values,
        vehicleOwner: id
      };

      const formData = new FormData();

      Object.entries(newData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const response = await addMutation.mutateAsync(formData);
      if (response.status === HttpStatusCode.Ok) {
        message.success('Thêm thành công!');
        navigate('/vehicles');
      } else {
        message.error('Thêm thất bại!');
      }
    } catch (error) {
      console.error('Error values:', error);
    }
  };

  return (
    <Form onFinish={handleFormSubmit} form={form} layout="vertical" initialValues={initialValues}>
      <Table columns={columns} dataSource={tableData} pagination={false} bordered rowKey="key" />
      <Row justify="start" gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button disabled={isLoadingGlobal} type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Thêm mới
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddVehiclePage;
