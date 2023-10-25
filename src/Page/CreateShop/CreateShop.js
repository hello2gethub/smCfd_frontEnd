import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Select,
  DatePicker,
  Space,
  Button,
  Input,
  message,
  Upload,
  InputNumber,
} from "antd";

import Headers from "../../Component/Headers/Headers";
import Footers from "../../Component/Footers/Footers";

import "./CreateShop.css";

//文本域 获取商品文字描述
const { TextArea } = Input;
const onChangems = (e) => {
  console.log("Change:", e.target.value);
};

// 数字输入框
const onChangesz = (value) => {
  console.log("changed", value);
};

// 图片获取
const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

//选择框
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const CreateShop = () => (
  <>
    <Headers />
    <div className="w">
      {/* 基本信息与服务条款  start*/}
      <div className="box box1 ">
        {/* 基本信息 start*/}
        <div>
          <h2>基本信息</h2>
          <ul className="mingcheng clearfix">
            <li>
              <h3>
                <i>*</i>商品名称
              </h3>
              <Input placeholder="请输入商品名称" className="inPut" required />
            </li>
            <li>
              <h3>商品头图</h3>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </li>
          </ul>

          {/* 商品文字描 */}
          <div className="miaoshu">
            <h3>
              <i>*</i>商品文字描述
            </h3>
            <TextArea
              showCount
              maxLength={100}
              style={{
                height: 200,
                width: 500,
                resize: "none",
              }}
              onChange={onChangems}
              placeholder="请输入详细文字描述，最大不超过100字"
              required
            />
          </div>

          {/* 商品类型 */}
          <div className="leixing">
            <ul className="clearfix">
              <li>
                <h3>
                  <i>*</i>商品类型
                </h3>
                <div className="shangping">
                  <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    required
                    options={[
                      {
                        value: "长沙",
                        label: "长沙",
                      },
                      {
                        value: "武汉",
                        label: "武汉",
                      },
                      {
                        value: "杭州",
                        label: "杭州",
                      },
                    ]}
                  />
                </div>
              </li>

              <li>
                <h3>
                  <i>*</i>商品详情
                </h3>
                <Input placeholder="商品详情" className="inPut" required />
              </li>

              <li>
                <h3>
                  <i>*</i>商品分类
                </h3>
                <div>
                  <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="请选择商品分类"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    required
                    options={[
                      {
                        value: "长沙",
                        label: "长沙",
                      },
                      {
                        value: "武汉",
                        label: "武汉",
                      },
                      {
                        value: "杭州",
                        label: "杭州",
                      },
                    ]}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* 基本信息 end*/}

        {/* 服务条款 start */}
        <div>
          <h2>服务条款</h2>
          <ul className="gongyingshang clearfix">
            <li>
              <h3>
                <i>*</i>供应商名称
              </h3>
              <Input
                placeholder="请输入供应商名称"
                className="inPut"
                required
              />
            </li>
            <li>
              <h3>
                <i>*</i>供应商联系方式
              </h3>
              {/* <InputNumber min={1} max={10} defaultValue={3} onChange={onChangesz} className='inPut' />
               */}
              <Input
                type="number"
                placeholder="请输入供应商联系方式"
                className="inPut"
                required
              />
            </li>
          </ul>
          {/* 服务保障 */}
          <div className="biaozhang">
            <h3>
              <i>*</i>服务保障
            </h3>
            <TextArea
              showCount
              maxLength={500}
              style={{
                height: 200,
                width: 500,
                resize: "none",
              }}
              onChange={onChangems}
              placeholder="请输入详细文字描述，最大不超过100字"
              required
            />
          </div>
        </div>
        {/* 服务条款 end */}
      </div>
      {/* 基本信息与服务条款  end*/}

      {/* 会员的相关设置 start */}
      <div className="box box3">
        <ul className="clearfix">
          {/* 黄金会员价格类型 */}
          <li>
            <div className="huangjing">
              <h3>
                <i>*</i>黄金会员价格类型
              </h3>
              <Select
                showSearch
                style={{ width: 300 }}
                placeholder="纯积分"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                required
                options={[
                  {
                    value: "纯积分",
                    label: "纯积分",
                  },
                  {
                    value: "积分加钱",
                    label: "积分加钱",
                  },
                  {
                    value: "现金购买",
                    label: "现金购买",
                  },
                ]}
              />
            </div>
          </li>

          <li>
            <h3>
              <i>*</i>积分数量
            </h3>
            <InputNumber
              min={1}
              max={100000}
              defaultValue="请输入"
              onChange={onChangesz}
              className="amount"
              required
            />
          </li>
          <li>
            <h3>
              <i>*</i>现金价格
            </h3>
            <InputNumber
              min={1}
              max={100000}
              defaultValue="请输入"
              onChange={onChangesz}
              className="amount"
              required
            />
          </li>
        </ul>
        <div className="addType">
          <em>+</em>添加一行价格类型
        </div>
      </div>
      {/* 会员的相关设置 end */}

      {/* 快递与投放  start*/}
      <div className="box box2">
        {/* 快递区域 */}
        <div>
          <h2>快递</h2>
          <h3>不同发货地区</h3>
          {/* 选择城市 */}
          <div className="chengshi">
            <Select
              showSearch
              placeholder="选择城市"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: "长沙",
                  label: "长沙",
                },
                {
                  value: "武汉",
                  label: "武汉",
                },
                {
                  value: "杭州",
                  label: "杭州",
                },
              ]}
            />
          </div>
          {/* 选择城市 end */}
        </div>
        {/* 兑换限制 */}
        <div>
          <h2>兑换限制</h2>
          <h3>
            兑换上限 <i>?</i>
          </h3>

          {/* <Input placeholder="Basic usage " className='shuru' /> */}
          {/* <input value={'请输入'} readOnly={true} ></input> */}
        </div>
        {/* 投放 */}

        <div className="toufang">
          <h2>投放</h2>
          <ul className="toufang_1 clearfix">
            <li>
              <h3>
                <i>*</i>上线时间
              </h3>
              <Space direction="请选择">
                <DatePicker
                  onChange={onChange}
                  placeholder="请选择"
                  className="shijian"
                  required
                />
              </Space>
            </li>
            <li>
              <h3>
                <i>*</i>下线时间
              </h3>
              <Space>
                <DatePicker
                  onChange={onChange}
                  placeholder="请选择"
                  className="shijian"
                  required
                />
              </Space>
            </li>
            <li>
              <h3>
                <i>*</i>选择城市
              </h3>
              <div className="chengshi">
                <Select
                  showSearch
                  placeholder="选择城市"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  required
                  options={[
                    {
                      value: "长沙",
                      label: "长沙",
                    },
                    {
                      value: "武汉",
                      label: "武汉",
                    },
                    {
                      value: "杭州",
                      label: "杭州",
                    },
                  ]}
                />
              </div>
            </li>
          </ul>
        </div>

        {/* 提交和重置 */}
        <div className="anniu">
          <button type="submit" className="tijiao">
            提 交
          </button>
          <button type="reset" className="reset">
            重 置
          </button>
        </div>
      </div>
      {/* 快递与投放  start*/}
    </div>
    <Footers />
  </>
);
export default CreateShop;
